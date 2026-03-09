import { DollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react'

const PAYROLL = [
  { name: 'Kenji Tanaka',   role: 'Line Cook',     restaurant: 'Harbor Kitchen', hrs: 42, rate: 22, gross: 924,  type: 'hourly' },
  { name: 'Maria Santos',   role: 'Server',        restaurant: 'Harbor Kitchen', hrs: 38, rate: 15, gross: 570,  type: 'hourly', tips: 420 },
  { name: 'Tyler Brooks',   role: 'Bartender',     restaurant: 'Harbor Kitchen', hrs: 40, rate: 20, gross: 800,  type: 'hourly', tips: 680 },
  { name: 'Jake Williams',  role: 'Prep Cook',     restaurant: 'Harbor Kitchen', hrs: 44, rate: 19, gross: 882,  type: 'hourly', ot: true },
  { name: 'Lena Park',      role: 'Server',        restaurant: 'Harbor Kitchen', hrs: 36, rate: 15, gross: 540,  type: 'hourly', tips: 390 },
  { name: 'Amy Nguyen',     role: 'Host',          restaurant: 'The Loft',       hrs: 40, rate: 16, gross: 640,  type: 'hourly' },
  { name: 'Carlos Vega',    role: 'Sushi Chef',    restaurant: 'The Loft',       hrs: 42, rate: 28, gross: 1176, type: 'hourly' },
  { name: 'Tom Nguyen',     role: 'Dishwasher',    restaurant: 'The Loft',       hrs: 38, rate: 16, gross: 608,  type: 'hourly' },
  { name: 'Priya Sharma',   role: 'Sous Chef',     restaurant: 'Omakase 76',     hrs: 45, rate: 26, gross: 1170, type: 'hourly', ot: true },
  { name: 'Leo Martinez',   role: 'Line Cook',     restaurant: 'Omakase 76',     hrs: 40, rate: 21, gross: 840,  type: 'hourly' },
  { name: 'Rachel Kim',     role: 'Server',        restaurant: 'Omakase 76',     hrs: 32, rate: 16, gross: 512,  type: 'hourly', tips: 310 },
]

const SUMMARY = [
  { restaurant: 'Harbor Kitchen', staff: 5, gross: 3716, tips: 1490, total: 5206 },
  { restaurant: 'The Loft',       staff: 3, gross: 2424, tips: 0,    total: 2424 },
  { restaurant: 'Omakase 76',     staff: 3, gross: 2522, tips: 310,  total: 2832 },
]

export default function Payroll() {
  const totalGross = SUMMARY.reduce((s, r) => s + r.gross, 0)
  const totalTips  = SUMMARY.reduce((s, r) => s + r.tips, 0)
  const otStaff    = PAYROLL.filter(p => p.ot)

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-black text-white">Payroll</h1>
        </div>
        <p className="text-sm text-slate-400">Weekly payroll summary — all 3 locations · Week ending Mar 9, 2026</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Gross Wages', value: `$${totalGross.toLocaleString()}`, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: DollarSign },
          { label: 'Total Tips (pooled)', value: `$${totalTips.toLocaleString()}`, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: TrendingUp },
          { label: 'Total Staff', value: String(PAYROLL.length), color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Users },
          { label: 'Overtime Alerts', value: String(otStaff.length), color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: AlertTriangle },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl border ${s.border} ${s.bg}`}>
            <s.icon className={`w-4 h-4 ${s.color} mb-2`} />
            <p className={`text-2xl font-black tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* OT Alert */}
      {otStaff.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-800/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <p className="text-sm font-bold text-white">Overtime Alert — {otStaff.length} staff member{otStaff.length > 1 ? 's' : ''} over 40 hours</p>
          </div>
          {otStaff.map(s => (
            <p key={s.name} className="text-xs text-amber-200/90 ml-6">
              {s.name} ({s.restaurant}) — {s.hrs} hrs @ ${s.rate}/hr. OT premium applies to {s.hrs - 40} hours.
            </p>
          ))}
        </div>
      )}

      {/* Summary by location */}
      <div>
        <p className="text-sm font-bold text-white mb-3">Payroll Summary — By Location</p>
        <div className="space-y-3">
          {SUMMARY.map(s => (
            <div key={s.restaurant} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{s.restaurant}</p>
                  <p className="text-xs text-slate-500">{s.staff} staff · ${s.gross.toLocaleString()} wages + ${s.tips.toLocaleString()} tips</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-white">${s.total.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">total payroll</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail table */}
      <div>
        <p className="text-sm font-bold text-white mb-3">Staff Detail</p>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-5 py-2 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-1 text-right">Hrs</div>
            <div className="col-span-1 text-right">Rate</div>
            <div className="col-span-1 text-right">Gross</div>
            <div className="col-span-1 text-right">Tips</div>
            <div className="col-span-1 text-right">OT</div>
          </div>
          <div className="divide-y divide-slate-800/50">
            {PAYROLL.map(p => (
              <div key={p.name}>
                <div className="hidden md:grid grid-cols-12 px-5 py-3 items-center">
                  <div className="col-span-3 text-sm font-semibold text-white">{p.name}</div>
                  <div className="col-span-2 text-xs text-slate-400">{p.role}</div>
                  <div className="col-span-2 text-xs text-slate-400">{p.restaurant}</div>
                  <div className="col-span-1 text-right text-xs text-slate-300">{p.hrs}</div>
                  <div className="col-span-1 text-right text-xs text-slate-300">${p.rate}</div>
                  <div className="col-span-1 text-right text-sm font-bold text-white">${p.gross.toLocaleString()}</div>
                  <div className="col-span-1 text-right text-xs text-emerald-400">{p.tips ? `$${p.tips}` : '—'}</div>
                  <div className="col-span-1 text-right">
                    {p.ot && <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-500/10 text-amber-400">OT</span>}
                  </div>
                </div>
                <div className="md:hidden px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.role} · {p.restaurant} · {p.hrs}h @ ${p.rate}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">${p.gross.toLocaleString()}</p>
                    {p.ot && <span className="text-[10px] px-1.5 rounded bg-amber-500/10 text-amber-400 font-bold">OT</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
