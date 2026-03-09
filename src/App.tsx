import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, CalendarClock, Package, Clock, DollarSign, CheckSquare, Users, MessageSquare, Menu, X, ChefHat, TrendingUp, BarChart2 } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Financials from './pages/Financials'
import MenuEngineering from './pages/MenuEngineering'
import Deadlines from './pages/Deadlines'
import Inventory from './pages/Inventory'
import Timekeeper from './pages/Timekeeper'
import Payroll from './pages/Payroll'
import Todos from './pages/Todos'
import Agents from './pages/Agents'
import Chat from './pages/Chat'
import { DEMO_CONFIG } from './config'

const NAV = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/financials', icon: DollarSign,      label: 'Financials' },
  { to: '/menu',       icon: BarChart2,       label: 'Menu Engineering' },
  { to: '/deadlines',  icon: CalendarClock,   label: 'Deadlines & Filings' },
  { to: '/inventory',  icon: Package,         label: 'Inventory' },
  { to: '/timekeeper', icon: Clock,           label: 'Timekeeper' },
  { to: '/payroll',    icon: TrendingUp,      label: 'Payroll' },
  { to: '/todos',      icon: CheckSquare,     label: 'To-Dos' },
  { to: '/agents',     icon: Users,           label: 'Your Agents' },
  { to: '/chat',       icon: MessageSquare,   label: '✦ Ask Lex or Rex' },
]

function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 min-h-screen bg-slate-900 border-r border-slate-800 flex-col shrink-0">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-0.5">
          <ChefHat className="w-5 h-5 text-orange-400" />
          <span className="text-sm font-black text-white tracking-tight">Restaurateur MC</span>
        </div>
        <p className="text-xs text-slate-500 pl-7">{DEMO_CONFIG.groupName}</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-orange-600/20 text-orange-300 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-slate-800">
        <p className="text-xs text-slate-600">Powered by ASG · {DEMO_CONFIG.version}</p>
      </div>
    </aside>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  const current = NAV.find(n => location.pathname.startsWith(n.to))
  return (
    <>
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-[52px] bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <ChefHat className="w-4 h-4 text-orange-400 shrink-0" />
          <span className="text-sm font-black text-white truncate">Restaurateur MC</span>
          {current && <><span className="text-slate-600 text-xs">·</span><span className="text-xs text-slate-400 truncate">{current.label}</span></>}
        </div>
        <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-slate-800 transition-colors shrink-0">
          <Menu className="w-5 h-5 text-slate-400" />
        </button>
      </div>
      {open && <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />}
      <div className={`md:hidden fixed top-0 right-0 z-50 h-full w-72 bg-slate-900 border-l border-slate-800 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <ChefHat className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-black text-white">Restaurateur MC</span>
            </div>
            <p className="text-xs text-slate-500 pl-6">{DEMO_CONFIG.groupName}</p>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                  isActive ? 'bg-orange-600/20 text-orange-300 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-slate-800">
          <p className="text-xs text-slate-600">Powered by ASG · {DEMO_CONFIG.version}</p>
        </div>
      </div>
    </>
  )
}

function MobileDefaultRoute() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(window.innerWidth < 768 ? '/chat' : '/dashboard', { replace: true })
  }, [navigate])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <MobileNav />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<MobileDefaultRoute />} />
              <Route path="/dashboard"  element={<Dashboard />} />
              <Route path="/financials" element={<Financials />} />
              <Route path="/menu"       element={<MenuEngineering />} />
              <Route path="/deadlines"  element={<Deadlines />} />
              <Route path="/inventory"  element={<Inventory />} />
              <Route path="/timekeeper" element={<Timekeeper />} />
              <Route path="/payroll"    element={<Payroll />} />
              <Route path="/todos"      element={<Todos />} />
              <Route path="/agents"     element={<Agents />} />
              <Route path="/chat"       element={<Chat />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
