import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Users, MousePointerClick, Eye, Timer, Monitor, Smartphone, Tablet, Phone, Trophy, AlertTriangle, MapPin, CalendarCheck } from 'lucide-react';
import SEO from '../components/SEO';
import AdminNav from '../components/AdminNav';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Totals {
  users: number;
  sessions: number;
  pageViews: number;
  avgSessionSeconds: number;
}

interface AnalyticsData {
  range: string;
  granularity?: 'hour' | 'day';
  totals: Totals;
  prevTotals?: Totals | null;
  trend: Array<{ date: string; users: number; pageViews: number }>;
  sources: Array<{ source: string; sessions: number; users: number; calls?: number }>;
  pages: Array<{ path: string; pageViews: number; users: number; calls?: number }>;
  devices: Array<{ device: string; users: number }>;
  locations?: Array<{ country: string; region: string; city: string; users: number }>;
  visitorDetail?: Array<{ country: string; region: string; city: string; source: string; users: number }>;
}

// One row per visit session from the tiki_recent_sessions RPC.
interface SessionRow {
  session_id: string;
  started_at: string;
  entry_path: string | null;
  source: string;
  device: string;
  views: number;
  calls: number;
}

// Paid traffic = ad clicks (cpc/ppc/paid mediums); everything else is
// organic search, direct, referrals, and GBP posts.
const isPaidSource = (source: string) => /cpc|ppc|paid|ads/i.test(source);

// Translate raw analytics jargon ("google / cpc", "(direct) / (none)") into
// owner-friendly labels. Unknown sources get title-cased with their medium.
const SOURCE_LABELS: Record<string, string> = {
  'google / cpc': 'Google Ads',
  'google / organic': 'Google Search',
  'bing / organic': 'Bing Search',
  'yahoo / organic': 'Yahoo Search',
  'duckduckgo / organic': 'DuckDuckGo Search',
  '(direct) / (none)': 'Direct Visit',
  'direct': 'Direct Visit',
  'gbp / post': 'Google Business Profile',
  'google / gbp': 'Google Business Profile',
  'tagassistant.google.com': 'Google Tag Assistant',
  'tagassistant.google.com / referral': 'Google Tag Assistant',
  '(not set)': 'Unknown',
};

// Domains keep their dots lowercase ("Hilton.com"); plain words title-case.
const titleCase = (s: string) =>
  s.includes('.')
    ? s.charAt(0).toUpperCase() + s.slice(1)
    : s.replace(/\b[a-z]/g, (c) => c.toUpperCase());

const prettySource = (raw: string) => {
  const key = raw.toLowerCase().trim();
  if (SOURCE_LABELS[key]) return SOURCE_LABELS[key];
  if (key.includes('not available') || key.includes('not set')) return 'Unknown';
  const parts = key.split('/').map((p) => p.trim());
  if (parts.length === 2) {
    const [src, medium] = parts;
    const srcLabel = SOURCE_LABELS[src] ?? titleCase(src);
    const mediumLabel = medium === 'referral' ? 'Referral' : medium === 'organic' ? 'Search' : medium === '(none)' ? '' : titleCase(medium);
    return `${srcLabel}${mediumLabel ? ' ' + mediumLabel : ''}`;
  }
  return titleCase(key);
};

// "Fort Lauderdale, Florida" for US visitors; country elsewhere.
const formatLocation = (l: { country: string; region: string; city: string }) => {
  const city = l.city && l.city !== '(not set)' ? l.city : '';
  const region = l.region && l.region !== '(not set)' ? l.region : '';
  if (l.country === 'United States') {
    if (city && region) return `${city}, ${region}`;
    return region || city || 'United States (unknown city)';
  }
  return city ? `${city}, ${l.country}` : l.country || 'Unknown';
};

// Shape returned by the tiki_analytics_summary RPC (self-hosted tracking).
interface SelfHostedSummary {
  totals: { pageViews: number; visitors: number; callClicks: number; bookClicks: number };
  trend: Array<{ date: string; views: number; visitors: number }>;
  pages: Array<{ path: string; views: number; visitors: number; calls: number; books?: number }>;
  sources: Array<{ source: string; views: number; visitors: number; calls: number; books?: number }>;
  devices: Array<{ device: string; visitors: number }>;
}

const fromSelfHosted = (raw: SelfHostedSummary, range: string): AnalyticsData => ({
  range,
  granularity: 'day',
  totals: {
    users: raw.totals.visitors,
    sessions: raw.totals.visitors,
    pageViews: raw.totals.pageViews,
    avgSessionSeconds: 0,
  },
  trend: raw.trend.map((t) => ({ date: t.date, users: t.visitors, pageViews: t.views })),
  sources: raw.sources.map((s) => ({ source: s.source, sessions: s.views, users: s.visitors, calls: s.calls })),
  pages: raw.pages.map((p) => ({ path: p.path, pageViews: p.views, users: p.visitors, calls: p.calls })),
  devices: raw.devices.map((d) => ({ device: d.device, users: d.visitors })),
});

type LoadState = 'loading' | 'ready' | 'not-configured' | 'error';

const RANGE_OPTIONS = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: '7', label: '7 days' },
  { key: '28', label: '28 days' },
  { key: '90', label: '90 days' },
];

// Days window used for the self-hosted call tracking RPC per range.
const RANGE_TO_RPC_DAYS: Record<string, number> = {
  today: 1,
  yesterday: 2,
  '7': 7,
  '28': 28,
  '90': 90,
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const prettyPath = (path: string) => (path === '/' ? 'Home Page' : path);

const formatTrendLabel = (value: string, granularity: 'hour' | 'day') => {
  if (granularity === 'hour') {
    const h = Number(value.slice(8, 10));
    if (Number.isNaN(h)) return value;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}${ampm}`;
  }
  return `${Number(value.slice(4, 6))}/${Number(value.slice(6, 8))}`;
};

const DEVICE_ICONS: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

function Delta({ current, previous, suffix }: { current: number; previous: number | undefined; suffix?: string }) {
  if (previous === undefined || previous <= 0) return null;
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct === 0) {
    return <span className="text-xs font-semibold text-gray-400 ml-2">±0%</span>;
  }
  const up = pct > 0;
  return (
    <span className={`text-xs font-bold ml-2 ${up ? 'text-green-600' : 'text-red-500'}`}>
      {up ? '▲' : '▼'} {Math.abs(pct)}%{suffix ?? ''}
    </span>
  );
}

function TrendChart({
  trend,
  granularity,
  showLabels,
}: {
  trend: AnalyticsData['trend'];
  granularity: 'hour' | 'day';
  showLabels: boolean;
}) {
  if (trend.length === 0) {
    return <p className="text-sm text-gray-500 py-10 text-center">No traffic recorded yet in this period.</p>;
  }
  const w = 800;
  const h = 260;
  const pad = { top: 24, right: 8, bottom: 28, left: 34 };
  const plotH = h - pad.top - pad.bottom;
  const max = Math.max(...trend.map((d) => d.pageViews), 1);
  // Round the axis ceiling to a friendly number
  const step = Math.max(1, Math.pow(10, Math.floor(Math.log10(max))) / 2);
  const axisMax = Math.ceil(max / step) * step;
  const barW = (w - pad.left - pad.right) / trend.length;
  const xLabelEvery = Math.max(1, Math.ceil(trend.length / 12));
  // Labels on: every bar (thinned when bars are too narrow to fit numbers).
  // Labels off: peak bar only.
  const valueEvery = showLabels ? (trend.length <= 31 ? 1 : Math.ceil(trend.length / 28)) : Infinity;
  const maxIndex = trend.reduce((mi, d, i) => (d.pageViews > trend[mi].pageViews ? i : mi), 0);
  const gridLines = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Page views over time">
      {/* Y-axis gridlines + labels */}
      {gridLines.map((f) => {
        const y = pad.top + plotH * (1 - f);
        return (
          <g key={f}>
            <line x1={pad.left} x2={w - pad.right} y1={y} y2={y} stroke="#0a192f" strokeOpacity="0.08" strokeDasharray="4 4" />
            <text x={pad.left - 6} y={y + 4} textAnchor="end" fontSize="10" className="fill-navy/50">
              {Math.round(axisMax * f).toLocaleString()}
            </text>
          </g>
        );
      })}
      <line x1={pad.left} x2={w - pad.right} y1={pad.top + plotH} y2={pad.top + plotH} stroke="#0a192f" strokeOpacity="0.2" />

      {trend.map((d, i) => {
        const barH = Math.max(2, (plotH * d.pageViews) / axisMax);
        const x = pad.left + i * barW;
        const y = pad.top + plotH - barH;
        const showValue = d.pageViews > 0 && (i === maxIndex || (Number.isFinite(valueEvery) && i % valueEvery === 0));
        return (
          <g key={d.date}>
            <rect
              x={x + barW * 0.15}
              y={y}
              width={barW * 0.7}
              height={barH}
              rx={Math.min(4, barW * 0.2)}
              className="fill-teal hover:fill-coral transition-colors"
            >
              <title>{`${formatTrendLabel(d.date, granularity)} — ${d.pageViews} page views, ${d.users} visitors`}</title>
            </rect>
            {showValue && (
              <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize="10" fontWeight="700" className="fill-navy">
                {d.pageViews.toLocaleString()}
              </text>
            )}
            {i % xLabelEvery === 0 && (
              <text x={x + barW / 2} y={h - 8} textAnchor="middle" fontSize="10" className="fill-navy/60">
                {formatTrendLabel(d.date, granularity)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function ShareBar({ value, max }: { value: number; max: number }) {
  return (
    <div className="h-2 rounded-full bg-navy/10 w-full min-w-[80px]">
      <div
        className="h-2 rounded-full bg-teal"
        style={{ width: `${Math.max(3, Math.round((value / Math.max(max, 1)) * 100))}%` }}
      />
    </div>
  );
}

export default function AdminAnalytics() {
  const { user, session } = useAuth();
  const [range, setRange] = useState('28');
  const [state, setState] = useState<LoadState>('loading');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [dataSource, setDataSource] = useState<'ga' | 'self'>('ga');
  const [selfCalls, setSelfCalls] = useState<SelfHostedSummary | null>(null);
  const [sessionLog, setSessionLog] = useState<SessionRow[] | null>(null);
  const [detailFilter, setDetailFilter] = useState<'all' | 'paid' | 'other' | 'hilton'>('all');
  const [detailView, setDetailView] = useState<'list' | 'chart'>('list');
  const [trendLabels, setTrendLabels] = useState(false);
  const [detailExpanded, setDetailExpanded] = useState(false);
  const [detailSort, setDetailSort] = useState<{ key: 'location' | 'source' | 'type' | 'users'; dir: 1 | -1 }>({
    key: 'users',
    dir: -1,
  });

  // Self-hosted call/page tracking (tiki_page_views). In GA mode it supplies
  // the call-click layer; standalone it's the full fallback dashboard.
  const fetchSelfSummary = useCallback(async (days: number): Promise<SelfHostedSummary | null> => {
    const { data: raw, error } = await supabase.rpc('tiki_analytics_summary', { days });
    return error || !raw ? null : (raw as SelfHostedSummary);
  }, []);

  const load = useCallback(async () => {
    if (!session?.access_token) return;
    setState('loading');

    const rpcDays = RANGE_TO_RPC_DAYS[range] ?? 28;
    const selfPromise = fetchSelfSummary(rpcDays);

    // Per-session visitor log for single-day views.
    if (range === 'today' || range === 'yesterday') {
      supabase
        .rpc('tiki_recent_sessions', { day_offset: range === 'today' ? 0 : 1 })
        .then(({ data: log, error }) => setSessionLog(error || !log ? null : (log as SessionRow[])));
    } else {
      setSessionLog(null);
    }

    try {
      const res = await fetch(`/.netlify/functions/analytics?range=${range}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const body = (await res.json()) as AnalyticsData;
        setData(body);
        setDataSource('ga');
        setSelfCalls(await selfPromise);
        setState('ready');
        return;
      }
      if (res.status !== 501) {
        setState('error');
        return;
      }
    } catch {
      // Local dev has no Netlify functions — fall through to self-hosted.
    }

    // Fallback: self-hosted only, with a doubled window for deltas.
    const current = await selfPromise;
    if (!current) {
      setState('not-configured');
      return;
    }
    const doubled = await fetchSelfSummary(rpcDays * 2);
    const shaped = fromSelfHosted(current, range);
    if (doubled) {
      shaped.prevTotals = {
        users: Math.max(0, doubled.totals.visitors - current.totals.visitors),
        sessions: Math.max(0, doubled.totals.visitors - current.totals.visitors),
        pageViews: Math.max(0, doubled.totals.pageViews - current.totals.pageViews),
        avgSessionSeconds: 0,
      };
    }
    setData(shaped);
    setSelfCalls(current);
    setDataSource('self');
    setState('ready');
  }, [range, session?.access_token, fetchSelfSummary]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const callClicks = selfCalls?.totals.callClicks;
  const callRate =
    data && callClicks !== undefined && data.totals.users > 0
      ? `${((callClicks / data.totals.users) * 100).toFixed(1)}%`
      : null;

  const callsByPath = new Map((selfCalls?.pages ?? []).map((p) => [p.path, p.calls]));
  const booksByPath = new Map((selfCalls?.pages ?? []).map((p) => [p.path, p.books ?? 0]));
  const callSources = (selfCalls?.sources ?? []).filter((s) => s.calls > 0);

  const maxSourceSessions = Math.max(...(data?.sources.map((s) => s.sessions) ?? [0]), 1);
  const maxPageViews = Math.max(...(data?.pages.map((p) => p.pageViews) ?? [0]), 1);
  const totalDeviceUsers = (data?.devices ?? []).reduce((sum, d) => sum + d.users, 0);

  // Content scoreboard: pages ranked by what they produce.
  const scoreboard = (data?.pages ?? [])
    .map((p) => {
      const calls = p.calls ?? callsByPath.get(p.path) ?? (selfCalls ? 0 : undefined);
      const books = booksByPath.get(p.path) ?? (selfCalls ? 0 : undefined);
      return {
        ...p,
        calls,
        books,
        callRate: calls !== undefined && p.users > 0 ? (calls / p.users) * 100 : undefined,
      };
    })
    .sort((a, b) => ((b.calls ?? 0) + (b.books ?? 0)) - ((a.calls ?? 0) + (a.books ?? 0)) || b.pageViews - a.pageViews);
  const bestCallRate = Math.max(...scoreboard.map((r) => (r.calls ? r.callRate ?? 0 : 0)), 0);

  return (
    <>
      <SEO
        title="Analytics | Tiki Taco Cruises"
        description="Traffic analytics for Tiki Taco Cruises."
        noindex={true}
      />
      <div className="min-h-screen bg-sand px-4 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <AdminNav
            title="Analytics"
            actions={
              <div className="flex flex-wrap items-center gap-2">
                {RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setRange(opt.key)}
                    className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                      range === opt.key
                        ? 'bg-coral text-white'
                        : 'text-navy border border-navy/20 hover:border-coral hover:text-coral'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            }
          />

          {state === 'loading' && (
            <div className="text-center text-navy py-16">Loading analytics…</div>
          )}

          {state === 'error' && (
            <div className="rounded-lg border border-coral/30 bg-coral/10 text-coral px-4 py-3">
              Couldn’t load analytics data. Try refreshing — if it keeps failing, check the
              Netlify function logs.
            </div>
          )}

          {state === 'not-configured' && (
            <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-6 sm:p-8 max-w-3xl text-center">
              <div className="text-5xl mb-4" aria-hidden="true">📊</div>
              <h2 className="text-3xl font-bold text-navy mb-3">Analytics Coming Soon</h2>
              <p className="text-gray-700 max-w-md mx-auto">
                Traffic stats — visitors, page views, call clicks, and where they come from —
                will appear here once tracking is connected. The site is already collecting
                data with Google Analytics in the meantime.
              </p>
            </div>
          )}

          {state === 'ready' && data && (
            <div className="space-y-6">
              {/* Stat cards with period-over-period deltas */}
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
                <StatCard icon={Users} label="Visitors" value={data.totals.users.toLocaleString()}>
                  <Delta current={data.totals.users} previous={data.prevTotals?.users} />
                </StatCard>
                <StatCard icon={MousePointerClick} label="Sessions" value={data.totals.sessions.toLocaleString()}>
                  <Delta current={data.totals.sessions} previous={data.prevTotals?.sessions} />
                </StatCard>
                <StatCard icon={Eye} label="Page Views" value={data.totals.pageViews.toLocaleString()}>
                  <Delta current={data.totals.pageViews} previous={data.prevTotals?.pageViews} />
                </StatCard>
                <StatCard
                  icon={Timer}
                  label="Avg. Visit"
                  value={dataSource === 'ga' ? formatDuration(data.totals.avgSessionSeconds) : '—'}
                >
                  {dataSource === 'ga' && (
                    <Delta current={data.totals.avgSessionSeconds} previous={data.prevTotals?.avgSessionSeconds} />
                  )}
                </StatCard>
                <StatCard
                  icon={Phone}
                  label="Call Clicks"
                  value={callClicks !== undefined ? callClicks.toLocaleString() : '—'}
                  note={callClicks === undefined ? 'setup pending' : undefined}
                />
                <StatCard
                  icon={Phone}
                  label="Call Rate"
                  value={callRate ?? '—'}
                  note={callClicks === undefined ? 'setup pending' : undefined}
                />
                <StatCard
                  icon={CalendarCheck}
                  label="Booking Opens"
                  value={selfCalls ? selfCalls.totals.bookClicks.toLocaleString() : '—'}
                  note={selfCalls ? 'calendar opened' : 'setup pending'}
                />
              </div>

              {/* Trend */}
              <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h2 className="text-lg font-bold text-navy">
                    {data.granularity === 'hour' ? 'Page Views by Hour' : 'Daily Page Views'}
                  </h2>
                  <button
                    onClick={() => setTrendLabels((v) => !v)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      trendLabels
                        ? 'bg-navy text-white'
                        : 'text-navy border border-navy/20 hover:border-coral hover:text-coral'
                    }`}
                  >
                    Data Labels {trendLabels ? 'On' : 'Off'}
                  </button>
                </div>
                <TrendChart trend={data.trend} granularity={data.granularity ?? 'day'} showLabels={trendLabels} />
              </div>

              {/* Visitor log — single-day views only */}
              {(range === 'today' || range === 'yesterday') && (
                <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-navy mb-1">
                    Visitor Log — {range === 'today' ? 'Today' : 'Yesterday'}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Every visit, newest first (built-in tracking · collecting since Jul 13, 2026).
                  </p>
                  {!sessionLog || sessionLog.length === 0 ? (
                    <p className="text-sm text-gray-500">No visits recorded {range === 'today' ? 'yet today' : 'that day'}.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[560px]">
                        <thead>
                          <tr className="text-left text-navy/60 border-b border-navy/10">
                            <th className="py-2 pr-3 font-semibold">Time</th>
                            <th className="py-2 px-3 font-semibold">Landed On</th>
                            <th className="py-2 px-3 font-semibold">Came From</th>
                            <th className="py-2 px-3 font-semibold">Device</th>
                            <th className="py-2 px-3 font-semibold text-right">Pages</th>
                            <th className="py-2 pl-3 font-semibold text-right">Calls</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sessionLog.map((s) => (
                            <tr key={s.session_id} className="border-b border-navy/5 last:border-0">
                              <td className="py-2 pr-3 text-navy/70 whitespace-nowrap">
                                {new Date(s.started_at).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  timeZone: 'America/New_York',
                                })}
                              </td>
                              <td className="py-2 px-3 text-gray-700">{prettyPath(s.entry_path ?? '—')}</td>
                              <td className="py-2 px-3 text-gray-700" title={s.source}>{prettySource(s.source)}</td>
                              <td className="py-2 px-3 text-navy/70 capitalize">{s.device}</td>
                              <td className="py-2 px-3 text-right text-navy/70">{s.views}</td>
                              <td className={`py-2 pl-3 text-right font-semibold ${s.calls > 0 ? 'text-coral' : 'text-gray-400'}`}>
                                {s.calls > 0 ? `☎ ${s.calls}` : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Who visited × how they found us (GA) */}
              {dataSource === 'ga' && (data.visitorDetail?.length ?? 0) > 0 && (() => {
                const filtered = data.visitorDetail!.filter((v) =>
                  detailFilter === 'all' ? true
                  : detailFilter === 'paid' ? isPaidSource(v.source)
                  : detailFilter === 'hilton' ? /hilton/i.test(v.source)
                  : !isPaidSource(v.source)
                );
                const sortVal = (v: (typeof filtered)[number]) =>
                  detailSort.key === 'location' ? formatLocation(v)
                  : detailSort.key === 'source' ? prettySource(v.source)
                  : detailSort.key === 'type' ? (isPaidSource(v.source) ? 'paid' : 'organic')
                  : v.users;
                const rows = [...filtered].sort((a, b) => {
                  const av = sortVal(a); const bv = sortVal(b);
                  const cmp = typeof av === 'number' ? (av as number) - (bv as number) : String(av).localeCompare(String(bv));
                  return cmp * detailSort.dir;
                });
                const filteredTotal = rows.reduce((sum, v) => sum + v.users, 0);
                const visibleRows = detailExpanded ? rows : rows.slice(0, 25);
                const sortBy = (key: typeof detailSort.key) =>
                  setDetailSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === 'users' ? -1 : 1 }));
                const arrow = (key: typeof detailSort.key) =>
                  detailSort.key === key ? (detailSort.dir === 1 ? ' ▲' : ' ▼') : '';

                // Aggregate per location for the chart (paid/other split).
                const byLocation = new Map<string, { paid: number; other: number }>();
                rows.forEach((v) => {
                  const key = formatLocation(v);
                  const entry = byLocation.get(key) ?? { paid: 0, other: 0 };
                  if (isPaidSource(v.source)) entry.paid += v.users;
                  else entry.other += v.users;
                  byLocation.set(key, entry);
                });
                const chartRows = [...byLocation.entries()]
                  .map(([label, x]) => ({ label, ...x, total: x.paid + x.other }))
                  .sort((a, b) => b.total - a.total)
                  .slice(0, 12);
                const chartMax = Math.max(...chartRows.map((r) => r.total), 1);

                const filterBtn = (key: typeof detailFilter, label: string) => (
                  <button
                    key={key}
                    onClick={() => setDetailFilter(key)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors min-h-[44px] ${
                      detailFilter === key
                        ? 'bg-navy text-white'
                        : 'text-navy border border-navy/20 hover:border-coral hover:text-coral'
                    }`}
                  >
                    {label}
                  </button>
                );

                return (
                  <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                      <div>
                        <h2 className="text-lg font-bold text-navy">Visitors × How They Found Us</h2>
                        <p className="text-sm text-gray-500">
                          {filteredTotal.toLocaleString()} visitors shown · Google Analytics
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-sand/60 rounded-full p-1">
                        {(['list', 'chart'] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => setDetailView(v)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                              detailView === v ? 'bg-white text-navy shadow' : 'text-navy/60'
                            }`}
                          >
                            {v === 'chart' ? 'Bar Graph' : 'List'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                      {filterBtn('all', 'All')}
                      {filterBtn('paid', 'Paid Ads')}
                      {filterBtn('other', 'Organic & Direct')}
                      {filterBtn('hilton', 'Hilton Referral')}
                    </div>

                    {rows.length === 0 ? (
                      <p className="text-sm text-gray-500">No visitors match this filter in the selected period.</p>
                    ) : detailView === 'list' ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[520px]">
                          <thead>
                            <tr className="text-left text-navy/60 border-b border-navy/10">
                              <th className="py-2 pr-3 font-semibold">
                                <button onClick={() => sortBy('location')} className="hover:text-coral">Location{arrow('location')}</button>
                              </th>
                              <th className="py-2 px-3 font-semibold">
                                <button onClick={() => sortBy('source')} className="hover:text-coral">Came From{arrow('source')}</button>
                              </th>
                              <th className="py-2 px-3 font-semibold">
                                <button onClick={() => sortBy('type')} className="hover:text-coral">Type{arrow('type')}</button>
                              </th>
                              <th className="py-2 pl-3 font-semibold text-right">
                                <button onClick={() => sortBy('users')} className="hover:text-coral">Visitors{arrow('users')}</button>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {visibleRows.map((v, i) => (
                              <tr key={i} className="border-b border-navy/5 last:border-0">
                                <td className="py-2 pr-3 text-gray-700">{formatLocation(v)}</td>
                                <td className="py-2 px-3 text-gray-700" title={v.source}>{prettySource(v.source)}</td>
                                <td className="py-2 px-3">
                                  <span
                                    className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${
                                      isPaidSource(v.source) ? 'bg-coral/15 text-coral' : 'bg-teal/15 text-teal'
                                    }`}
                                  >
                                    {isPaidSource(v.source) ? 'PAID' : 'ORGANIC'}
                                  </span>
                                </td>
                                <td className="py-2 pl-3 text-right font-semibold text-navy">{v.users.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {rows.length > 25 && (
                          <button
                            onClick={() => setDetailExpanded((v) => !v)}
                            className="mt-3 w-full text-center text-sm font-semibold text-teal hover:text-coral transition-colors py-2"
                          >
                            {detailExpanded ? 'Show top 25' : `View all ${rows.length} rows`}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {chartRows.map((r) => (
                          <div key={r.label} className="flex items-center gap-3">
                            <div className="w-40 sm:w-48 flex-shrink-0 text-sm text-gray-700 truncate" title={r.label}>
                              {r.label}
                            </div>
                            <div className="flex-1 flex h-5 rounded-md overflow-hidden bg-navy/5">
                              {r.paid > 0 && (
                                <div
                                  className="bg-coral h-full"
                                  style={{ width: `${(r.paid / chartMax) * 100}%` }}
                                  title={`Paid: ${r.paid}`}
                                />
                              )}
                              {r.other > 0 && (
                                <div
                                  className="bg-teal h-full"
                                  style={{ width: `${(r.other / chartMax) * 100}%` }}
                                  title={`Organic & direct: ${r.other}`}
                                />
                              )}
                            </div>
                            <div className="w-10 text-right text-sm font-bold text-navy">{r.total.toLocaleString()}</div>
                          </div>
                        ))}
                        <div className="flex items-center gap-4 pt-2 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-sm bg-coral inline-block" /> Paid ads
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-sm bg-teal inline-block" /> Organic &amp; direct
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic sources */}
                <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-navy mb-4">Traffic Sources</h2>
                  {data.sources.length === 0 ? (
                    <p className="text-sm text-gray-500">No sessions in this period.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.sources.map((s) => (
                        <div key={s.source} className="flex items-center gap-3">
                          <div className="w-40 sm:w-48 flex-shrink-0 text-sm text-gray-700 truncate" title={s.source}>
                            {prettySource(s.source)}
                          </div>
                          <ShareBar value={s.sessions} max={maxSourceSessions} />
                          <div className="w-14 text-right text-sm font-semibold text-navy">
                            {s.sessions.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {callSources.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-navy/10">
                      <h3 className="text-sm font-bold text-navy mb-2 inline-flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-coral" /> Call clicks by source
                      </h3>
                      <div className="space-y-1.5">
                        {callSources.map((s) => (
                          <div key={s.source} className="flex justify-between text-sm">
                            <span className="text-gray-700 truncate" title={s.source}>{prettySource(s.source)}</span>
                            <span className="font-semibold text-coral">{s.calls}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Top pages */}
                <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-navy mb-4">Top Pages</h2>
                  {data.pages.length === 0 ? (
                    <p className="text-sm text-gray-500">No page views in this period.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.pages.map((p) => (
                        <div key={p.path} className="flex items-center gap-3">
                          <div className="w-40 sm:w-48 flex-shrink-0 text-sm text-gray-700 truncate" title={p.path}>
                            {prettyPath(p.path)}
                          </div>
                          <ShareBar value={p.pageViews} max={maxPageViews} />
                          <div className="w-14 text-right text-sm font-semibold text-navy">
                            {p.pageViews.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Content scoreboard */}
              <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-navy mb-1">What’s Working</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Pages ranked by the calls they produce{selfCalls ? '' : ' — call tracking pending database setup'}.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[560px]">
                    <thead>
                      <tr className="text-left text-navy/60 border-b border-navy/10">
                        <th className="py-2 pr-3 font-semibold">Page</th>
                        <th className="py-2 px-3 font-semibold text-right">Visitors</th>
                        <th className="py-2 px-3 font-semibold text-right">Views</th>
                        <th className="py-2 px-3 font-semibold text-right">Call Clicks</th>
                        <th className="py-2 px-3 font-semibold text-right">Booking Opens</th>
                        <th className="py-2 pl-3 font-semibold text-right">Call Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scoreboard.map((row) => {
                        const isTop = !!row.calls && row.callRate === bestCallRate && bestCallRate > 0;
                        const isDud = selfCalls !== null && row.calls === 0 && row.pageViews >= maxPageViews * 0.4;
                        return (
                          <tr key={row.path} className="border-b border-navy/5 last:border-0">
                            <td className="py-2.5 pr-3 text-gray-700">
                              <span className="inline-flex items-center gap-1.5">
                                {prettyPath(row.path)}
                                {isTop && <Trophy className="w-3.5 h-3.5 text-amber-500" aria-label="Best call rate" />}
                                {isDud && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" aria-label="High traffic, no calls yet" />}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right font-medium text-navy">{row.users.toLocaleString()}</td>
                            <td className="py-2.5 px-3 text-right text-navy/70">{row.pageViews.toLocaleString()}</td>
                            <td className={`py-2.5 px-3 text-right font-semibold ${row.calls ? 'text-coral' : 'text-gray-400'}`}>
                              {row.calls !== undefined ? row.calls : '—'}
                            </td>
                            <td className={`py-2.5 px-3 text-right font-semibold ${row.books ? 'text-teal' : 'text-gray-400'}`}>
                              {row.books !== undefined ? row.books : '—'}
                            </td>
                            <td className="py-2.5 pl-3 text-right text-navy/70">
                              {row.callRate !== undefined ? `${row.callRate.toFixed(1)}%` : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visitor locations */}
                <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-navy mb-4 inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-coral" /> Visitor Locations
                  </h2>
                  {!data.locations || data.locations.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      {dataSource === 'ga' ? 'No location data in this period.' : 'Location data comes from Google Analytics.'}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {data.locations.map((l, i) => {
                        const maxLoc = data.locations![0].users || 1;
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className="w-44 sm:w-52 flex-shrink-0 text-sm text-gray-700 truncate"
                              title={`${l.city}, ${l.region}, ${l.country}`}
                            >
                              {formatLocation(l)}
                            </div>
                            <ShareBar value={l.users} max={maxLoc} />
                            <div className="w-12 text-right text-sm font-semibold text-navy">
                              {l.users.toLocaleString()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Devices */}
                <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-navy mb-4">Devices</h2>
                  <div className="flex flex-wrap gap-4">
                    {data.devices.map((d) => {
                      const Icon = DEVICE_ICONS[d.device] ?? Monitor;
                      const pct = totalDeviceUsers > 0 ? Math.round((d.users / totalDeviceUsers) * 100) : 0;
                      return (
                        <div key={d.device} className="flex items-center gap-3 bg-sand/50 rounded-xl px-4 py-3 self-start">
                          <Icon className="w-5 h-5 text-teal" />
                          <span className="capitalize text-navy font-semibold">{d.device}</span>
                          <span className="text-gray-600 text-sm">
                            {d.users.toLocaleString()} ({pct}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                {dataSource === 'ga'
                  ? 'Traffic: Google Analytics 4 (may lag real-time by 24–48h) · Call clicks: built-in site tracking · Change % compares the previous period of equal length.'
                  : 'Source: built-in site tracking · Change % compares the previous period of equal length.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  note,
  children,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-4">
      <div className="flex items-center gap-1.5 text-navy/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className="text-2xl font-bold text-navy price-text inline-flex items-baseline">
        {value}
        {children}
      </div>
      {note && <div className="text-[0.65rem] text-gray-400 mt-0.5">{note}</div>}
    </div>
  );
}
