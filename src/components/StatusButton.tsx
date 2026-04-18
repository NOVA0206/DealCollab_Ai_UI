'use client';
import React from 'react';
import Link from 'next/link';

export type DashboardStatus = 'Send EOI' | 'Waiting for Approval' | 'Connected';

interface StatusButtonProps {
  status: DashboardStatus;
}

export default function StatusButton({ status }: StatusButtonProps) {
  if (status === 'Send EOI') {
    return (
      <Link 
        href="/connect" 
        className="flex items-center justify-center px-6 py-2.5 bg-[#F97316] text-white font-bold text-xs rounded-lg hover:bg-[#EA580C] transition-all active:scale-95 shadow-sm whitespace-nowrap min-w-[140px]"
      >
        Send EOI
      </Link>
    );
  }

  if (status === 'Waiting for Approval') {
    return (
      <button 
        disabled 
        className="flex items-center justify-center px-6 py-2.5 bg-[#E5E7EB] text-[#6B7280] font-bold text-xs rounded-lg cursor-not-allowed whitespace-nowrap min-w-[140px]"
      >
        Waiting for Approval
      </button>
    );
  }

  if (status === 'Connected') {
    return (
      <Link 
        href="/connection-details" 
        className="flex items-center justify-center px-6 py-2.5 bg-green-500 text-white font-bold text-xs rounded-lg hover:bg-green-600 transition-all active:scale-95 shadow-sm whitespace-nowrap min-w-[140px]"
      >
        Connected
      </Link>
    );
  }

  return null;
}
