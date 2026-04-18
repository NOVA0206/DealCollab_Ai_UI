'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileDropdown from './ProfileDropdown';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans antialiased text-foreground">
      <div className={`${isSidebarCollapsed ? 'w-[80px]' : 'w-[240px]'} transition-all duration-300 overflow-hidden shrink-0`}>
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>
      
      <div className="flex-1 flex flex-col relative h-full bg-white overflow-hidden">
        {/* Profile Dropdown Area */}
        <div className="absolute top-6 right-8 z-50">
          <ProfileDropdown />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full h-full relative overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
