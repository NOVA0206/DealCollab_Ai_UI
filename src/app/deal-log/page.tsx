'use client';
import React, { useState, useEffect } from 'react';
import DealRow, { Deal } from '@/components/DealRow';
import { DealLogSkeleton } from '@/components/Skeleton';

// Mock API simulation
const fetchDeals = async (): Promise<Deal[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 0));
  return [
    { id: 1, name: "Strategic Tech Acquisition v2", status: "Searching Match" },
    { id: 2, name: "Renewable Energy Infrastructure Bond", status: "Matched" },
    { id: 3, name: "Global Logistics Expansion Proposal", status: "Searching Match" },
    { id: 4, name: "Healthcare AI Seed Round", status: "Matched" },
    { id: 5, name: "Consumer Goods Distribution Merger", status: "Searching Match" },
  ];
};

export default function DealLogPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDeals();
        setDeals(data);
      } catch (error) {
        console.error("Failed to fetch deals:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleDelete = (id: number) => {
    setDeals(prev => prev.filter(deal => deal.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full relative overflow-y-auto bg-white p-6 sm:p-10">
      
      {/* Top Bar Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937] tracking-tight">Deal Log</h1>
          <p className="text-[#6B7280] text-sm font-medium mt-1">Real-time status of your active proposals</p>
        </div>
        
        <div className="w-10 h-10" />
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 px-4 mb-4 text-xs font-bold text-[#6B7280] uppercase tracking-widest">
          <div className="col-span-6 sm:col-span-8">Proposed Deals</div>
          <div className="col-span-4 sm:col-span-3 text-center">Status</div>
          <div className="col-span-2 sm:col-span-1 text-right">Actions</div>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="flex flex-col gap-4">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="animate-pulse bg-gray-100 h-16 w-full rounded-lg border border-gray-200" />
             ))}
          </div>
        ) : deals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#F9FAFB] border border-dashed border-[#E5E7EB] rounded-xl">
             <p className="text-[#6B7280] font-medium">No deals found in the database.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {deals.map(deal => (
              <DealRow 
                key={deal.id} 
                deal={deal} 
                onDelete={() => handleDelete(deal.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="h-20 shrink-0" />
    </div>
  );
}
