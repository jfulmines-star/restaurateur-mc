import { TrendingUp, DollarSign, Users, AlertTriangle, ChefHat, Clock, Star } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { RESTAURANTS } from '../config'

const fmt$ = (n: number) => '$' + n.toLocaleString()

// Revenue data per location
const WEEKLY_TREND = [
  { day: 'Mon', Harbor: 4200, Loft: 1800, O76: 980 },
  { day: 'Tue', Harbor: 3800, Loft: 1600, O76: 1100 },
  { day: 'Wed', Harbor: 5100, Loft: 2200, O76: 1400 },
  { day: 'Thu', Harbor: 5600, Loft: 2400, O76: 1600 },
  { day: 'Fri', Harbor: 8200, Loft: 3100, O76: 2800 },
  { day: 'Sat', Harbor: 9400, Loft: 3600, O76: 3200 },
  { day: 'Sun', Harbor: 6800, Loft: 2900, O76: 2100 },
]

const MONTHLY_TREND = [
  { month: 'Sep', Harbor: 98000, Loft: 42000, O76: 0 },
  { month: 'Oct', Harbor: 104000, Loft: 44000, O76: 0 },
  { month: 'Nov', Harbor: 112000, Loft: 46000, O76: 0 },
  { month: 'Dec', Harbor: 138000, Loft: 54000, O76: 0 },
  { month: 'Jan', Harbor: 96000, Loft: 38000, O76: 12000 },
  { month: 'Feb', Harbor: 101000, Loft: 40000, O76: 28000 },
  { month: 'Mar', Harbor: 43200, Loft: 15600, O76: 13180 },
]

const THIS_WEEK = { Harbor: 43100, Loft: 17600, O76: 13180 }
const LAST_WEEK = { Harbor: 38900, Loft: 15800, O76: 9400 }
const TODAY = { Harbor: 6800, Loft: 2900, O76: 2100 }
const YESTERDAY = { Harbor: 9400, Loft: 3600, O76: 3200 }

const axisStyle = { fill: '#64748b', fontSize: 10 }
const gridStyle = { stroke: '#1e293b' }

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs shadow-xl">
      <p className="font-bold text-white mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {fmt$(p.value)}</p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const totalToday = Object.values(TODAY).reduce((s, v) => s + v, 0)
  const totalYesterday = Object.values(YESTERDAY).reduce((s, v) => s + v, 0)
  const totalWeek = Object.values(THIS_WEEK).reduce((s, v) => s + v, 0)
  const totalLastWeek = Object.values(LAST_WEEK).reduce((s, v) => s + v, 0)
  const dayPct = ((totalToday - totalYesterday) / totalYesterday * 100)
  const weekPct = ((totalWeek - totalLastWeek) / totalLastWeek * 100)

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-black text-white">Dashboard</h1>
        </div>
        <p className="text-sm text-slate-400">Chen Hospitality Group · 3 locations · March 9, 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Revenue Today', value: fmt$(totalToday), sub: `vs. ${fmt$(totalYesterday)} yesterday`, pct: dayPct, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
          { label: 'Revenue This Week', value: fmt$(totalWeek), sub: `vs. ${fmt$(totalLastWeek)} last week`, pct: weekPct, icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { label: 'Total Staff On Clock', value: '18', sub: '3 locations active tonight', pct: null, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
          { label: 'Open Action Items', value: '5', sub: '2 urgent', pct: null, icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl border ${s.border} ${s.bg}`}>
            <s.icon className={`w-4 h-4 ${s.color} mb-2`} />
            <p className={`text-2xl font-black tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            {s.pct !== null && (
              <p className={`text-xs font-semibold mt-1 ${s.pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {s.pct >= 0 ? '▲' : '▼'} {Math.abs(s.pct).toFixed(1)}% {s.pct >= 0 ? 'up' : 'down'}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Per-location revenue today */}
      <div>
        <p className="text-sm font-bold text-white mb-3">Revenue Today — By Location</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RESTAURANTS.map(r => {
            const today = TODAY[r.short === 'Harbor' ? 'Harbor' : r.short === 'Loft' ? 'Loft' : 'O76']
            const yest = YESTERDAY[r.short === 'Harbor' ? 'Harbor' : r.short === 'Loft' ? 'Loft' : 'O76']
            const pct = ((today - yest) / yest * 100)
            return (
              <div key={r.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-white">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.location}</p>
                  </div>
                  {r.opening && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">NEW</span>}
                </div>
                <p className="text-2xl font-black text-white tabular-nums">{fmt$(today)}</p>
                <p className={`text-xs font-semibold mt-1 ${pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {pct >= 0 ? '▲' : '▼'} {Math.abs(pct).toFixed(1)}% vs yesterday ({fmt$(yest)})
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Weekly Revenue Chart */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Daily Revenue — This Week</p>
        <p className="text-[10px] text-slate-600 mb-4">All 3 locations · Mon–Sun</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_TREND} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
              <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} width={36} />
              <Tooltip content={<ChartTip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              <Bar dataKey="Harbor" stackId="a" fill="#10b981" radius={[0,0,0,0]} />
              <Bar dataKey="Loft" stackId="a" fill="#3b82f6" />
              <Bar dataKey="O76" stackId="a" fill="#f59e0b" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Revenue Trend</p>
        <p className="text-[10px] text-slate-600 mb-4">Sep 2025 – Mar 2026 · O76 opened Jan 2026</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_TREND} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={axisStyle} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<ChartTip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              <Line type="monotone" dataKey="Harbor" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Loft" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="O76" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <p className="text-sm font-bold text-white">Upcoming Deadlines</p>
          </div>
          <div className="space-y-2">
            {[
              { item: 'Harbor Kitchen — Liquor License Renewal', due: 'Apr 1, 2026', urgent: true },
              { item: 'Omakase 76 — Health Permit (new location)', due: 'Mar 20, 2026', urgent: true },
              { item: 'The Loft — Food Handler Cert Renewal (3 staff)', due: 'Apr 15, 2026', urgent: false },
            ].map(d => (
              <div key={d.item} className="flex items-start gap-2">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${d.urgent ? 'bg-red-400' : 'bg-amber-400'}`} />
                <div>
                  <p className="text-xs text-white">{d.item}</p>
                  <p className={`text-[10px] ${d.urgent ? 'text-red-400' : 'text-slate-500'}`}>Due {d.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-950/20 border border-red-800/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-red-400" />
            <p className="text-sm font-bold text-white">Expiring Inventory</p>
          </div>
          <div className="space-y-2">
            {[
              { item: 'Harbor — Bluefin tuna (4.2 lbs)', exp: 'Tonight', action: 'Run omakase special or staff meal' },
              { item: 'Loft — Miso paste (3 jars)', exp: 'Mar 11', action: 'Feature in ramen special this week' },
              { item: 'O76 — King salmon (2.8 lbs)', exp: 'Mar 10', action: 'Add to hand roll bar as weekend special' },
            ].map(i => (
              <div key={i.item} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-red-400" />
                <div>
                  <p className="text-xs text-white">{i.item} <span className="text-red-400 font-semibold">· {i.exp}</span></p>
                  <p className="text-[10px] text-slate-400 italic">{i.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner ownership */}
      <div>
        <p className="text-sm font-bold text-white mb-3">Partner Ownership Summary</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RESTAURANTS.map(r => (
            <div key={r.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <p className="text-xs font-bold text-white mb-3">{r.name}</p>
              <div className="space-y-2">
                {r.partners.map(p => (
                  <div key={p.name} className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${p.pct}%` }} />
                    </div>
                    <p className="text-xs text-slate-300 w-28 truncate">{p.name}</p>
                    <p className="text-xs font-bold text-orange-400 w-8 text-right">{p.pct}%</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent reviews */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-yellow-400" />
          <p className="text-sm font-bold text-white">Recent Guest Reviews</p>
        </div>
        <div className="space-y-3">
          {[
            { loc: 'Harbor Kitchen', stars: 5, text: 'Best omakase experience in Milwaukee. Chef\'s attention to detail is unreal.', date: 'Mar 8' },
            { loc: 'The Loft', stars: 4, text: 'Great spot in the market. Ramen was incredible, a bit noisy on weekends.', date: 'Mar 7' },
            { loc: 'Omakase 76', stars: 5, text: 'Just opened and already flawless. The hand roll bar is going to be legendary.', date: 'Mar 6' },
          ].map(r => (
            <div key={r.text} className="flex items-start gap-3">
              <div className="shrink-0">
                <p className="text-[10px] text-slate-500">{r.loc}</p>
                <p className="text-yellow-400 text-xs">{'★'.repeat(r.stars)}</p>
              </div>
              <p className="text-xs text-slate-300 flex-1">"{r.text}"</p>
              <p className="text-[10px] text-slate-600 shrink-0">{r.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
