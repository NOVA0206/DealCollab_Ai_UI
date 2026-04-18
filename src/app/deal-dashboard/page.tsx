'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardRow, { DashboardDeal } from '@/components/DashboardRow';
import { Skeleton } from '@/components/Skeleton';

// Mock API simulation with expanded data
const fetchDashboardData = async (): Promise<DashboardDeal[]> => {
  await new Promise(resolve => setTimeout(resolve, 0));
  return [
    { 
        id: 1, 
        deal: "Startup Funding Round", 
        dealDesc: "Series A funding looking for strategic investors in the fintech space.",
        match: "Ventura Capital A", 
        matchDesc: "Leading early-stage fintech investor with a focus on disruptive payment solutions.",
        status: "Send EOI" 
    },
    { 
        id: 2, 
        deal: "Infrastructure Merger", 
        dealDesc: "Seeking expansion partner for major regional railway project.",
        match: "BuildCorp Infrastructure", 
        matchDesc: "Established civil engineering firm specializing in large-scale transit networks.",
        status: "Waiting for Approval" 
    },
    { 
        id: 3, 
        deal: "SaaS Enterprise Expansion", 
        dealDesc: "Enterprise software provider looking for European distribution channel.",
        match: "EuroCloud Distribution", 
        matchDesc: "Top-tier IT distributor with extensive network across DACH and BENELUX regions.",
        status: "Connected" 
    },
  ];
};

export default function DealDashboardPage() {
  const [data, setData] = useState<DashboardDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full h-full relative overflow-y-auto bg-white p-6 sm:p-10">
      
      {/* Top Bar Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Deal Dashboard</h1>
          <p className="text-brand-secondary text-sm font-medium mt-1">Intelligent matchmaking and engagement tracking</p>
        </div>
        
        {/* Profile spacing (handled by Layout absolute) */}
        <div className="w-12 h-12" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        
        {loading ? (
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="w-full h-40 rounded-2xl" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-brand-card border border-dashed border-brand-border rounded-2xl">
            <p className="text-brand-secondary font-medium">No matched deals found yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {data.map(item => (
              <DashboardRow key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* View More Button */}
        {!loading && (
          <div className="mt-12 flex justify-center pb-10">
            <Link 
              href="/deal-log"
              className="w-full py-4 flex items-center justify-center bg-gray-50 border border-brand-border rounded-xl text-brand-secondary text-sm font-bold hover:bg-gray-100 hover:text-foreground transition-all duration-300 shadow-sm"
            >
              View More Deals
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
