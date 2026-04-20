'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/components/UserProvider';
import { useNotifications } from '@/components/NotificationProvider';
import { 
  ArrowLeft, Briefcase, Target, ShieldCheck, 
  Lock, Zap, CheckCircle2, XCircle, Clock,
  MessageSquare, ExternalLink, Sparkles, AlertCircle
} from 'lucide-react';
import StatusBadge, { DealStatus } from '@/components/StatusBadge';

type EOIStatus = 'Awaiting Approval' | 'Approved' | 'Declined' | 'Expired';

interface EOIDetail {
  id: string;
  status: EOIStatus;
  sentAt: string;
  matchScore: number;
  myDeal: {
    title: string;
    type: string;
    budget: string;
  };
  matchedDeal: {
    title: string;
    type: string;
    valuation: string;
    location: string;
  };
}

const mockEOIs: Record<string, EOIDetail> = {
  "1": {
    id: "1",
    status: "Awaiting Approval",
    sentAt: "2 days ago",
    matchScore: 92,
    myDeal: {
      title: "Series A Tech Expansion",
      type: "Fundraising",
      budget: "$5M - $10M"
    },
    matchedDeal: {
      title: "Global Growth Equity",
      type: "Investor",
      valuation: "$500M AUM",
      location: "San Francisco, CA"
    }
  },
  "2": {
    id: "2",
    status: "Approved",
    sentAt: "1 week ago",
    matchScore: 88,
    myDeal: {
      title: "SaaS Infrastructure Sell-side",
      type: "Acquisition",
      budget: "$15M valuation"
    },
    matchedDeal: {
      title: "CloudCorp Partners",
      type: "Strategic Buyer",
      valuation: "Publicly Traded",
      location: "London, UK"
    }
  }
};

export default function EOIDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const id = params.id as string;
  
  const [eoi, setEoi] = useState<EOIDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setEoi(mockEOIs[id] || mockEOIs["1"]);
      setLoading(false);
    }, 600);
  }, [id]);

  const handleWithdraw = () => {
    setIsProcessing(true);
    setTimeout(() => {
      addNotification({
        type: 'error',
        message: 'Expression of Interest withdrawn.',
        time: 'Just now'
      });
      setIsProcessing(false);
      router.push('/deal-dashboard');
    }, 1500);
  };

  const handleConnect = () => {
    router.push('/deal-dashboard'); // Or direct to chat
  };

  if (loading) return (
     <div className="flex-1 p-10 max-w-6xl mx-auto w-full space-y-8 animate-pulse">
        <div className="w-48 h-8 bg-gray-100 rounded-xl" />
        <div className="grid grid-cols-2 gap-8">
           <div className="h-64 bg-gray-50 rounded-[40px]" />
           <div className="h-64 bg-gray-50 rounded-[40px]" />
        </div>
     </div>
  );

  if (!eoi) return null;

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-[#F9FAFB] relative overflow-y-auto">
      
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 sm:px-10 py-5 flex items-center gap-4">
         <button 
           onClick={() => router.push('/deal-dashboard')}
           className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-400 hover:text-[#1F2937]"
         >
           <ArrowLeft size={20} />
         </button>
         <h1 className="text-xl font-bold text-[#1F2937] tracking-tight">EOI Tracking</h1>
         <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Ref: EOI-{eoi.id}</span>
         </div>
      </div>

      <div className="p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-10">
        
        {/* STATUS HUD */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center ${
                 eoi.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                 eoi.status === 'Declined' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
              }`}>
                 {eoi.status === 'Approved' ? <CheckCircle2 size={32} /> : 
                  eoi.status === 'Declined' ? <XCircle size={32} /> : <Clock size={32} />}
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6B7280] mb-1">Interaction Status</p>
                 <h2 className="text-2xl font-bold text-[#1F2937]">{eoi.status}</h2>
                 <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">Sent {eoi.sentAt}</p>
              </div>
           </div>

           <div className="flex items-center gap-3 w-full md:w-auto">
              {eoi.status === 'Awaiting Approval' && (
                 <button 
                  onClick={handleWithdraw}
                  disabled={isProcessing}
                  className="w-full md:w-auto px-8 py-3.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                 >
                    {isProcessing ? 'Processing...' : 'Withdraw EOI'}
                 </button>
              )}
              {eoi.status === 'Approved' && (
                 <button 
                  onClick={handleConnect}
                  className="w-full md:w-auto px-8 py-3.5 bg-[#1F2937] text-white rounded-2xl text-xs font-bold hover:bg-[#F97316] transition-all flex items-center justify-center gap-2 shadow-lg"
                 >
                    <MessageSquare size={16} />
                    Enter Negotiation Chat
                 </button>
              )}
           </div>
        </div>

        {/* COMPARISON SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-center">
           
           <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full border border-gray-100 shadow-xl items-center justify-center text-[#F97316]">
              <Zap size={20} fill="currentColor" />
           </div>

           {/* YOUR DEAL */}
           <div className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-[40px] transition-all group-hover:bg-blue-500/10" />
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                 <Briefcase size={24} />
              </div>
              <div className="space-y-1">
                 <h3 className="text-xl font-bold text-[#1F2937] tracking-tight">{eoi.myDeal.title}</h3>
                 <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{eoi.myDeal.type}</p>
              </div>
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                 <span className="text-xs font-bold text-gray-400">Budget Range</span>
                 <span className="text-sm font-black text-[#1F2937]">{eoi.myDeal.budget}</span>
              </div>
           </div>

           {/* COUNTERPARTY */}
           <div className="bg-[#1F2937] p-8 sm:p-10 rounded-[40px] shadow-2xl space-y-6 relative overflow-hidden text-white group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[40px]" />
              <div className="relative z-10 space-y-6">
                 <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-[#F97316] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#F97316]/20">
                       <Target size={24} />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                       <Sparkles size={12} className="text-[#F97316]" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#F97316]">92% Match</span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{eoi.matchedDeal.title}</h3>
                    <p className="text-xs font-black text-[#F97316] uppercase tracking-widest">{eoi.matchedDeal.type}</p>
                 </div>
                 <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-white/40">Valuation Context</span>
                    <span className="text-sm font-black text-white">{eoi.matchedDeal.valuation}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* SECURITY WARNING */}
        <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 flex flex-col md:flex-row items-center gap-6 justify-center">
           <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-300">
              <Lock size={28} />
           </div>
           <div className="text-center md:text-left max-w-xl">
              <h4 className="text-sm font-black text-[#1F2937] uppercase tracking-tight mb-1">Identity Security Active</h4>
              <p className="text-xs font-medium text-gray-400 leading-relaxed">
                 {eoi.status === 'Approved' 
                    ? "Identity has been shared with the counterparty. Professional collaboration is now enabled."
                    : "The counterparty's identity and firm details will only be revealed once they review and approve this Expression of Interest."
                 }
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}
