import { DollarSign, TrendingUp, PieChart, Users } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'

const fmt$ = (n: number) => '$' + n.toLocaleString()
const fmtPct = (n: number) => n.toFixed(1) + '%'

const PL = [
  {
    restaurant: 'Harbor Kitchen',
    short: 'Harbor',
    color: '#10b981',
    revenue: 101000,
    foodCost: 32320,   // 32%
    laborCost: 25250,  // 25%
    occupancy: 8500,
    supplies: 3800,
    utilities: 2200,
    other: 4100,
  },
  {
    restaurant: 'The Loft',
    short: 'Loft',
    color: '#3b82f6',
    revenue: 40000,
    foodCost: 13200,   // 33%
    laborCost: 9600,   // 24%
    occupancy: 3200,
    supplies: 1400,
    utilities: 900,
    other: 1600,
  },
  {
    restaurant: 'Omakase 76',
    short: 'O76',
    color: '#f59e0b',
    revenue: 28000,
    foodCost: 8960,    // 32%
    laborCost: 7280,   // 26%
    occupancy: 4200,
    supplies: 1100,
    utilities: 800,
    other: 1200,
  },
]

const MONTHLY_NET = [
  { month: 'Sep', Harbor: 18200, Loft: 7400, O76: 0 },
  { month: 'Oct', Harbor: 19800, Loft: 8100, O76: 0 },
  { month: 'Nov', Harbor: 22400, Loft: 8600, O76: 0 },
  { month: 'Dec', Harbor: 28600, Loft: 10200, O76: 0 },
  { month: 'Jan', Harbor: 16400, Loft: 5800, O76: -2100 },
  { month: 'Feb', Harbor: 18200, Loft: 7100, O76: 4200 },
  { month: 'Mar*', Harbor: 8600, Loft: 3100, O76: 2640 },
]

const DISTRIBUTIONS = [
  { partner: 'Marcus Chen',              pct: 40, harbor: 40, loft: 50, o76: 45, qtdDist: 24800, ytdDist: 24800 },
  { partner: 'Sofia Ruiz',               pct: 35, harbor: 35, loft: 50, o76: 0,  qtdDist: 19600, ytdDist: 19600 },
  { partner: 'Daniel Park',              pct: 25, harbor: 25, loft: 0,  o76: 0,  qtdDist: 9200,  ytdDist: 9200 },
  { partner: 'James Okafor',             pct: 0,  harbor: 0,  loft: 0,  o76: 30, qtdDist: 0,     ytdDist: 0 },
  { partner: 'East Side Hospitality LLC',pct: 0,  harbor: 0,  loft: 0,  o76: 25, qtdDist: 0,     ytdDist: 0 },
]

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

export default function Financials() {
  const totRevenue = PL.reduce((s, r) => s + r.revenue, 0)
  const totFood    = PL.reduce((s, r) => s + r.foodCost, 0)
  const totLabor   = PL.reduce((s, r) => s + r.laborCost, 0)
  const totNet     = PL.reduce((s, r) => s + (r.revenue - r.foodCost - r.laborCost - r.occupancy - r.supplies - r.utilities - r.other), 0)

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-black text-white">Financials</h1>
        </div>
        <p className="text-sm text-slate-400">P&L by location, margin analysis, and partner distributions — Feb 2026</p>
      </div>

      {/* Group KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Group Revenue',     value: fmt$(totRevenue), color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    icon: DollarSign },
          { label: 'Food Cost %',       value: fmtPct(totFood/totRevenue*100), color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   icon: PieChart },
          { label: 'Labor Cost %',      value: fmtPct(totLabor/totRevenue*100), color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  icon: Users },
          { label: 'Net Operating Income', value: fmt$(totNet), color: totNet > 0 ? 'text-emerald-400' : 'text-red-400', bg: totNet > 0 ? 'bg-emerald-500/10' : 'bg-red-500/10', border: totNet > 0 ? 'border-emerald-500/20' : 'border-red-500/20', icon: TrendingUp },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl border ${s.border} ${s.bg}`}>
            <s.icon className={`w-4 h-4 ${s.color} mb-2`} />
            <p className={`text-2xl font-black tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* P&L by location */}
      <div>
        <p className="text-sm font-bold text-white mb-3">P&L by Location — February 2026</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PL.map(r => {
            const totalCosts = r.foodCost + r.laborCost + r.occupancy + r.supplies + r.utilities + r.other
            const net = r.revenue - totalCosts
            const netPct = net / r.revenue * 100
            return (
              <div key={r.restaurant} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <p className="text-sm font-black text-white mb-4">{r.restaurant}</p>
                <div className="space-y-2">
                  {[
                    { label: 'Revenue',       value: r.revenue,   pct: 100,                       color: 'text-white' },
                    { label: 'Food Cost',     value: -r.foodCost, pct: r.foodCost/r.revenue*100,   color: 'text-red-400' },
                    { label: 'Labor Cost',    value: -r.laborCost,pct: r.laborCost/r.revenue*100,  color: 'text-amber-400' },
                    { label: 'Occupancy',     value: -r.occupancy,pct: r.occupancy/r.revenue*100,  color: 'text-slate-400' },
                    { label: 'Supplies',      value: -r.supplies, pct: r.supplies/r.revenue*100,   color: 'text-slate-400' },
                    { label: 'Utilities',     value: -r.utilities,pct: r.utilities/r.revenue*100,  color: 'text-slate-400' },
                    { label: 'Other',         value: -r.other,    pct: r.other/r.revenue*100,      color: 'text-slate-400' },
                  ].map(l => (
                    <div key={l.label} className="flex items-center justify-between">
                      <p className={`text-xs ${l.color}`}>{l.label}</p>
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] text-slate-600 w-10 text-right">{l.pct.toFixed(0)}%</p>
                        <p className={`text-xs font-semibold tabular-nums w-20 text-right ${l.color}`}>{l.value < 0 ? '-' : ''}{fmt$(Math.abs(l.value))}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-slate-700 pt-2 flex items-center justify-between">
                    <p className="text-xs font-black text-white">Net Income</p>
                    <div className="flex items-center gap-3">
                      <p className={`text-[10px] font-bold w-10 text-right ${netPct > 10 ? 'text-emerald-400' : netPct > 0 ? 'text-amber-400' : 'text-red-400'}`}>{netPct.toFixed(0)}%</p>
                      <p className={`text-sm font-black tabular-nums w-20 text-right ${net > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{fmt$(net)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Net income trend */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Net Income Trend by Location</p>
        <p className="text-[10px] text-slate-600 mb-4">Sep 2025 – Mar 2026 · *Mar is month-to-date</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_NET} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
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

      {/* Food & labor cost comparison */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Food Cost % vs Labor Cost % — By Location</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PL.map(r => ({ name: r.short, 'Food Cost %': +(r.foodCost/r.revenue*100).toFixed(1), 'Labor Cost %': +(r.laborCost/r.revenue*100).toFixed(1) }))} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
              <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${v}%`} tick={axisStyle} axisLine={false} tickLine={false} width={36} domain={[0, 50]} />
              <Tooltip formatter={(v: any) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
              <Bar dataKey="Food Cost %" fill="#f59e0b" radius={[4,4,0,0]} />
              <Bar dataKey="Labor Cost %" fill="#8b5cf6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-3">
          <p className="text-[10px] text-slate-500">Target food cost: ≤ 32% · Target labor: ≤ 25% · Combined prime cost target: ≤ 57%</p>
        </div>
      </div>

      {/* Partner distributions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">Partner Distributions — Q1 2026</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-5 py-2 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="col-span-3">Partner</div>
            <div className="col-span-1 text-center">Harbor %</div>
            <div className="col-span-1 text-center">Loft %</div>
            <div className="col-span-1 text-center">O76 %</div>
            <div className="col-span-3 text-right">Q1 Distribution</div>
            <div className="col-span-3 text-right">YTD Total</div>
          </div>
          <div className="divide-y divide-slate-800/50">
            {DISTRIBUTIONS.map(d => (
              <div key={d.partner}>
                <div className="hidden md:grid grid-cols-12 px-5 py-3 items-center">
                  <div className="col-span-3 text-sm font-semibold text-white">{d.partner}</div>
                  <div className="col-span-1 text-center text-xs text-slate-400">{d.harbor > 0 ? `${d.harbor}%` : '—'}</div>
                  <div className="col-span-1 text-center text-xs text-slate-400">{d.loft > 0 ? `${d.loft}%` : '—'}</div>
                  <div className="col-span-1 text-center text-xs text-slate-400">{d.o76 > 0 ? `${d.o76}%` : '—'}</div>
                  <div className="col-span-3 text-right text-sm font-bold text-emerald-400">{d.qtdDist > 0 ? fmt$(d.qtdDist) : <span className="text-slate-600">Pending</span>}</div>
                  <div className="col-span-3 text-right text-sm font-bold text-white">{d.ytdDist > 0 ? fmt$(d.ytdDist) : <span className="text-slate-600">—</span>}</div>
                </div>
                <div className="md:hidden px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{d.partner}</p>
                    <p className="text-xs text-slate-500">
                      {[d.harbor > 0 && `Harbor ${d.harbor}%`, d.loft > 0 && `Loft ${d.loft}%`, d.o76 > 0 && `O76 ${d.o76}%`].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <p className={`text-sm font-bold shrink-0 ${d.qtdDist > 0 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {d.qtdDist > 0 ? fmt$(d.qtdDist) : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-slate-700 bg-slate-800/30 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Q1 Distributions</span>
            <span className="text-sm font-black text-white">{fmt$(DISTRIBUTIONS.reduce((s, d) => s + d.qtdDist, 0))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
