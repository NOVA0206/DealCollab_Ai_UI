'use client';
import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronRight, Lock, User as UserIcon, Send, Smartphone } from 'lucide-react';
import { useUser } from './UserProvider';
import Link from 'next/link';

export default function OnboardingChecklist() {
  const { onboarding, setOnboarding, totalScore } = useUser();
  const [isExplicitlyExpanded, setIsExplicitlyExpanded] = useState(false);

  const { phoneVerified, dealSubmitted } = onboarding;
  const profileCompleted = totalScore === 100;

  // Don't show if all steps are complete
  if (dealSubmitted && profileCompleted) return null;

  const handleScrollToChat = () => {
    const inputArea = document.getElementById('chat-input-area');
    if (inputArea) {
      inputArea.scrollIntoView({ behavior: 'smooth' });
      const input = inputArea.querySelector('input');
      if (input) input.focus();
    }
  };

  // If Step 2 is complete, default to collapsed unless expanded by user
  const shouldShowCollapsed = profileCompleted && !isExplicitlyExpanded && !dealSubmitted;

  if (shouldShowCollapsed) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
        <button 
          onClick={() => setIsExplicitlyExpanded(true)}
          className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center justify-between hover:border-[#F97316]/50 transition-all shadow-sm group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
              <CheckCircle2 size={16} />
            </div>
            <span className="text-sm font-bold text-[#1F2937]">Onboarding Progress: 2/3 Steps Complete</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#F97316] group-hover:translate-x-1 transition-transform">
            View Details <ChevronRight size={14} />
          </div>
        </button>
      </div>
    );
  }

  const steps = [
    {
      id: 1,
      title: 'Phone Verified',
      completed: phoneVerified,
      icon: <Smartphone size={18} />,
      active: !phoneVerified,
      action: null
    },
    {
      id: 2,
      title: 'Complete Profile',
      completed: profileCompleted,
      icon: <UserIcon size={18} />,
      active: phoneVerified && !profileCompleted,
      action: !profileCompleted ? (
        <Link 
          href="/profile" 
          className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1"
        >
          Go to Profile <ChevronRight size={12} />
        </Link>
      ) : (
        <div className="text-xs font-bold text-green-600 flex items-center gap-1">
          Profile Ready <CheckCircle2 size={12} />
        </div>
      )
    },
    {
      id: 3,
      title: 'Submit Deal',
      completed: dealSubmitted,
      icon: <Send size={18} />,
      active: profileCompleted && !dealSubmitted,
      locked: !profileCompleted,
      action: profileCompleted ? (
        <button 
          onClick={handleScrollToChat}
          className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1"
        >
          Scroll to Chat <ChevronRight size={12} />
        </button>
      ) : (
        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium cursor-not-allowed">
          <Lock size={10} /> Locked
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 animate-in fade-in duration-500">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#1F2937]">Onboarding Checklist</h3>
          <div className="bg-[#F97316]/10 text-[#F97316] px-3 py-1 rounded-full text-xs font-bold">
            {steps.filter(s => s.completed).length} / {steps.length} Complete
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              className={`flex flex-col gap-3 p-4 rounded-xl border transition-all duration-300 ${
                step.completed 
                  ? 'bg-green-50 border-green-100 opacity-60' 
                  : step.active 
                    ? 'bg-[#F97316]/5 border-[#F97316]/20 shadow-sm ring-1 ring-[#F97316]/10' 
                    : 'bg-gray-50 border-gray-100 opacity-40'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${step.completed ? 'bg-green-100 text-green-600' : 'bg-[#F97316]/10 text-[#F97316]'}`}>
                  {step.icon}
                </div>
                {step.completed ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <Circle size={20} className="text-[#E5E7EB]" />
                )}
              </div>
              
              <div>
                <p className={`text-sm font-bold ${step.completed ? 'text-green-800' : 'text-[#1F2937]'}`}>
                  {step.title}
                </p>
                <div className="mt-2 min-h-[20px]">
                  {step.action}
                </div>
              </div>
            </div>
          ))}

          {/* Connections between steps (Desktop only) */}
          <div className="hidden md:block absolute top-[28px] left-[calc(33%+12px)] w-[calc(33%-24px)] h-[2px] bg-gray-100 -z-10" />
          <div className="hidden md:block absolute top-[28px] left-[calc(66%+12px)] w-[calc(33%-24px)] h-[2px] bg-gray-100 -z-10" />
        </div>
      </div>
    </div>
  );
}
