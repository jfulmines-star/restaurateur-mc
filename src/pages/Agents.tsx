import { Scale, Megaphone, CheckCircle, Zap, Bot, Cpu, BarChart2, Plus } from 'lucide-react'

const LEX_CAPABILITIES = [
  { title: 'Liquor License Research & Renewals', desc: 'State and local liquor license requirements, renewal timelines, application preparation, and compliance monitoring for every location.' },
  { title: 'Health Code & Food Safety Compliance', desc: 'FDA Food Safety Modernization Act, state health department rules, HACCP compliance, inspection prep, and violation response.' },
  { title: 'Partnership Agreement Analysis', desc: 'Review and explain operating agreements, ownership splits, profit distribution clauses, buyout provisions, and partner dispute resolution.' },
  { title: 'Commercial Lease Review', desc: 'Analyze lease terms, CAM charges, renewal options, exclusivity clauses, subletting rights, and termination provisions for all three locations.' },
  { title: 'Employment Law & Tip Pooling', desc: 'Wisconsin wage and hour law, tip pooling rules, FLSA compliance, overtime classification, wrongful termination risk, and manager status determinations.' },
  { title: 'Tax & Entity Compliance', desc: 'Wisconsin sales tax remittance, quarterly estimated payments, LLC annual filings, K-1 preparation guidance, and multi-entity structure questions.' },
  { title: 'Vendor & Supplier Contracts', desc: 'Review supplier agreements, exclusivity clauses, delivery terms, force majeure provisions, and indemnification language.' },
  { title: 'New Location Legal Checklist', desc: 'Every permit, license, and filing required to open a new restaurant in Wisconsin — in sequence, with deadlines and responsible party.' },
]

const REX_CAPABILITIES = [
  { title: 'Opening Campaign Creation', desc: 'Design and write full launch campaigns for new locations — pre-opening buzz, soft open coordination, grand opening events, and post-launch momentum.' },
  { title: 'Weekly Specials & Promotions', desc: 'Generate creative specials based on expiring inventory, slow nights, seasonal ingredients, or upcoming holidays — with pricing, naming, and social copy.' },
  { title: 'Customer Outreach & Retention', desc: 'Draft personalized messages for regulars, loyalty program outreach, reservation follow-ups, and win-back campaigns for lapsed guests.' },
  { title: 'Social Media Content', desc: 'Instagram captions, story ideas, menu photography concepts, event announcements, and chef spotlight content — tailored to each location\'s brand voice.' },
  { title: 'Discount & Deal Strategy', desc: 'Design strategic discount programs that drive traffic on slow nights without eroding margin — happy hour structures, prix fixe offers, and group deals.' },
  { title: 'Event & Private Dining Promotion', desc: 'Promote private dining availability, craft event packages, and pitch corporate dining and special occasion bookings.' },
  { title: 'Review Response & Reputation Management', desc: 'Draft professional responses to Google and Yelp reviews — positive amplification and graceful recovery from negative feedback.' },
  { title: 'Partner & Investor Updates', desc: 'Help draft clear, professional communication to partners and investors — monthly summaries, performance narratives, and distribution notices.' },
]

export default function Agents() {
  return (
    <div className="p-4 md:p-6 space-y-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Your Agents</h1>
        <p className="text-sm text-slate-400">Two AI agents purpose-built for restaurant operators — available now in the Chat tab.</p>
      </div>

      {/* Lex */}
      <div className="rounded-2xl border border-amber-600/40 bg-amber-950/10 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-600/40 flex items-center justify-center shrink-0">
            <Scale className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-black text-white">Lex</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5" /> Active
              </span>
            </div>
            <p className="text-sm text-slate-300 font-semibold">Virtual General Counsel for Restaurant Operators</p>
            <p className="text-sm text-slate-400 mt-1">
              Lex is a Big Law attorney who went in-house — now working exclusively for you. Every legal, regulatory, and compliance question you'd normally spend $500/hour on, answered in 30 seconds. Lex knows Wisconsin law, restaurant licensing, partnership agreements, and employment law cold.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LEX_CAPABILITIES.map(c => (
            <div key={c.title} className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white mb-0.5">{c.title}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-amber-950/20 border border-amber-800/30 rounded-xl">
          <p className="text-xs text-amber-200/80 italic">Included in your plan · Available 24/7 in the Chat tab · Not a licensed attorney — always consult qualified counsel for final legal decisions.</p>
        </div>
      </div>

      {/* Rex */}
      <div className="rounded-2xl border border-pink-600/40 bg-pink-950/10 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-pink-600/20 border border-pink-600/40 flex items-center justify-center shrink-0">
            <Megaphone className="w-6 h-6 text-pink-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-black text-white">Rex</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5" /> Active
              </span>
            </div>
            <p className="text-sm text-slate-300 font-semibold">Marketing & Revenue Agent for Restaurant Groups</p>
            <p className="text-sm text-slate-400 mt-1">
              Rex is a seasoned restaurant marketer who lives in your operations. He knows your three locations, your inventory, your slow nights, and your regulars. He creates campaigns, writes specials, drafts customer outreach, and manages promotions — without needing a briefing every time.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {REX_CAPABILITIES.map(c => (
            <div key={c.title} className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Zap className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white mb-0.5">{c.title}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-pink-950/20 border border-pink-800/30 rounded-xl">
          <p className="text-xs text-pink-200/80 italic">Included in your plan · Rex works best when you tell him what's in the inventory and what nights need a boost.</p>
        </div>
      </div>
      {/* Inactive agents */}
      <div>
        <p className="text-sm font-bold text-white mb-4">Additional Agents — Available to Add</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Kit',
              icon: Bot,
              color: 'text-slate-400',
              bg: 'bg-slate-700/20',
              border: 'border-slate-600/30',
              tagline: 'Operations & Ops Intelligence',
              desc: 'General operations assistant. Vendor communication drafts, staff memos, partner update emails, and day-to-day ops support across all three locations.',
            },
            {
              name: 'Nova',
              icon: BarChart2,
              color: 'text-violet-400',
              bg: 'bg-violet-700/10',
              border: 'border-violet-600/20',
              tagline: 'Financial Forecasting & Analysis',
              desc: 'Deep financial intelligence. Quarterly projections, scenario modeling, cash flow forecasting, and investor-ready reporting for your group.',
            },
            {
              name: 'Atlas',
              icon: Cpu,
              color: 'text-cyan-400',
              bg: 'bg-cyan-700/10',
              border: 'border-cyan-600/20',
              tagline: 'Research & Strategic Intelligence',
              desc: 'Market research, competitive analysis, new location feasibility, supplier benchmarking, and industry trend reporting for ownership-level decisions.',
            },
          ].map(a => {
            const Icon = a.icon
            return (
              <div key={a.name} className={`rounded-2xl border ${a.border} ${a.bg} p-5 opacity-70`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${a.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-black text-white">{a.name}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-500 border border-slate-600/30 font-bold">Inactive</span>
                    </div>
                    <p className="text-xs text-slate-400">{a.tagline}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{a.desc}</p>
                <a
                  href={`mailto:ben@axiomstreamgroup.com?subject=Add ${a.name} to my Restaurateur MC&body=I'd like to activate ${a.name} for Chen Hospitality Group.`}
                  className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add {a.name} — +$5/month
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
