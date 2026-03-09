import { CheckSquare, AlertTriangle, Users, TrendingUp, ChefHat, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const TODOS = [
  { id: 1, category: 'Partner Communication', priority: 'high', item: 'Send Q1 financial summary to all Harbor Kitchen partners (Chen, Ruiz, Park) — March distributions pending approval', due: 'Mar 12', restaurant: 'Harbor Kitchen', done: false },
  { id: 2, category: 'Legal / Compliance', priority: 'urgent', item: 'Submit Omakase 76 health permit final inspection paperwork — deadline Mar 20, need to schedule city inspector', due: 'Mar 13', restaurant: 'Omakase 76', done: false },
  { id: 3, category: 'Menu & Pricing', priority: 'high', item: 'Finalize Omakase 76 opening menu pricing — omakase tiers ($95 / $145 / $195) and hand roll bar pricing need partner sign-off', due: 'Mar 14', restaurant: 'Omakase 76', done: false },
  { id: 4, category: 'Personnel', priority: 'high', item: 'Review line cook applications for Harbor Kitchen — need 1 additional line cook before Memorial Day weekend rush', due: 'Mar 20', restaurant: 'Harbor Kitchen', done: false },
  { id: 5, category: 'Strategy', priority: 'medium', item: 'Decide on private dining room at Harbor Kitchen — Sofia Ruiz has requested a decision before signing contractor quote ($28,000)', due: 'Mar 25', restaurant: 'Harbor Kitchen', done: false },
  { id: 6, category: 'Partner Communication', priority: 'medium', item: 'Schedule partner alignment call with James Okafor re: Omakase 76 marketing budget — pre-opening spend debate ongoing', due: 'Mar 15', restaurant: 'Omakase 76', done: false },
  { id: 7, category: 'Marketing', priority: 'medium', item: 'Approve Rex\'s draft opening campaign for Omakase 76 — Instagram/email sequence + opening week specials ready for review', due: 'Mar 11', restaurant: 'Omakase 76', done: false },
  { id: 8, category: 'Design', priority: 'low', item: 'Review updated menu design mockups from designer — Harbor Kitchen seasonal menu refresh for April', due: 'Apr 1', restaurant: 'Harbor Kitchen', done: false },
  { id: 9, category: 'Operations', priority: 'low', item: 'Evaluate new POS vendor proposal for The Loft — current Toast contract expires June 1', due: 'Apr 15', restaurant: 'The Loft', done: false },
  { id: 10, category: 'Personnel', priority: 'low', item: 'Discuss Priya Sharma compensation review — 6-month Omakase 76 anniversary milestone in April', due: 'Apr 1', restaurant: 'Omakase 76', done: false },
]

const priorityColor = (p: string) => {
  if (p === 'urgent') return 'bg-red-500/10 text-red-400 border-red-500/20'
  if (p === 'high')   return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  if (p === 'medium') return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  return 'bg-slate-700 text-slate-400 border-slate-600'
}

const categoryIcon = (c: string) => {
  if (c.includes('Partner') || c.includes('Communication')) return MessageSquare
  if (c.includes('Legal') || c.includes('Compliance')) return AlertTriangle
  if (c.includes('Menu') || c.includes('Design')) return ChefHat
  if (c.includes('Personnel')) return Users
  if (c.includes('Strategy') || c.includes('Marketing')) return TrendingUp
  return CheckSquare
}

export default function Todos() {
  const [done, setDone] = useState<number[]>([])
  const toggle = (id: number) => setDone(d => d.includes(id) ? d.filter(x => x !== id) : [...d, id])

  const urgent = TODOS.filter(t => t.priority === 'urgent' && !done.includes(t.id))
  const high   = TODOS.filter(t => t.priority === 'high' && !done.includes(t.id))
  const medium = TODOS.filter(t => t.priority === 'medium' && !done.includes(t.id))
  const low    = TODOS.filter(t => t.priority === 'low' && !done.includes(t.id))
  const completed = TODOS.filter(t => done.includes(t.id))

  const Section = ({ title, items, color }: { title: string; items: typeof TODOS; color: string }) => (
    items.length > 0 ? (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className={`w-4 h-4 ${color}`} />
          <p className="text-sm font-bold text-white">{title}</p>
          <span className="text-xs text-slate-500">— {items.length}</span>
        </div>
        <div className="space-y-3">
          {items.map(t => {
            const Icon = categoryIcon(t.category)
            return (
              <div key={t.id} className={`rounded-2xl border p-4 transition-opacity ${t.priority === 'urgent' ? 'bg-red-950/20 border-red-800/30' : t.priority === 'high' ? 'bg-amber-950/10 border-amber-800/20' : 'bg-slate-900/60 border-slate-800'}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => toggle(t.id)} className="mt-0.5 shrink-0">
                    <div className="w-4 h-4 rounded border border-slate-600 bg-slate-800 hover:border-orange-400 transition-colors" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap mb-1">
                      <p className="text-sm text-white">{t.item}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Icon className="w-3 h-3 text-slate-500" />
                      <p className="text-xs text-slate-500">{t.category} · {t.restaurant}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${priorityColor(t.priority)}`}>{t.priority}</span>
                      <p className="text-[10px] text-slate-600">Due {t.due}</p>
                    </div>
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
          <CheckSquare className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-black text-white">To-Dos</h1>
        </div>
        <p className="text-sm text-slate-400">Key decisions, partner updates, personnel, strategy, and menu — all 3 locations</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Urgent', count: urgent.length, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
          { label: 'High Priority', count: high.length, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
          { label: 'Medium', count: medium.length, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { label: 'Completed', count: completed.length, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl border ${s.border} ${s.bg} text-center`}>
            <p className={`text-3xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <Section title="Urgent" items={urgent} color="text-red-400" />
      <Section title="High Priority" items={high} color="text-amber-400" />
      <Section title="Medium Priority" items={medium} color="text-blue-400" />
      <Section title="Low Priority" items={low} color="text-slate-400" />

      {completed.length > 0 && (
        <div>
          <p className="text-sm font-bold text-slate-500 mb-3">✓ Completed</p>
          <div className="space-y-2 opacity-50">
            {completed.map(t => (
              <div key={t.id} className="flex items-start gap-3 bg-slate-900/40 border border-slate-800 rounded-xl p-3">
                <button onClick={() => toggle(t.id)} className="mt-0.5 shrink-0">
                  <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">✓</span>
                  </div>
                </button>
                <p className="text-xs text-slate-500 line-through">{t.item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
