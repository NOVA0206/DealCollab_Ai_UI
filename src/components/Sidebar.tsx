'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Bell, BrainCircuit, PanelLeftClose, PanelLeft } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Deal Log', icon: FileText, href: '/deal-log' },
    { name: 'Deal Dashboard', icon: LayoutDashboard, href: '/deal-dashboard' },
  ];

  return (
    <aside className="w-full h-full bg-brand-sidebar border-r border-brand-border flex flex-col justify-between py-6 transition-all duration-300">
      {/* Top Section */}
      <div>
        {/* Logo Area */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-6'} mb-10 overflow-hidden`}>
          <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center shrink-0 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-white transition-all transform scale-100" />
          </div>
          {!isCollapsed && <span className="text-foreground font-bold text-sm tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2">DealCollab AI</span>}
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1.5 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all w-full text-left ${
                  isActive 
                    ? 'text-brand-accent bg-brand-accent-glow border-l-2 border-brand-accent' 
                    : 'text-brand-secondary hover:text-foreground hover:bg-black/5'
                }`}
              >
                <item.icon size={20} className={`shrink-0 transition-transform ${isActive ? '' : 'group-hover:scale-110'}`} />
                {!isCollapsed && <span className="text-sm font-bold whitespace-nowrap overflow-hidden">{item.name}</span>}
              </Link>
            );
          })}

          <button className={`group flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-3'} py-2.5 rounded-xl text-brand-secondary hover:text-foreground hover:bg-black/5 transition-all w-full text-left`}>
            <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
              <Bell size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
              {!isCollapsed && <span className="text-sm font-bold whitespace-nowrap overflow-hidden">Notifications</span>}
            </div>
            {!isCollapsed && (
              <span className="bg-brand-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                2
              </span>
            )}
          </button>

          <Link 
            href="/"
            className={`group flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2.5 rounded-xl transition-all w-full text-left ${
              pathname === '/' 
                ? 'text-brand-accent bg-brand-accent-glow border-l-2 border-brand-accent' 
                : 'text-brand-secondary hover:text-foreground hover:bg-black/5'
            }`}
          >
            <BrainCircuit size={20} className={`shrink-0 transition-transform ${pathname === '/' ? '' : 'group-hover:rotate-12'}`} />
            {!isCollapsed && <span className="text-sm font-bold whitespace-nowrap overflow-hidden">Deal Intelligence</span>}
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-3">
          <button 
            onClick={onToggle}
            className={`group flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2.5 rounded-xl text-brand-secondary hover:text-foreground hover:bg-black/5 transition-all w-full text-left`}
          >
            {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
            {!isCollapsed && <span className="text-sm font-bold whitespace-nowrap">Collapse</span>}
          </button>
      </div>
    </aside>
  );
}
