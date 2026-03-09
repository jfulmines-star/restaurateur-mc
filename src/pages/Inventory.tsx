import { Package, AlertTriangle, Lightbulb, TrendingDown, Megaphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const INVENTORY = [
  // EXPIRING SOON
  { id: 1, restaurant: 'Harbor Kitchen', item: 'Bluefin tuna',          qty: '4.2 lbs',  expires: 'Tonight',  daysLeft: 0,  cost: 180,  suggestion: 'Run a chef\'s omakase special tonight or use for staff meal — do not let this go to waste', category: 'Fish', urgent: true },
  { id: 2, restaurant: 'Omakase 76',     item: 'King salmon',           qty: '2.8 lbs',  expires: 'Mar 10',   daysLeft: 1,  cost: 95,   suggestion: 'Add as a weekend hand roll special — "King Salmon Oshi" at a $4 premium per roll', category: 'Fish', urgent: true },
  { id: 3, restaurant: 'Harbor Kitchen', item: 'Yuzu kosho (open jar)',  qty: '6 oz',     expires: 'Mar 11',   daysLeft: 2,  cost: 12,   suggestion: 'Feature as sauce/finish on a nightly special — use across service or discard', category: 'Condiment', urgent: true },
  { id: 4, restaurant: 'The Loft',       item: 'Miso paste (white)',    qty: '3 jars',   expires: 'Mar 11',   daysLeft: 2,  cost: 28,   suggestion: 'Build a miso ramen special for this week — feature it as a limited offering to drive traffic', category: 'Pantry', urgent: false },
  { id: 5, restaurant: 'Harbor Kitchen', item: 'Dungeness crab',        qty: '3 whole',  expires: 'Mar 12',   daysLeft: 3,  cost: 140,  suggestion: 'Create a crab hand roll or izakaya plate as a specials board item for Tue–Wed', category: 'Shellfish', urgent: false },
  { id: 6, restaurant: 'The Loft',       item: 'Tamagoyaki (prepped)',  qty: '18 pcs',   expires: 'Mar 13',   daysLeft: 4,  cost: 22,   suggestion: 'Push as an add-on at the counter — "Add tamagoyaki $2" — easy upsell and clears inventory', category: 'Prep', urgent: false },
  // ADEQUATE
  { id: 7, restaurant: 'Harbor Kitchen', item: 'Sake (cooking)',        qty: '4 bottles', expires: 'Jun 2026', daysLeft: 84, cost: 60,   suggestion: null, category: 'Beverage', urgent: false },
  { id: 8, restaurant: 'All Locations',  item: 'Soy sauce (Kikkoman)', qty: '12 gallons',expires: 'Sep 2026', daysLeft: 180,cost: 210,  suggestion: null, category: 'Pantry', urgent: false },
  { id: 9, restaurant: 'Omakase 76',     item: 'Nori sheets',          qty: '800 sheets',expires: 'Aug 2026', daysLeft: 144,cost: 85,   suggestion: null, category: 'Pantry', urgent: false },
]

export default function Inventory() {
  const navigate = useNavigate()
  const askRex = (item: typeof INVENTORY[0]) => {
    const msg = `I have ${item.qty} of ${item.item} expiring ${item.expires === 'Tonight' ? 'tonight' : `on ${item.expires}`} at ${item.restaurant}. The cost at risk is $${item.cost}. Please draft a social media post (Instagram caption + story idea) to run a special around this item tonight, and suggest a price point and special name.`
    navigate('/chat', { state: { agent: 'rex', prefill: msg } })
  }
  const expiring = INVENTORY.filter(i => i.daysLeft <= 4)
  const adequate = INVENTORY.filter(i => i.daysLeft > 4)
  const urgentCost = expiring.reduce((s, i) => s + i.cost, 0)

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Package className="w-5 h-5 text-orange-400" />
          <h1 className="text-2xl font-black text-white">Inventory</h1>
        </div>
        <p className="text-sm text-slate-400">Expiring items, creative solutions, and stock status — all 3 locations</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/10">
          <AlertTriangle className="w-4 h-4 text-red-400 mb-2" />
          <p className="text-2xl font-black text-red-400">{expiring.filter(i => i.urgent).length}</p>
          <p className="text-xs text-slate-400 mt-1">Expiring Tonight / Tomorrow</p>
        </div>
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/10">
          <TrendingDown className="w-4 h-4 text-amber-400 mb-2" />
          <p className="text-2xl font-black text-amber-400">{expiring.length}</p>
          <p className="text-xs text-slate-400 mt-1">Expiring Within 4 Days</p>
        </div>
        <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/10 col-span-2 md:col-span-1">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">At-Risk Value</p>
          <p className="text-2xl font-black text-red-400">${urgentCost}</p>
          <p className="text-xs text-slate-400 mt-1">Cost of expiring inventory</p>
        </div>
      </div>

      {/* Expiring items */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <p className="text-sm font-bold text-white">Action Required — Expiring Soon</p>
        </div>
        <div className="space-y-3">
          {expiring.sort((a, b) => a.daysLeft - b.daysLeft).map(item => (
            <div key={item.id} className={`rounded-2xl border p-4 ${item.urgent ? 'bg-red-950/20 border-red-800/30' : 'bg-amber-950/10 border-amber-800/20'}`}>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm font-bold text-white">{item.item}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${item.urgent ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {item.expires}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{item.restaurant} · {item.qty} · Cost at risk: ${item.cost}</p>
                  {item.suggestion && (
                    <div className="flex items-start gap-2 mb-3">
                      <div className="w-4 h-4 rounded border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Lightbulb className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <p className="text-xs text-emerald-200/90"><strong>Suggested action:</strong> {item.suggestion}</p>
                    </div>
                  )}
                  <button
                    onClick={() => askRex(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600/15 border border-pink-500/30 text-pink-300 text-xs font-semibold hover:bg-pink-600/25 hover:border-pink-400/50 hover:text-pink-200 transition-all"
                  >
                    <Megaphone className="w-3 h-3" />
                    Ask Rex to draft socials
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adequate stock */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-slate-400" />
          <p className="text-sm font-bold text-white">Adequate Stock</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-5 py-2 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="col-span-3">Location</div>
            <div className="col-span-3">Item</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Expires</div>
          </div>
          <div className="divide-y divide-slate-800/50">
            {adequate.map(item => (
              <div key={item.id}>
                <div className="hidden md:grid grid-cols-12 px-5 py-3 items-center">
                  <div className="col-span-3 text-xs text-slate-400">{item.restaurant}</div>
                  <div className="col-span-3 text-sm font-semibold text-white">{item.item}</div>
                  <div className="col-span-2 text-xs text-slate-400">{item.qty}</div>
                  <div className="col-span-2 text-xs text-slate-400">{item.category}</div>
                  <div className="col-span-2 text-right text-xs text-emerald-400">{item.expires}</div>
                </div>
                <div className="md:hidden px-4 py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.item}</p>
                    <p className="text-xs text-slate-500">{item.restaurant} · {item.qty}</p>
                  </div>
                  <p className="text-xs text-emerald-400 shrink-0">{item.expires}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
