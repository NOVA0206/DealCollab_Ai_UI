'use client';
import React from 'react';
import Link from 'next/link';
import { useUser } from '@/components/UserProvider';
import { CreditCard, ArrowUpRight, ArrowDownRight, History, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  date: string; // ISO format
  type: 'credit' | 'debit' | 'purchase';
  description: string;
  amount: number;
  balance: number;
}

export default function TokenUsagePage() {
  const { tokens } = useUser();

  // ✅ Fixed: ISO date format
  const transactions: Transaction[] = [
    {
      id: 'tx_1',
      date: '2026-04-20T14:30:00',
      type: 'debit',
      description: 'Connection with Pharma Deal',
      amount: -50,
      balance: tokens,
    },
    {
      id: 'tx_2',
      date: '2026-04-18T09:15:00',
      type: 'purchase',
      description: 'Standard Token Pack',
      amount: 100,
      balance: tokens + 50,
    },
    {
      id: 'tx_3',
      date: '2026-04-15T11:20:00',
      type: 'credit',
      description: 'Profile Completed',
      amount: 100,
      balance: tokens - 50,
    },
    {
      id: 'tx_4',
      date: '2026-04-15T10:05:00',
      type: 'credit',
      description: 'Welcome Bonus',
      amount: 100,
      balance: tokens - 150,
    },
    {
      id: 'tx_5',
      date: '2026-04-15T10:00:00',
      type: 'credit',
      description: 'Account Created',
      amount: 150,
      balance: 150,
    }
  ]
  // ✅ Safe sorting
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400">
              <History size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Available Balance</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-[#1F2937]">{tokens}</span>
              <span className="text-xl font-bold text-[#F97316]">Tokens</span>
            </div>
          </div>

          <Link 
            href="/profile/billing"
            className="flex items-center justify-center gap-3 px-8 py-5 bg-[#1F2937] text-white rounded-2xl font-bold hover:bg-black transition"
          >
            <CreditCard size={18} />
            Buy Tokens
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-5 text-xs font-black text-gray-400">Date</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400">Type</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400">Action</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 text-right">Tokens</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 text-right">Balance</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    
                    {/* ✅ Proper date display */}
                    <td className="px-8 py-6 text-sm font-bold text-gray-500">
                      {new Date(tx.date).toLocaleString()}
                    </td>

                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        tx.type === 'debit'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {tx.type}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-sm font-bold">
                      {tx.description}
                    </td>

                    <td className="px-8 py-6 text-right font-bold">
                      <span className={tx.amount > 0 ? 'text-green-600' : 'text-red-500'}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-right font-bold">
                      {tx.balance}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
