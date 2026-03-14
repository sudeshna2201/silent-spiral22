import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { BrainCircuit, LayoutDashboard, PenTool, Lightbulb, LineChart } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/journal', icon: PenTool, label: 'Journal' },
    { path: '/insights', icon: Lightbulb, label: 'Insights' },
    { path: '/trends', icon: LineChart, label: 'Trends' },
  ];

  return (
    <div className="flex h-screen overflow-hidden text-brand-50" style={{ background: 'var(--color-brand-1000)' }}>
      {/* Sidebar - Calm Dark Glassmorphism */}
      <aside className="w-64 flex flex-col glass border-r border-white/5 z-10 transition-all shadow-xl">
        <div className="p-8 flex items-center justify-center space-x-3 mb-4 mt-2">
          <BrainCircuit className="w-8 h-8 text-brand-400 opacity-90" />
          <span className="text-xl font-light tracking-[0.2em] text-white/90">SILENT<br/>SPIRAL</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-3 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-4 px-5 py-3.5 rounded-2xl transition-all duration-500",
                  "hover:bg-white/5 hover:text-white group",
                  isActive ? "bg-brand-600/20 text-white shadow-inner border border-brand-400/20" : "text-brand-300/80"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-500",
                  isActive ? "bg-brand-500/30 shadow-[0_0_15px_rgba(96,165,250,0.3)]" : "bg-white/5 group-hover:bg-white/10"
                )}>
                  <Icon className={cn("w-5 h-5", isActive ? "text-brand-200" : "text-brand-300")} />
                </div>
                <span className="font-medium tracking-wide text-[15px]">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        
        <div className="p-6 mb-4">
          <div className="glass-card p-4 rounded-2xl border border-white/5 text-center">
            <p className="text-xs text-brand-300/60 font-light italic leading-relaxed">
              "Quiet the mind, and the soul will speak."
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/3"></div>
        
        <div className="relative p-12 max-w-5xl mx-auto min-h-full transition-opacity duration-700">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
