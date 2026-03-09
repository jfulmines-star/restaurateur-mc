import { Clock, Users, DollarSign } from 'lucide-react'

const SHIFTS = [
  { id: 1, name: 'Kenji Tanaka',   role: 'Line Cook',       restaurant: 'Harbor Kitchen', date: 'Mar 9', in: '4:00 PM', out: '11:30 PM', hrs: 7.5,  rate: 22, status: 'active' },
  { id: 2, name: 'Maria Santos',   role: 'Server',          restaurant: 'Harbor Kitchen', date: 'Mar 9', in: '4:30 PM', out: '—',        hrs: 3.0,  rate: 15, status: 'active' },
  { id: 3, name: 'Tyler Brooks',   role: 'Bartender',       restaurant: 'Harbor Kitchen', date: 'Mar 9', in: '5:00 PM', out: '—',        hrs: 2.5,  rate: 20, status: 'active' },
  { id: 4, name: 'Amy Nguyen',     role: 'Host',            restaurant: 'The Loft',       date: 'Mar 9', in: '11:00 AM', out: '8:00 PM', hrs: 9.0,  rate: 16, status: 'complete' },
  { id: 5, name: 'Carlos Vega',    role: 'Sushi Chef',      restaurant: 'The Loft',       date: 'Mar 9', in: '10:30 AM', out: '7:30 PM', hrs: 9.0,  rate: 28, status: 'complete' },
  { id: 6, name: 'Priya Sharma',   role: 'Sous Chef',       restaurant: 'Omakase 76',     date: 'Mar 9', in: '3:00 PM', out: '—',        hrs: 4.5,  rate: 26, status: 'active' },
  { id: 7, name: 'Marcus Chen',    role: 'Owner/Manager',   restaurant: 'Omakase 76',     date: 'Mar 9', in: '2:00 PM', out: '—',        hrs: 5.5,  rate: 0,  status: 'active' },
  { id: 8, name: 'Jake Williams',  role: 'Prep Cook',       restaurant: 'Harbor Kitchen', date: 'Mar 8', in: '2:00 PM', out: '10:00 PM', hrs: 8.0,  rate: 19, status: 'complete' },
  { id: 9, name: 'Lena Park',      role: 'Server',          restaurant: 'Harbor Kitchen', date: 'Mar 8', in: '4:00 PM', out: '11:00 PM', hrs: 7.0,  rate: 15, status: 'complete' },
  { id: 10, name: 'Tom Nguyen',    role: 'Dishwasher',      restaurant: 'The Loft',       date: 'Mar 8', in: '11:00 AM', out: '7:00 PM', hrs: 8.0,  rate: 16, status: 'complete' },
]

const WEEK_SUMMARY = [
  { restaurant: 'Harbor Kitchen', totalHrs: 142, laborCost: 3180, revenue: 43100, laborPct: 7.4 },
  { restaurant: 'The Loft',       totalHrs: 88,  laborCost: 1920, revenue: 17600, laborPct: 10.9 },
  { restaurant: 'Omakase 76',     totalHrs: 62,  laborCost: 1540, revenue: 13180, laborPct: 11.7 },
]

export default function Timekeeper() {
  const activeShifts = SHIFTS.filter(s => s.status === 'active')
  const totalActive = activeShifts.length
  const totalLaborToday = SHIFTS.filter(s => s.date === 'Mar 9').reduce((s, e) => s + e.hrs * e.rate, 0)

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-black text-white">Timekeeper</h1>
        </div>
        <p className="text-sm text-slate-400">Staff hours, labor cost tracking, and weekly summaries — all 3 locations</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
          <Users className="w-4 h-4 text-emerald-400 mb-2" />
          <p className="text-2xl font-black text-emerald-400">{totalActive}</p>
          <p className="text-xs text-slate-400 mt-1">Staff Currently Clocked In</p>
        </div>
        <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/10">
          <DollarSign className="w-4 h-4 text-blue-400 mb-2" />
          <p className="text-2xl font-black text-blue-400">${totalLaborToday.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-1">Labor Cost Today (projected)</p>
        </div>
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 col-span-2 md:col-span-1">
          <Clock className="w-4 h-4 text-amber-400 mb-2" />
          <p className="text-2xl font-black text-amber-400">292</p>
          <p className="text-xs text-slate-400 mt-1">Total Hours This Week</p>
        </div>
      </div>

      {/* Weekly labor summary */}
      <div>
        <p className="text-sm font-bold text-white mb-3">Weekly Labor Summary — By Location</p>
        <div className="space-y-3">
          {WEEK_SUMMARY.map(s => (
            <div key={s.restaurant} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{s.restaurant}</p>
                  <p className="text-xs text-slate-500">{s.totalHrs} total hours · ${s.laborCost.toLocaleString()} labor cost</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{s.laborPct}%</p>
                  <p className="text-xs text-slate-500">of revenue</p>
                </div>
                <div className="w-full sm:w-32">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.laborPct > 11 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(s.laborPct * 4, 100)}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-600 mt-0.5">Target: ≤ 12%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's shifts */}
      <div>
        <p className="text-sm font-bold text-white mb-3">Today's Shifts — March 9</p>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-5 py-2 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="col-span-3">Staff</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-1">In</div>
            <div className="col-span-1">Out</div>
            <div className="col-span-1 text-right">Hrs</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          <div className="divide-y divide-slate-800/50">
            {SHIFTS.filter(s => s.date === 'Mar 9').map(s => (
              <div key={s.id}>
                <div className="hidden md:grid grid-cols-12 px-5 py-3 items-center">
                  <div className="col-span-3 text-sm font-semibold text-white">{s.name}</div>
                  <div className="col-span-2 text-xs text-slate-400">{s.role}</div>
                  <div className="col-span-2 text-xs text-slate-400">{s.restaurant}</div>
                  <div className="col-span-1 text-xs text-slate-400">{s.in}</div>
                  <div className="col-span-1 text-xs text-slate-400">{s.out}</div>
                  <div className="col-span-1 text-right text-xs font-bold text-white">{s.hrs}h</div>
                  <div className="col-span-2 text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${s.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-700 text-slate-400 border border-slate-600'}`}>
                      {s.status === 'active' ? '● Active' : 'Complete'}
                    </span>
                  </div>
                </div>
                <div className="md:hidden px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.role} · {s.restaurant}</p>
                    <p className="text-xs text-slate-500">{s.in} → {s.out}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">{s.hrs}h</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${s.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                      {s.status === 'active' ? '● Live' : 'Done'}
                    </span>
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
