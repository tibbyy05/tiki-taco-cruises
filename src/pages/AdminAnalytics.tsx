import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Users, MousePointerClick, Eye, Timer, Monitor, Smartphone, Tablet, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import AdminNav from '../components/AdminNav';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface AnalyticsData {
  days: number;
  totals: {
    users: number;
    sessions: number;
    pageViews: number;
    avgSessionSeconds: number;
    callClicks?: number;
    bookClicks?: number;
  };
  trend: Array<{ date: string; users: number; pageViews: number }>;
  sources: Array<{ source: string; sessions: number; users: number; calls?: number }>;
  pages: Array<{ path: string; pageViews: number; users: number; calls?: number }>;
  devices: Array<{ device: string; users: number }>;
}

// Shape returned by the tiki_analytics_summary RPC (self-hosted tracking).
interface SelfHostedSummary {
  totals: { pageViews: number; visitors: number; callClicks: number; bookClicks: number };
  trend: Array<{ date: string; views: number; visitors: number }>;
  pages: Array<{ path: string; views: number; visitors: number; calls: number }>;
  sources: Array<{ source: string; views: number; visitors: number; calls: number }>;
  devices: Array<{ device: string; visitors: number }>;
}

const fromSelfHosted = (raw: SelfHostedSummary, days: number): AnalyticsData => ({
  days,
  totals: {
    users: raw.totals.visitors,
    sessions: raw.totals.visitors,
    pageViews: raw.totals.pageViews,
    avgSessionSeconds: 0,
    callClicks: raw.totals.callClicks,
    bookClicks: raw.totals.bookClicks,
  },
  trend: raw.trend.map((t) => ({ date: t.date, users: t.visitors, pageViews: t.views })),
  sources: raw.sources.map((s) => ({ source: s.source, sessions: s.views, users: s.visitors, calls: s.calls })),
  pages: raw.pages.map((p) => ({ path: p.path, pageViews: p.views, users: p.visitors, calls: p.calls })),
  devices: raw.devices.map((d) => ({ device: d.device, users: d.visitors })),
});

type LoadState = 'loading' | 'ready' | 'not-configured' | 'error';

const RANGE_OPTIONS = [
  { days: '7', label: 'Last 7 days' },
  { days: '28', label: 'Last 28 days' },
  { days: '90', label: 'Last 90 days' },
];

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const formatTrendDate = (yyyymmdd: string) =>
  `${yyyymmdd.slice(4, 6)}/${yyyymmdd.slice(6, 8)}`;

const DEVICE_ICONS: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

function TrendChart({ trend }: { trend: AnalyticsData['trend'] }) {
  if (trend.length === 0) {
    return <p className="text-sm text-gray-500 py-10 text-center">No traffic recorded yet in this period.</p>;
  }
  const w = 800;
  const h = 220;
  const pad = { top: 12, right: 8, bottom: 26, left: 8 };
  const max = Math.max(...trend.map((d) => d.pageViews), 1);
  const barW = (w - pad.left - pad.right) / trend.length;
  const labelEvery = Math.max(1, Math.ceil(trend.length / 10));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Daily page views">
      {trend.map((d, i) => {
        const barH = Math.max(2, ((h - pad.top - pad.bottom) * d.pageViews) / max);
        const x = pad.left + i * barW;
        const y = h - pad.bottom - barH;
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
              <title>{`${formatTrendDate(d.date)} — ${d.pageViews} page views, ${d.users} visitors`}</title>
            </rect>
            {i % labelEvery === 0 && (
              <text
                x={x + barW / 2}
                y={h - 8}
                textAnchor="middle"
                className="fill-navy/60"
                fontSize="11"
              >
                {formatTrendDate(d.date)}
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
  const [days, setDays] = useState('28');
  const [state, setState] = useState<LoadState>('loading');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [dataSource, setDataSource] = useState<'ga' | 'self'>('ga');

  // Self-hosted page-view tracking (tiki_page_views) — used when the GA
  // connection isn't configured yet.
  const loadSelfHosted = useCallback(async () => {
    const { data: raw, error } = await supabase.rpc('tiki_analytics_summary', {
      days: Number(days),
    });
    if (error || !raw) {
      setState('not-configured');
      return;
    }
    setData(fromSelfHosted(raw as SelfHostedSummary, Number(days)));
    setDataSource('self');
    setState('ready');
  }, [days]);

  const load = useCallback(async () => {
    if (!session?.access_token) return;
    setState('loading');
    try {
      const res = await fetch(`/.netlify/functions/analytics?days=${days}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.status === 501) {
        await loadSelfHosted();
        return;
      }
      if (!res.ok) {
        setState('error');
        return;
      }
      const body = await res.json();
      setData(body);
      setDataSource('ga');
      setState('ready');
    } catch {
      // Local dev has no Netlify functions — fall back to self-hosted stats.
      await loadSelfHosted();
    }
  }, [days, session?.access_token, loadSelfHosted]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const statCards = data
    ? dataSource === 'ga'
      ? [
          { icon: Users, label: 'Visitors', value: data.totals.users.toLocaleString() },
          { icon: MousePointerClick, label: 'Sessions', value: data.totals.sessions.toLocaleString() },
          { icon: Eye, label: 'Page Views', value: data.totals.pageViews.toLocaleString() },
          { icon: Timer, label: 'Avg. Visit', value: formatDuration(data.totals.avgSessionSeconds) },
        ]
      : [
          { icon: Users, label: 'Visitors', value: data.totals.users.toLocaleString() },
          { icon: Eye, label: 'Page Views', value: data.totals.pageViews.toLocaleString() },
          { icon: Phone, label: 'Call Clicks', value: (data.totals.callClicks ?? 0).toLocaleString() },
          {
            icon: MousePointerClick,
            label: 'Call Rate',
            value:
              data.totals.users > 0
                ? `${(((data.totals.callClicks ?? 0) / data.totals.users) * 100).toFixed(1)}%`
                : '—',
          },
        ]
    : [];

  const maxSourceSessions = Math.max(...(data?.sources.map((s) => s.sessions) ?? [0]), 1);
  const maxPageViews = Math.max(...(data?.pages.map((p) => p.pageViews) ?? [0]), 1);
  const totalDeviceUsers = (data?.devices ?? []).reduce((sum, d) => sum + d.users, 0);

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
              <div className="flex items-center gap-2">
                {RANGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.days}
                    onClick={() => setDays(opt.days)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      days === opt.days
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

          {/* Setup reference for developers (hidden from the owner view above):
              quick option is running supabase/migrations/20260709_tiki_page_views.sql
              in the Supabase SQL editor (built-in tracking); richer option is the
              GA4 service-account env vars described below. */}
          {false && (
            <div className="hidden">
              <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm leading-relaxed">
                <li>
                  In <span className="font-semibold">Google Cloud Console</span>, create (or pick) a
                  project and enable the <span className="font-semibold">Google Analytics Data API</span>.
                </li>
                <li>
                  Create a <span className="font-semibold">service account</span>, then create a JSON
                  key for it.
                </li>
                <li>
                  In <span className="font-semibold">Google Analytics → Admin → Property access
                  management</span>, add the service account email with <span className="font-semibold">Viewer</span> role.
                </li>
                <li>
                  In <span className="font-semibold">Netlify → Site settings → Environment
                  variables</span>, add: <code className="bg-sand px-1 rounded">GA4_PROPERTY_ID</code>,{' '}
                  <code className="bg-sand px-1 rounded">GA_SA_EMAIL</code>, and{' '}
                  <code className="bg-sand px-1 rounded">GA_SA_PRIVATE_KEY</code> (from the JSON key),
                  then redeploy.
                </li>
              </ol>
              <p className="text-gray-500 text-sm mt-4">
                Until then, data is viewable in{' '}
                <a
                  href="https://analytics.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal hover:text-coral underline"
                >
                  Google Analytics
                </a>
                .
              </p>
            </div>
          )}

          {state === 'ready' && data && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {statCards.map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5">
                    <div className="flex items-center gap-2 text-navy/60 text-sm font-semibold mb-2">
                      <card.icon className="w-4 h-4" /> {card.label}
                    </div>
                    <div className="text-3xl font-bold text-navy price-text">{card.value}</div>
                  </div>
                ))}
              </div>

              {/* Daily trend */}
              <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-navy mb-4">Daily Page Views</h2>
                <TrendChart trend={data.trend} />
              </div>

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
                            {s.source}
                          </div>
                          <ShareBar value={s.sessions} max={maxSourceSessions} />
                          <div className="w-14 text-right text-sm font-semibold text-navy">
                            {s.sessions.toLocaleString()}
                          </div>
                          {typeof s.calls === 'number' && (
                            <div
                              className={`w-16 flex-shrink-0 text-right text-xs font-semibold inline-flex items-center justify-end gap-1 ${s.calls > 0 ? 'text-coral' : 'text-gray-400'}`}
                              title="Call to Book clicks"
                            >
                              <Phone className="w-3 h-3" /> {s.calls}
                            </div>
                          )}
                        </div>
                      ))}
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
                            {p.path}
                          </div>
                          <ShareBar value={p.pageViews} max={maxPageViews} />
                          <div className="w-14 text-right text-sm font-semibold text-navy">
                            {p.pageViews.toLocaleString()}
                          </div>
                          {typeof p.calls === 'number' && (
                            <div
                              className={`w-16 flex-shrink-0 text-right text-xs font-semibold inline-flex items-center justify-end gap-1 ${p.calls > 0 ? 'text-coral' : 'text-gray-400'}`}
                              title="Call to Book clicks"
                            >
                              <Phone className="w-3 h-3" /> {p.calls}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Devices */}
              <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-navy mb-4">Devices</h2>
                <div className="flex flex-wrap gap-4">
                  {data.devices.map((d) => {
                    const Icon = DEVICE_ICONS[d.device] ?? Monitor;
                    const pct = totalDeviceUsers > 0 ? Math.round((d.users / totalDeviceUsers) * 100) : 0;
                    return (
                      <div key={d.device} className="flex items-center gap-3 bg-sand/50 rounded-xl px-4 py-3">
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

              <p className="text-xs text-gray-500">
                {dataSource === 'ga'
                  ? 'Source: Google Analytics 4 · Data may lag real-time activity by 24–48 hours.'
                  : 'Source: built-in site tracking (collecting since Jul 2026) · Connect Google Analytics for richer data — see setup in the docs card when disconnected.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
