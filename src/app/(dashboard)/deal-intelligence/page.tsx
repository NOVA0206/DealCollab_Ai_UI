'use client';
import React from 'react';
import HeroSection from '@/components/intelligence/HeroSection';
import IntelligenceStrip from '@/components/intelligence/IntelligenceStrip';
import IntelligenceModules from '@/components/intelligence/IntelligenceModules';
import PremiumAccess from '@/components/intelligence/PremiumAccess';
import TrustLayer from '@/components/intelligence/TrustLayer';
import IntelligenceVideoBackground from '@/components/intelligence/IntelligenceVideoBackground';

export default function DealIntelligencePage() {
  return (
    <div className="relative flex-1 w-full min-h-screen bg-[#0B0F1A] overflow-x-hidden overflow-y-auto scrollbar-hide">
      {/* Background layer */}
      <IntelligenceVideoBackground />
      
      {/* Content orchestration */}
      <div className="relative flex flex-col w-full pb-32">
        <HeroSection />
        <IntelligenceStrip />
        <IntelligenceModules />
        <PremiumAccess />
        <TrustLayer />
      </div>

      {/* Decorative side vignetting for that "room" feel */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/50 to-transparent pointer-events-none z-10" />
    </div>
  );
}
