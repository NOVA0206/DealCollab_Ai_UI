'use client';
import React, { useState, useRef, useEffect } from 'react';
import { User, Coins, CreditCard, LogOut } from 'lucide-react';
import { useUser } from './UserProvider';

import Link from 'next/link';

export default function ProfileDropdown() {
  const { tokens } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full bg-white border border-brand-border flex items-center justify-center hover:bg-gray-50 transition-all active:scale-95 shadow-sm overflow-visible"
      >
        <User size={18} className="text-foreground" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F97316] text-[8px] font-bold text-white rounded-full flex items-center justify-center border border-white">
          {tokens > 999 ? '9k+' : tokens}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-brand-border shadow-lg p-2 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          <div className="px-3 py-2 mb-2 border-b border-brand-border">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-semibold text-foreground">Alex Morgan</p>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#F97316]/10 rounded-md">
                <Coins size={10} className="text-[#F97316]" />
                <span className="text-[10px] font-bold text-[#F97316]">{tokens}</span>
              </div>
            </div>
            <p className="text-xs text-brand-secondary">alex@dealcollab.ai</p>
          </div>
          
          <div className="flex flex-col gap-1">
            <Link 
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-brand-secondary hover:text-foreground hover:bg-black/5 transition-all text-sm w-full text-left active:scale-[0.98]"
            >
              <User size={16} />
              <span>Profile Settings</span>
            </Link>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-brand-secondary hover:text-foreground hover:bg-black/5 transition-all text-sm w-full text-left active:scale-[0.98]">
              <Coins size={16} />
              <span>Token Usage</span>
            </button>
            <Link 
              href="/profile/billing"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-brand-secondary hover:text-foreground hover:bg-black/5 transition-all text-sm w-full text-left active:scale-[0.98]"
            >
              <CreditCard size={16} />
              <span>Billing</span>
            </Link>
            <div className="my-1 border-t border-brand-border" />
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all text-sm w-full text-left active:scale-[0.98]">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

