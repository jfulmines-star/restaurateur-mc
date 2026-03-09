import { CalendarClock, AlertTriangle, FileText, Building2 } from 'lucide-react'

const DEADLINES = [
  { id: 1, restaurant: 'Omakase 76',     category: 'Health Permit',         item: 'New location health permit — final inspection clearance',  due: '2026-03-20', daysLeft: 11, status: 'urgent',   owner: 'Marcus Chen' },
  { id: 2, restaurant: 'All Locations',  category: 'State Filing',          item: 'Wisconsin LLC Annual Report — Chen Hospitality Group LLC', due: '2026-03-31', daysLeft: 22, status: 'warn',    owner: 'Marcus Chen' },
  { id: 3, restaurant: 'Harbor Kitchen', category: 'Liquor License',        item: 'City of Milwaukee liquor license renewal',                 due: '2026-04-01', daysLeft: 23, status: 'warn',    owner: 'Sofia Ruiz' },
  { id: 4, restaurant: 'The Loft',       category: 'Food Handler Cert',     item: 'Food handler certification renewal — 3 staff members',     due: '2026-04-15', daysLeft: 37, status: 'upcoming', owner: 'Daniel Park' },
  { id: 5, restaurant: 'Omakase 76',     category: 'Liquor License',        item: 'Initial liquor license application — East Side location',   due: '2026-04-30', daysLeft: 52, status: 'upcoming', owner: 'Marcus Chen' },
  { id: 6, restaurant: 'Harbor Kitchen', category: 'Partnership Agreement', item: 'Operating agreement amendment — Chen/Ruiz/Park review',    due: '2026-05-01', daysLeft: 53, status: 'upcoming', owner: 'All Partners' },
  { id: 7, restaurant: 'All Locations',  category: 'Tax Filing',            item: 'Q1 2026 Wisconsin sales tax remittance',                   due: '2026-04-20', daysLeft: 42, status: 'upcoming', owner: 'Marcus Chen' },
  { id: 8, restaurant: 'The Loft',       category: 'Lease',                 item: 'Mequon Public Market lease renewal option window',         due: '2026-06-01', daysLeft: 84, status: 'ok',      owner: 'Sofia Ruiz' },
  { id: 9, restaurant: 'Harbor Kitchen', category: 'Health Permit',         item: 'Annual health inspection — Walker\'s Point location',      due: '2026-07-15', daysLeft: 128, status: 'ok',     owner: 'Marcus Chen' },
  { id: 10, restaurant: 'Omakase 76',    category: 'Operating Agreement',   item: 'Omakase 76 partner buyout clause review (12-mo trigger)',   due: '2026-01-15', daysLeft: -53, status: 'overdue', owner: 'James Okafor' },
]

const statusBadge = (s: string) => {
  if (s === 'overdue')  return 'bg-red-500/10 text-red-400 border border-red-500/20'
  if (s === 'urgent')   return 'bg-red-500/10 text-red-400 border border-red-500/20'
  if (s === 'warn')     return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  if (s === 'upcoming') return 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
  return 'bg-slate-700 text-slate-400 border border-slate-600'
}

const statusLabel = (s: string, days: number) => {
  if (s === 'overdue')  return `${Math.abs(days)}d overdue`
  if (s === 'urgent')   return `${days}d left`
  if (s === 'warn')     return `${days}d left`
  if (s === 'upcoming') return `${days}d`
  return `${days}d`
}

const categoryIcon = (c: string) => {
  if (c.includes('Liquor') || c.includes('Health') || c.includes('Food')) return FileText
  if (c.includes('Lease') || c.includes('Partnership') || c.includes('Agreement')) return Building2
  return CalendarClock
}

export default function Deadlines() {
  const overdue  = DEADLINES.filter(d => d.status === 'overdue')
  const urgent   = DEADLINES.filter(d => d.status === 'urgent')
  const warn     = DEADLINES.filter(d => d.status === 'warn')
  const upcoming = DEADLINES.filter(d => d.status === 'upcoming')
  const ok       = DEADLINES.filter(d => d.status === 'ok')

  const Section = ({ title, items, color }: { title: string; items: typeof DEADLINES; color: string }) => (
    items.length > 0 ? (
      <div>
        <div className={`flex items-center gap-2 mb-3`}>
          <AlertTriangle className={`w-4 h-4 ${color}`} />
          <p className="text-sm font-bold text-white">{title}</p>
          <span className="text-xs text-slate-500">— {items.length} item{items.length > 1 ? 's' : ''}</span>
        </div>
        <div className="space-y-3">
          {items.map(d => {
            const Icon = categoryIcon(d.category)
            return (
              <div key={d.id} className={`rounded-2xl border p-4 ${d.status === 'overdue' || d.status === 'urgent' ? 'bg-red-950/20 border-red-800/30' : d.status === 'warn' ? 'bg-amber-950/10 border-amber-800/20' : 'bg-slate-900/60 border-slate-800'}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <Icon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-white">{d.item}</p>
                        <p className="text-xs text-slate-500">{d.restaurant} · {d.category} · Owner: {d.owner}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <p className="text-xs text-slate-400">{d.due}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusBadge(d.status)}`}>
                      {statusLabel(d.status, d.daysLeft)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    ) : null
  )

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CalendarClock className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-black text-white">Deadlines & Filings</h1>
        </div>
        <p className="text-sm text-slate-400">Licenses, permits, tax filings, leases, and legal obligations — all 3 locations</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Overdue', count: overdue.length + urgent.length, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
          { label: 'Due < 30 Days', count: warn.length, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { label: 'Upcoming', count: upcoming.length, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { label: 'On Track', count: ok.length, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl border ${s.border} ${s.bg} text-center`}>
            <p className={`text-3xl font-black tabular-nums ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <Section title="Overdue" items={[...overdue, ...urgent]} color="text-red-400" />
      <Section title="Due in < 30 Days" items={warn} color="text-amber-400" />
      <Section title="Upcoming (30–90 days)" items={upcoming} color="text-blue-400" />
      <Section title="On Track" items={ok} color="text-emerald-400" />
    </div>
  )
}
