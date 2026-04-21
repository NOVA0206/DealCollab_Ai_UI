'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProfileDropdown from '@/components/ProfileDropdown';
import BottomNav from '@/components/BottomNav';

import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/components/UserProvider';
import { Coins } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { tokens } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  
  const isStandalonePage = pathname?.includes('/eoi-review');

  // Authentication Guard
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        router.push('/');
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden font-sans antialiased text-foreground">
      {/* Desktop Sidebar */}
      {!isStandalonePage && (
        <div className={`hidden md:block ${isSidebarCollapsed ? 'w-[80px]' : 'w-[240px]'} transition-all duration-300 overflow-hidden shrink-0`}>
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        </div>
      )}
      
      <div className="flex-1 flex flex-col relative h-full min-h-0 bg-white overflow-hidden">
        {/* Mobile Bottom Nav */}
        {!isStandalonePage && <BottomNav />}

        {/* Profile & Tokens Area */}
        {!isStandalonePage && (
          <div className="absolute top-6 right-8 z-40 md:z-50 flex items-center gap-3">
            <Link 
              href="/profile/tokens"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F97316]/10 border border-[#F97316]/20 rounded-full transition-all hover:bg-[#F97316]/20 group"
            >
              <Coins size={14} className="text-[#F97316]" />
              <span className="text-xs font-bold text-[#F97316]">{tokens} Tokens</span>
            </Link>
            <ProfileDropdown />
          </div>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col w-full h-full min-h-0 relative overflow-hidden pb-20 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
