'use client';
import React from 'react';
import DealCard from './DealCard';
import MatchCard from './MatchCard';
import StatusButton, { DashboardStatus } from './StatusButton';

export interface DashboardDeal {
  id: number;
  deal: string;
  dealDesc: string;
  match: string;
  matchDesc: string;
  status: DashboardStatus;
}

interface DashboardRowProps {
  item: DashboardDeal;
}

export default function DashboardRow({ item }: DashboardRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 items-stretch gap-4 p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl shadow-sm hover:bg-white hover:border-brand-accent/20 transition-all duration-300">
      {/* YOUR DEAL */}
      <div className="sm:col-span-5 flex flex-col">
        <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2 px-1">Your Deal</div>
        <DealCard title={item.deal} description={item.dealDesc} />
      </div>

      {/* SELECTED MATCH */}
      <div className="sm:col-span-4 flex flex-col">
        <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2 px-1">AI match</div>
        <MatchCard entity={item.match} description={item.matchDesc} />
      </div>

      {/* STATUS BUTTON */}
      <div className="sm:col-span-3 flex flex-col justify-center items-center sm:items-end sm:pt-6">
        <StatusButton status={item.status} />
      </div>
    </div>
  );
}
