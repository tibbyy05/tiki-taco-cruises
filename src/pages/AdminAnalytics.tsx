import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Users, MousePointerClick, Eye, Timer, Monitor, Smartphone, Tablet } from 'lucide-react';
import SEO from '../components/SEO';
import AdminNav from '../components/AdminNav';
import { useAuth } from '../context/AuthContext';

interface AnalyticsData {
  days: number;
  totals: { users: number; sessions: number; pageViews: number; avgSessionSeconds: number };
  trend: Array<{ date: string; users: number; pageViews: number }>;
  sources: Array<{ source: string; sessions: number; users: number }>;
  pages: Array<{ path: string; pageViews: number; users: number }>;
  devices: Array<{ device: string; users: number }>;
}

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

  const load = useCallback(async () => {
    if (!session?.access_token) return;
    setState('loading');
    try {
      const res = await fetch(`/.netlify/functions/analytics?days=${days}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.status === 501) {
        setState('not-configured');
        return;
      }
      if (!res.ok) {
        setState('error');
        return;
      }
      setData(await res.json());
      setState('ready');
    } catch {
      setState('error');
    }
  }, [days, session?.access_token]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  const statCards = data
    ? [
        { icon: Users, label: 'Visitors', value: data.totals.users.toLocaleString() },
        { icon: MousePointerClick, label: 'Sessions', value: data.totals.sessions.toLocaleString() },
        { icon: Eye, label: 'Page Views', value: data.totals.pageViews.toLocaleString() },
        { icon: Timer, label: 'Avg. Visit', value: formatDuration(data.totals.avgSessionSeconds) },
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
            <div className="bg-white rounded-2xl shadow-lg border border-navy/10 p-6 sm:p-8 max-w-3xl">
              <h2 className="text-2xl font-bold text-navy mb-3">One-time setup needed</h2>
              <p className="text-gray-700 mb-4">
                The site is already collecting traffic data with Google Analytics. To show it here,
                connect a Google service account (about 5 minutes):
              </p>
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
                Source: Google Analytics 4 · Data may lag real-time activity by 24–48 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
