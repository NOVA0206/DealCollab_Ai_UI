'use client';
import React, { useState } from 'react';
import { Plus, ArrowUp, Lock, Sparkles } from 'lucide-react';
import { useUser } from './UserProvider';

interface InputBarProps {
  onSendMessage: (text: string) => void;
}

export default function InputBar({ onSendMessage }: InputBarProps) {
  const { onboarding, setOnboarding, totalScore } = useUser();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const isDisabled = totalScore < 100;

  const suggestionChips = [
    "Analyze venture capital deal",
    "Identify SLA risks",
    "Review pricing terms",
    "Compare with industry benchmarks"
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim() && !isDisabled) {
      onSendMessage(inputValue);
      setInputValue('');
      setOnboarding('dealSubmitted', true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-8 pt-4">
      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center animate-in fade-in slide-in-from-bottom-2 duration-700">
        {suggestionChips.map((chip, i) => (
          <button
            key={i}
            onClick={() => !isDisabled && setInputValue(chip)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
              isDisabled 
                ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-white border-gray-200 text-gray-500 hover:border-[#F97316] hover:text-[#F97316] shadow-sm'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      <form 
        id="chat-input-area"
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-white border rounded-xl p-2 transition-all duration-300 ${
          isDisabled
            ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
            : isFocused 
              ? 'border-[#F97316] shadow-md ring-1 ring-[#F97316]/20' 
              : 'border-brand-border shadow-sm'
        }`}
      >
        <button 
          type="button"
          disabled={isDisabled}
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-brand-secondary hover:text-foreground hover:bg-gray-100 transition-colors disabled:cursor-not-allowed"
        >
          <Plus size={20} />
        </button>

        <input 
          type="text" 
          value={inputValue}
          disabled={isDisabled}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isDisabled ? `Complete your profile (Currently ${totalScore}%) to unlock chat` : "Submit / Describe your Proposal"} 
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-brand-secondary px-4 text-[15px] disabled:cursor-not-allowed"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <button 
          type="submit"
          disabled={isDisabled || !inputValue.trim()}
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all active:scale-95 shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed ${
            isDisabled ? 'bg-gray-300' : 'bg-[#F97316] hover:bg-[#EA580C]'
          }`}
        >
          {isDisabled ? <Lock size={16} /> : <ArrowUp size={18} />}
        </button>
      </form>

      <div className="text-center mt-3">
        <p className="text-xs text-brand-secondary font-medium flex items-center justify-center gap-1">
          {isDisabled ? (
            <span className="flex items-center gap-1 text-[#F97316]"><Lock size={12} /> 100% Profile completion required for AI access</span>
          ) : (
            <span className="flex items-center gap-1"><Sparkles size={12} className="text-[#F97316]" /> AI ready to analyze your proposals</span>
          )}
        </p>
      </div>
    </div>
  );
}

