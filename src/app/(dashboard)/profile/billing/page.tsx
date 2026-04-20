'use client';
import React, { useState } from 'react';
import { useUser } from '@/components/UserProvider';
import { 
  Coins, CreditCard, Check, ArrowRight,
  TrendingUp, ShieldCheck, Zap
} from 'lucide-react';

export default function BillingPage() {
  const { tokens, addTokens } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<number>(250);
  const [showSuccess, setShowSuccess] = useState(false);

  const plans = [
    { id: 100, tokens: 100, price: '$49', description: 'Quick Start', icon: <Zap size={20} /> },
    { id: 250, tokens: 250, price: '$99', description: 'Most Popular', icon: <TrendingUp size={20} />, recommended: true },
    { id: 500, tokens: 500, price: '$179', description: 'Best Value', icon: <ShieldCheck size={20} /> }
  ];

  const handlePurchase = () => {
    addTokens(selectedPlan);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-white relative overflow-y-auto">
      
      {/* SUCCESS BANNER */}
      {showSuccess && (
        <div className="sticky top-0 z-50 bg-green-50 border-b border-green-100 p-4 animate-in slide-in-from-top duration-500">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
                <Check size={18} />
              </div>
              <p className="text-sm font-bold text-green-800">
                Purchase successful! {selectedPlan} tokens have been added to your balance.
              </p>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="text-xs font-bold text-green-600 hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto w-full p-6 sm:p-10 space-y-12 pb-24">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937] tracking-tight">Billing & Tokens</h1>
          <p className="text-[#6B7280] text-sm font-medium mt-1">Manage your platform credits and subscription</p>
        </div>

        {/* TOKEN BALANCE CARD */}
        <div className="bg-[#1F2937] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F97316]/20 to-transparent rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-[#9CA3AF] text-xs font-black uppercase tracking-[0.2em] mb-3">Available Credits</p>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-bold tabular-nums">{tokens}</span>
                <span className="text-[#F97316] text-xl font-bold">Tokens</span>
              </div>
              <p className="text-[#9CA3AF] text-xs font-medium mt-4">Last sync: Just now</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4">
              <div className="bg-[#F97316] p-2 rounded-lg text-white">
                <Coins size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Usage Status</p>
                <p className="text-sm font-bold text-white">Optimal Account Health</p>
              </div>
            </div>
          </div>
        </div>

        {/* BUY TOKENS SECTION */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1F2937]">Select Token Package</h2>
            <span className="text-xs font-bold text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full">Secure Payment via Stripe</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative flex flex-col p-6 rounded-[32px] border-2 transition-all duration-300 text-left group ${
                  selectedPlan === plan.id 
                    ? 'border-[#F97316] bg-white shadow-xl scale-[1.02]' 
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    Recommended
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  selectedPlan === plan.id ? 'bg-[#F97316] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
                }`}>
                  {plan.icon}
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{plan.description}</p>
                  <p className="text-2xl font-bold text-[#1F2937]">{plan.tokens} Tokens</p>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-50">
                  <p className="text-3xl font-black text-[#1F2937]">{plan.price}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">One-time payment</p>
                </div>

                <div className={`mt-6 w-full py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest transition-all ${
                  selectedPlan === plan.id 
                    ? 'bg-[#F97316] text-white shadow-lg' 
                    : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
                }`}>
                  {selectedPlan === plan.id ? 'Selected' : 'Buy Now'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* PAYMENT CTA */}
        <div className="bg-gray-50 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm">
              <CreditCard className="text-gray-400" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1F2937]">Checkout Securely</p>
              <p className="text-xs text-gray-500 font-medium tracking-tight">Visa, Mastercard, Amex, Apple Pay</p>
            </div>
          </div>
          
          <button 
            onClick={handlePurchase}
            className="w-full md:w-auto px-10 py-5 bg-[#F97316] text-white rounded-[20px] text-sm font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-[#F97316]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Proceed to Payment <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
