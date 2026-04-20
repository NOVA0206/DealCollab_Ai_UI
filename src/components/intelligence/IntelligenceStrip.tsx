'use client';
import React from 'react';

export default function IntelligenceStrip() {
  const signals = [
    { label: 'Market Intelligence Confidence', value: '92.4%' },
    { label: 'Active Deal Signals', value: '12,842' },
    { label: 'Emerging Opportunities', value: '248' },
    { label: 'Buyer Intent Surges', value: '41' },
  ];

  return (
    <section className="w-full bg-[#0B1220] border-y border-white/5 py-10 px-6 sm:px-10 relative z-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-4 divide-x-0 lg:divide-x divide-white/5">
          {signals.map((signal, idx) => (
             <div key={idx} className="flex flex-col items-center lg:items-start lg:pl-12 first:pl-0 group animate-in fade-in slide-in-from-bottom-2 duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6B7280] mb-2 group-hover:text-[#C9A74D] transition-colors duration-500">
                   {signal.label}
                </p>
                <p className="text-3xl font-bold text-[#F9FAFB] tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                   {signal.value}
                </p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
