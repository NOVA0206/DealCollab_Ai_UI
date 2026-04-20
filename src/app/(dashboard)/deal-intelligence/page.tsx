'use client';
import React from 'react';
import { Sparkles, Globe, Target, Zap, ShieldCheck, TrendingUp, Clock, Lock, ChevronRight, Share2, BarChart3, Database } from 'lucide-react';
import IntelligenceHero from '@/components/intelligence/IntelligenceHero';
import IntelligenceStrip from '@/components/intelligence/IntelligenceStrip';
import IntelligenceModule from '@/components/intelligence/IntelligenceModule';
import PremiumAccessPanel from '@/components/intelligence/PremiumAccessPanel';
import AuthoritySection from '@/components/intelligence/AuthoritySection';

export default function DealIntelligencePage() {
  return (
    <div className="flex-1 flex flex-col w-full h-full bg-[#020617] relative overflow-y-auto overflow-x-hidden scrollbar-hide selection:bg-[#C9A74D]/30">
      
      {/* SECTION 1 — HERO INTELLIGENCE LAYER */}
      <IntelligenceHero />
      
      {/* SECTION 1.2 — INTELLIGENCE STRIP */}
      <IntelligenceStrip />

      {/* SECTION 2 — INTELLIGENCE OFFERINGS LAYER */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-24 space-y-12">
        <div className="space-y-4 max-w-2xl px-2">
           <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9A74D]">Intelligence Architecture</h2>
           <p className="text-2xl font-bold text-[#F9FAFB] tracking-tight">Core Access Modules</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <IntelligenceModule 
             title="Network Intelligence"
             description="Deconstruct relationship power dynamics and identify hidden tactical connectors across institutional participants."
             icon={<Globe size={24} />}
             visual={<NetworkDots />}
           />
           <IntelligenceModule 
             title="Deal Flow Prediction"
             description="Early visibility into forthcoming market movements before public disclosure using AI Forward Signal™."
             icon={<Zap size={24} />}
             badge="AI Forward Signal™"
           />
           <IntelligenceModule 
             title="Buyer Intent Intelligence"
             description="Monitor real-time behavioral demand surges from verified institutional capital groups."
             icon={<Target size={24} />}
             trend="up"
           />
           <IntelligenceModule 
             title="Undersupplied Demand Zones"
             description="Leverage structural origination advantage by identifying sectors with high capital-to-deal ratios."
             icon={<Database size={24} />}
           />
           <IntelligenceModule 
             title="Deal Closure Probability"
             description="Execution certainty analytics based on historical collaboration behavior and sector performance."
             icon={<BarChart3 size={24} />}
             metric="84.2%"
           />
        </div>
      </div>

      {/* SECTION 3 — PREMIUM ACCESS LAYER */}
      <PremiumAccessPanel />

      {/* SECTION 4 — TRUST & AUTHORITY LAYER */}
      <AuthoritySection />

      {/* Spacer for bottom */}
      <div className="h-32 shrink-0 bg-gradient-to-t from-[#020617] to-transparent" />
    </div>
  );
}

function NetworkDots() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
          {[1,2,3,4,5,6].map(i => (
             <div 
               key={i} 
               className="absolute w-1 h-1 bg-white rounded-full animate-pulse" 
               style={{ 
                 top: `${Math.random() * 100}%`, 
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${i * 0.5}s`
               }} 
             />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
       </div>
    </div>
  );
}
