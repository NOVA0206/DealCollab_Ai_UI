'use client';
import React from 'react';
import Link from 'next/link';
import { useUser } from '@/components/UserProvider';
import { CreditCard, ArrowUpRight, History } from 'lucide-react';

type TransactionType = 'credit' | 'debit' | 'purchase';

interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  description: string;
  amount: number;
  balance: number;
}

export default function TokenUsagePage() {
  const { tokens } = useUser();

  // ✅ Explicitly typed data (NO inference issues)
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
  ];

  // ✅ Sort AFTER typing (no inference break)
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex-1 w-full bg-[#F9FAFB] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#1F2937]">Token Usage</h1>
          <Link href="/deal-dashboard" className="text-sm font-bold text-gray-500 hover:text-[#F97316]">
            Back to Dashboard
          </Link>
        </div>

        {/* Balance */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
              <History size={16} /> Balance
            </div>
            <div className="text-4xl font-black text-[#1F2937]">{tokens}</div>
          </div>

          <Link
            href="/profile/billing"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl"
          >
            <CreditCard size={16} />
            Buy Tokens
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400">Action</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 text-right">Balance</th>
              </tr>
            </thead>

            <tbody>
              {sortedTransactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="px-6 py-4 text-sm">
                    {new Date(tx.date).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${
                      tx.type === 'debit' ? 'text-red-500' : 'text-green-600'
                    }`}>
                      {tx.type}
                    </span>
                  </td>

                  <td className="px-6 py-4">{tx.description}</td>

                  <td className="px-6 py-4 text-right font-bold">
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                  </td>

                  <td className="px-6 py-4 text-right font-bold">
                    {tx.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
