'use client';
import React from 'react';
import Link from 'next/link';
import { useUser } from '@/components/UserProvider';
import { CreditCard, ArrowUpRight, ArrowDownRight, History, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  type: 'credit' | 'debit' | 'purchase';
  description: string;
  amount: number;
  balance: number;
}

export default function TokenUsagePage() {
  const { tokens } = useUser();

  // Mock transaction data based on PRD requirements
  const transactions: Transaction[] = ([
    {
      id: 'tx_1',
      date: '20 Apr 2026, 14:30',
      type: 'debit',
      description: 'Connection with Pharma Deal',
      amount: -50,
      balance: tokens, // Current balance
    },
    {
      id: 'tx_2',
      date: '18 Apr 2026, 09:15',
      type: 'purchase',
      description: 'Standard Token Pack',
      amount: 100,
      balance: tokens + 50, // Back-calculated for mock
    },
    {
      id: 'tx_3',
      date: '15 Apr 2026, 11:20',
      type: 'credit',
      description: 'Profile Completed',
      amount: 100,
      balance: tokens + 50 - 100, // Back-calculated for mock
    },
    {
      id: 'tx_4',
      date: '15 Apr 2026, 10:05',
      type: 'credit',
      description: 'Welcome Bonus',
      amount: 100,
      balance: tokens + 50 - 100 - 100, // Back-calculated for mock
    },
    {
       id: 'tx_5',
       date: '15 Apr 2026, 10:00',
       type: 'credit',
       description: 'Account Created',
       amount: 150,
       balance: 150,
    }
  ] as Transaction[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex-1 w-full bg-[#F9FAFB] overflow-y-auto min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#1F2937] tracking-tight">Token Usage</h1>
          <Link 
            href="/deal-dashboard" 
            className="text-sm font-bold text-gray-500 hover:text-[#F97316] transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <History size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Available Balance</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-[#1F2937]">{tokens}</span>
              <span className="text-xl font-bold text-[#F97316]">Tokens</span>
            </div>
            <p className="text-sm text-gray-400 font-medium max-w-sm pt-2">
              Each approved connection costs 50 tokens (charged to both parties)
            </p>
          </div>

          <Link 
            href="/profile/billing"
            className="group flex items-center justify-center gap-3 px-8 py-5 bg-[#1F2937] text-white rounded-2xl font-bold transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
          >
            <CreditCard size={18} />
            Buy Tokens
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Transaction Type</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Deal / Action</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Tokens</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Running Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-gray-500 whitespace-nowrap">{tx.date}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        tx.type === 'debit' 
                          ? 'bg-red-50 text-red-600' 
                          : 'bg-green-50 text-green-600'
                      }`}>
                        {tx.type === 'credit' && <ArrowUpRight size={12} />}
                        {tx.type === 'debit' && <ArrowDownRight size={12} />}
                        {tx.type === 'purchase' && <CreditCard size={12} />}
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1F2937]">{tx.description}</span>
                        {tx.type === 'debit' && <ExternalLink size={12} className="text-gray-300" />}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-black">
                      <span className={tx.amount > 0 ? 'text-green-600' : 'text-red-500'}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-sm font-black text-[#1F2937]">{tx.balance}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mock Pagination Footer */}
          <div className="px-8 py-5 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400">Showing 5 of {transactions.length} transactions</p>
            <div className="flex gap-2">
              <button disabled className="px-4 py-2 text-xs font-bold text-gray-300 cursor-not-allowed">Previous</button>
              <button disabled className="px-4 py-2 text-xs font-bold text-gray-300 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="text-center pt-8">
          <p className="text-xs text-gray-400 font-medium">
            Questions about your token usage? <Link href="mailto:support@dealcollab.in" className="text-[#F97316] font-bold hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
