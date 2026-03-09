import { ChefHat, Star, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const fmt$ = (n: number) => '$' + n.toFixed(2)
const fmtPct = (n: number) => n.toFixed(1) + '%'

// Menu engineering matrix: contribution margin (y) vs popularity/volume (x)
// Quadrants: STAR (high margin, high volume), PUZZLE (high margin, low volume),
//            PLOWHORSE (low margin, high volume), DOG (low margin, low volume)

const MENU_ITEMS = [
  // Harbor Kitchen
  { id: 1, restaurant: 'Harbor', name: 'Omakase Tasting (7-course)', price: 95, cost: 28, sold: 42, category: 'Tasting Menu' },
  { id: 2, restaurant: 'Harbor', name: 'Wagyu Beef Roll',            price: 28, cost: 9.80, sold: 88, category: 'Roll' },
  { id: 3, restaurant: 'Harbor', name: 'Bluefin Toro Nigiri (2pc)',  price: 22, cost: 8.40, sold: 64, category: 'Nigiri' },
  { id: 4, restaurant: 'Harbor', name: 'Miso Ramen',                 price: 18, cost: 4.20, sold: 96, category: 'Noodle' },
  { id: 5, restaurant: 'Harbor', name: 'Edamame',                    price: 6,  cost: 1.10, sold: 140, category: 'App' },
  { id: 6, restaurant: 'Harbor', name: 'Uni Hand Roll',              price: 24, cost: 10.20, sold: 31, category: 'Roll' },
  { id: 7, restaurant: 'Harbor', name: 'Chicken Karaage',            price: 14, cost: 3.80, sold: 78, category: 'App' },
  { id: 8, restaurant: 'Harbor', name: 'Lobster Bisque',             price: 16, cost: 7.40, sold: 22, category: 'Soup' },
  { id: 9, restaurant: 'Harbor', name: 'Dragon Roll',                price: 20, cost: 6.20, sold: 72, category: 'Roll' },
  { id: 10, restaurant: 'Harbor', name: 'Gyoza (6pc)',               price: 12, cost: 3.20, sold: 88, category: 'App' },
  // The Loft
  { id: 11, restaurant: 'Loft', name: 'Spicy Tuna Hand Roll',        price: 12, cost: 3.60, sold: 180, category: 'Hand Roll' },
  { id: 12, restaurant: 'Loft', name: 'Tonkotsu Ramen',              price: 16, cost: 4.80, sold: 130, category: 'Noodle' },
  { id: 13, restaurant: 'Loft', name: 'Salmon Avocado Roll',         price: 14, cost: 4.20, sold: 110, category: 'Roll' },
  { id: 14, restaurant: 'Loft', name: 'Bao Bun (2pc)',               price: 10, cost: 3.10, sold: 95, category: 'App' },
  { id: 15, restaurant: 'Loft', name: 'Miso Soup',                   price: 4,  cost: 0.60, sold: 200, category: 'Soup' },
  { id: 16, restaurant: 'Loft', name: 'Wagyu Smash Burger',          price: 18, cost: 7.20, sold: 42, category: 'Entree' },
  // Omakase 76
  { id: 17, restaurant: 'O76', name: 'Omakase Series ($145)',        price: 145, cost: 48.00, sold: 28, category: 'Tasting Menu' },
  { id: 18, restaurant: 'O76', name: 'King Salmon Hand Roll',        price: 14, cost: 4.90, sold: 62, category: 'Hand Roll' },
  { id: 19, restaurant: 'O76', name: 'Bluefin Fatty Tuna Roll',      price: 26, cost: 9.60, sold: 44, category: 'Roll' },
  { id: 20, restaurant: 'O76', name: 'Ikura Temaki',                 price: 18, cost: 5.40, sold: 38, category: 'Hand Roll' },
]

type Quadrant = 'star' | 'puzzle' | 'plowhorse' | 'dog'

const classify = (item: typeof MENU_ITEMS[0], avgCM: number, avgVol: number): Quadrant => {
  const cm = item.price - item.cost
  if (cm >= avgCM && item.sold >= avgVol) return 'star'
  if (cm >= avgCM && item.sold < avgVol)  return 'puzzle'
  if (cm < avgCM  && item.sold >= avgVol) return 'plowhorse'
  return 'dog'
}

const QUADRANT_META = {
  star:      { label: 'Star',       color: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', desc: 'High margin + high volume. Protect these. Feature prominently. Never discount.' },
  puzzle:    { label: 'Puzzle',     color: '#3b82f6', bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    text: 'text-blue-400',    desc: 'High margin but low volume. Promote more aggressively. Add to specials. Consider repositioning.' },
  plowhorse: { label: 'Plowhorse',  color: '#f59e0b', bg: 'bg-amber-500/10',   border: 'border-amber-500/20',  text: 'text-amber-400',   desc: 'Popular but low margin. Find ways to reduce cost or increase price subtly without losing volume.' },
  dog:       { label: 'Dog',        color: '#ef4444', bg: 'bg-red-500/10',      border: 'border-red-500/20',    text: 'text-red-400',     desc: 'Low margin + low volume. Review for removal or reimagining. Don\'t waste prep time here.' },
}

const DOT_COLOR: Record<Quadrant, string> = { star: '#10b981', puzzle: '#3b82f6', plowhorse: '#f59e0b', dog: '#ef4444' }


export default function MenuEngineering() {
  const avgCM  = MENU_ITEMS.reduce((s, i) => s + (i.price - i.cost), 0) / MENU_ITEMS.length
  const avgVol = MENU_ITEMS.reduce((s, i) => s + i.sold, 0) / MENU_ITEMS.length

  const withClass = MENU_ITEMS.map(i => ({ ...i, cm: i.price - i.cost, cmPct: (i.price - i.cost) / i.price * 100, quadrant: classify(i, avgCM, avgVol) }))

  const stars      = withClass.filter(i => i.quadrant === 'star')
  const puzzles    = withClass.filter(i => i.quadrant === 'puzzle')
  const plowhorses = withClass.filter(i => i.quadrant === 'plowhorse')
  const dogs       = withClass.filter(i => i.quadrant === 'dog')

  const scatterData = withClass.map(i => ({ x: i.sold, y: +i.cm.toFixed(2), name: i.name, restaurant: i.restaurant, quadrant: i.quadrant, price: i.price, cost: i.cost, cmPct: i.cmPct }))

  const ScatterTip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null
    const d = payload[0].payload
    const q = QUADRANT_META[d.quadrant as Quadrant]
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs shadow-xl max-w-[200px]">
        <p className="font-bold text-white mb-1">{d.name}</p>
        <p className="text-slate-400">{d.restaurant}</p>
        <p className="text-slate-300">Price: {fmt$(d.price)} · Cost: {fmt$(d.cost)}</p>
        <p className="text-slate-300">CM: {fmt$(d.y)} ({d.cmPct.toFixed(0)}%)</p>
        <p className="text-slate-300">Vol: {d.x} covers</p>
        <p className={`font-bold mt-1 ${q.text}`}>{q.label}</p>
      </div>
    )
  }

  const ItemRow = ({ item }: { item: typeof withClass[0] }) => {
    const q = QUADRANT_META[item.quadrant]
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-2 border-b border-slate-800/50 last:border-0">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{item.name}</p>
          <p className="text-xs text-slate-500">{item.restaurant} · {item.category} · Price: {fmt$(item.price)} · Food cost: {fmt$(item.cost)}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-sm font-bold text-white">{fmt$(item.cm)}</p>
            <p className="text-[10px] text-slate-500">{fmtPct(item.cmPct)} CM</p>
          </div>
          <div className="text-right w-14">
            <p className="text-sm font-bold text-slate-300">{item.sold}</p>
            <p className="text-[10px] text-slate-500">covers</p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${q.bg} ${q.text} ${q.border} w-20 text-center`}>{q.label}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-6xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-black text-white">Menu Engineering</h1>
        </div>
        <p className="text-sm text-slate-400">Margin × volume analysis — identify what to protect, promote, reprice, and cut</p>
      </div>

      {/* Quadrant legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.entries(QUADRANT_META) as [Quadrant, typeof QUADRANT_META[Quadrant]][]).map(([key, q]) => {
          const count = withClass.filter(i => i.quadrant === key).length
          const Icon = key === 'star' ? Star : key === 'puzzle' ? TrendingUp : key === 'plowhorse' ? Minus : TrendingDown
          return (
            <div key={key} className={`p-4 rounded-2xl border ${q.border} ${q.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${q.text}`} />
                <p className={`text-sm font-black ${q.text}`}>{q.label}</p>
                <span className={`text-xs font-bold ml-auto ${q.text}`}>{count}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{q.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Scatter chart */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Menu Engineering Matrix</p>
        <p className="text-[10px] text-slate-600 mb-4">X = weekly covers · Y = contribution margin per item</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" dataKey="x" name="Covers" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Weekly Covers', position: 'insideBottom', offset: -2, fill: '#475569', fontSize: 10 }} />
              <YAxis type="number" dataKey="y" name="CM ($)" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} width={36} />
              <Tooltip content={<ScatterTip />} />
              <Scatter data={scatterData} fill="#8b5cf6">
                {scatterData.map((d, i) => (
                  <Cell key={i} fill={DOT_COLOR[d.quadrant as Quadrant]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Item tables by quadrant */}
      {([['star', stars], ['puzzle', puzzles], ['plowhorse', plowhorses], ['dog', dogs]] as [Quadrant, typeof withClass][]).map(([q, items]) => {
        const meta = QUADRANT_META[q]
        return (
          <div key={q}>
            <div className="flex items-center gap-2 mb-3">
              <p className={`text-sm font-black ${meta.text}`}>{meta.label}s ({items.length})</p>
            </div>
            <div className={`rounded-2xl border ${meta.border} p-4`}>
              {items.map(item => <ItemRow key={item.id} item={item} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
