import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Scale, Megaphone, Send, Loader2, ChefHat } from 'lucide-react'



const AGENTS = {
  lex: {
    name: 'Lex',
    icon: Scale,
    color: 'text-amber-400',
    bg: 'bg-amber-600/20',
    border: 'border-amber-600/40',
    activeBg: 'bg-amber-600/20 border-amber-400',
    tagline: 'Virtual General Counsel',
    system: `You are Lex, a virtual general counsel for restaurant operators. You are a former Big Law M&A and hospitality attorney who now advises a multi-location restaurant group called Chen Hospitality Group — three restaurants in Wisconsin: Harbor Kitchen (Walker's Point, Milwaukee), The Loft (Mequon Public Market), and Omakase 76 (East Side, Milwaukee, newly opened).

You answer questions about: liquor licensing, health permits, food safety regulations (Wisconsin and federal), partnership and operating agreements, commercial lease review, employment law (tip pooling, overtime, manager classification), Wisconsin LLC and tax filings, vendor contracts, and any other legal or compliance matter relevant to restaurant ownership.

You give clear, practical, attorney-quality answers. You always note when the owner should consult a licensed attorney for final decisions. You never hedge unnecessarily — give real guidance.`,
    starters: [
      'What do I need to renew the Harbor Kitchen liquor license?',
      'Explain the buyout clause in a typical restaurant operating agreement.',
      'What are Wisconsin\'s rules on tip pooling?',
      'Walk me through every permit needed to open a new restaurant location.',
    ],
  },
  rex: {
    name: 'Rex',
    icon: Megaphone,
    color: 'text-pink-400',
    bg: 'bg-pink-600/20',
    border: 'border-pink-600/40',
    activeBg: 'bg-pink-600/20 border-pink-400',
    tagline: 'Marketing & Revenue Agent',
    system: `You are Rex, a marketing and revenue agent for a multi-location restaurant group called Chen Hospitality Group — three restaurants in Wisconsin: Harbor Kitchen (Walker's Point, Milwaukee — full-service Japanese fusion, 85 seats), The Loft (Mequon Public Market — fast casual sushi/ramen, 45 seats), and Omakase 76 (East Side, Milwaukee — omakase and hand roll bar, 32 seats, recently opened).

You help with: creating opening campaigns, weekly specials based on expiring inventory, customer outreach and retention messaging, social media content, discount and deal strategy, event and private dining promotion, review response, and partner/investor updates.

You are creative, direct, and results-focused. You know that restaurants run on margins and foot traffic — your job is to drive both. Give concrete, ready-to-use copy and campaign ideas, not frameworks.`,
    starters: [
      'Write an Instagram post for the Omakase 76 grand opening.',
      'We have 4 lbs of bluefin tuna expiring tonight — build a special around it.',
      'Draft a Monday night promo to drive traffic at Harbor Kitchen.',
      'Write a response to a 3-star review complaining about wait times.',
    ],
  },
}

type Agent = 'lex' | 'rex'
type Msg = { role: 'user' | 'assistant'; content: string; agent: Agent }

export default function Chat() {
  const location = useLocation()
  const navState = location.state as { agent?: Agent; prefill?: string } | null

  const [agent, setAgent] = useState<Agent>(navState?.agent || 'lex')
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState(navState?.prefill || '')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])
  useEffect(() => { if (navState?.prefill) { inputRef.current?.focus() } }, [])

  const send = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || loading) return
    const newMsg: Msg = { role: 'user', content, agent }
    setMsgs(m => [...m, newMsg])
    setInput('')
    setLoading(true)
    const history = [...msgs.filter(m => m.agent === agent), newMsg]
      .map(m => ({ role: m.role, content: m.content }))
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ agent, messages: history }),
      })
      const data = await res.json()
      const reply = data.text || data.error || 'No response.'
      setMsgs(m => [...m, { role: 'assistant', content: reply, agent }])
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: 'Connection error. Please try again.', agent }])
    }
    setLoading(false)
  }

  const cfg = AGENTS[agent]
  const Icon = cfg.icon
  const agentMsgs = msgs.filter(m => m.agent === agent)

  return (
    <div className="flex flex-col h-[calc(100vh-52px)] md:h-screen">
      {/* Agent switcher */}
      <div className="shrink-0 px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          {(Object.entries(AGENTS) as [Agent, typeof AGENTS[Agent]][]).map(([key, a]) => {
            const AIcon = a.icon
            const active = agent === key
            return (
              <button key={key} onClick={() => setAgent(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${active ? a.activeBg + ' text-white' : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-600'}`}
              >
                <AIcon className={`w-4 h-4 ${active ? a.color : ''}`} />
                {a.name}
                {active && <span className={`text-[10px] ${a.color}`}>· {a.tagline}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {agentMsgs.length === 0 && (
            <div className="text-center pt-8 pb-4">
              <div className={`w-14 h-14 rounded-2xl ${cfg.bg} border ${cfg.border} flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-7 h-7 ${cfg.color}`} />
              </div>
              <p className="text-lg font-black text-white mb-1">{cfg.name}</p>
              <p className="text-sm text-slate-400 mb-6">{cfg.tagline}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
                {cfg.starters.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className={`text-left text-xs p-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {agentMsgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className={`w-7 h-7 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0 mr-2 mt-1`}>
                  <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-slate-700 text-white rounded-br-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-sm'
              }`}>
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-orange-600/20 border border-orange-600/40 flex items-center justify-center shrink-0 ml-2 mt-1">
                  <ChefHat className="w-3.5 h-3.5 text-orange-400" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className={`w-7 h-7 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0 mr-2 mt-1`}>
                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-bl-sm px-4 py-3">
                <Loader2 className="w-4 h-4 text-slate-500 animate-spin" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 px-4 pb-4 pt-3 border-t border-slate-800 bg-slate-950">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            placeholder={`Ask ${cfg.name}…`}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
          />
          <button onClick={() => send()} disabled={!input.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-[10px] text-slate-600 text-center mt-2">Lex is not a licensed attorney. Rex is not a guarantee of results. Use professional judgment.</p>
      </div>
    </div>
  )
}
