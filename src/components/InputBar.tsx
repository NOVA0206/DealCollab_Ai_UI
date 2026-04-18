'use client';
import React, { useState } from 'react';
import { Plus, ArrowUp } from 'lucide-react';

interface InputBarProps {
  onSendMessage: (text: string) => void;
}

export default function InputBar({ onSendMessage }: InputBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-8 pt-4">
      <form 
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-white border rounded-xl p-2 transition-all duration-300 ${
          isFocused 
            ? 'border-brand-accent shadow-md ring-1 ring-brand-accent/20' 
            : 'border-brand-border shadow-sm'
        }`}
      >
        <button 
          type="button"
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-brand-secondary hover:text-foreground hover:bg-gray-100 transition-colors"
        >
          <Plus size={20} />
        </button>

        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Submit / Describe your Proposal" 
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-brand-secondary px-4 text-[15px]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <button 
          type="submit"
          className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-accent flex items-center justify-center text-white hover:bg-brand-accent-hover transition-all active:scale-95 shadow-sm"
        >
          <ArrowUp size={18} />
        </button>
      </form>

      <div className="text-center mt-3">
        <p className="text-xs text-brand-secondary font-medium">Drag & drop files or click + to attach proposals</p>
      </div>
    </div>
  );
}

