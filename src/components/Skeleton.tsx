import React from 'react';
import { LayoutGrid, AlertCircle, RefreshCw, PlusCircle, Inbox } from 'lucide-react';
import Link from 'next/link';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  );
}

export function SidebarSkeleton() {
  return (
    <div className="w-[240px] h-screen bg-[#F3F4F6] border-r border-[#E5E7EB] py-6 px-3 flex flex-col gap-8">
      <div className="flex items-center gap-3 px-3">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <Skeleton className="w-24 h-4" />
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="w-full h-10 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex-1 flex flex-col h-full w-full max-w-4xl mx-auto px-10 animate-in fade-in duration-500">
      <div className="w-full pt-8 pb-6 mb-8 border-b border-gray-100 flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-48 h-8 rounded-xl" />
          <Skeleton className="w-32 h-4 rounded-lg" />
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex flex-col items-center py-12 gap-4">
          <Skeleton className="w-16 h-16 rounded-[24px]" />
          <Skeleton className="w-56 h-6 rounded-xl" />
          <Skeleton className="w-48 h-4 rounded-lg" />
        </div>
        <div className="flex justify-end gap-3">
          <Skeleton className="w-2/3 h-12 rounded-3xl rounded-tr-sm shadow-sm" />
          <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
          <Skeleton className="w-3/4 h-32 rounded-3xl rounded-tl-sm shadow-sm" />
        </div>
      </div>
    </div>
  );
}

export function DealLogSkeleton() {
  return (
    <div className="flex-1 flex flex-col w-full h-full max-w-5xl mx-auto px-10 py-10">
      <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-40 h-8" />
          <Skeleton className="w-56 h-4" />
        </div>
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className="w-full h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {[1, 2, 3].map(i => (
        <div key={i} className="w-full h-44 bg-white border border-gray-100 rounded-[32px] p-8 flex flex-col gap-4 shadow-sm animate-pulse">
          <div className="flex justify-between items-start">
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl" />
                <div className="flex flex-col gap-2">
                   <div className="w-48 h-4 bg-gray-100 rounded-lg" />
                   <div className="w-64 h-3 bg-gray-100 rounded-lg" />
                </div>
             </div>
             <div className="w-24 h-8 bg-gray-100 rounded-xl" />
          </div>
          <div className="w-full h-0.5 bg-gray-50 mt-2" />
          <div className="flex gap-4 items-center">
             <div className="w-8 h-8 bg-gray-100 rounded-full" />
             <div className="w-40 h-3 bg-gray-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NotificationSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="w-full h-24 bg-white border border-gray-100 rounded-2xl p-6 flex gap-4 items-center shadow-sm animate-pulse">
           <div className="w-10 h-10 bg-gray-100 rounded-full" />
           <div className="flex-1 flex flex-col gap-2">
              <div className="w-full h-3 bg-gray-100 rounded-lg" />
              <div className="w-1/2 h-2 bg-gray-100 rounded-lg" />
           </div>
        </div>
      ))}
    </div>
  );
}

export function DealDetailSkeleton() {
  return (
    <div className="flex-1 flex flex-col p-6 sm:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:col-span-8 flex-1 space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-3">
               <Skeleton className="w-64 h-8 rounded-xl" />
               <Skeleton className="w-32 h-4 rounded-lg" />
            </div>
            <div className="space-y-4 pt-6 border-t border-gray-50">
               <Skeleton className="w-full h-4 rounded-lg" />
               <Skeleton className="w-full h-4 rounded-lg" />
               <Skeleton className="w-3/4 h-4 rounded-lg" />
            </div>
          </div>
          <div className="space-y-6">
             <Skeleton className="ml-4 w-32 h-4 rounded-lg" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                  <Skeleton key={i} className="h-44 rounded-[32px]" />
                ))}
             </div>
          </div>
        </div>
        <div className="w-full lg:w-[350px] space-y-6">
           <Skeleton className="h-[400px] rounded-[40px]" />
           <Skeleton className="h-[200px] rounded-[40px]" />
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-300 mb-6 shadow-inner">
        {icon || <Inbox size={32} />}
      </div>
      <h3 className="text-xl font-bold text-[#1F2937] tracking-tight">{title}</h3>
      <p className="text-sm font-medium text-gray-400 mt-2 max-w-sm leading-relaxed">{description}</p>
      {actionLabel && (
        <button 
           onClick={onAction}
           className="mt-8 flex items-center gap-2 bg-[#1F2937] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-[#F97316] transition-all shadow-lg hover:shadow-[#F97316]/20 group"
        >
          <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-red-50/30 rounded-[40px] border border-red-50">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-xl font-bold text-[#1F2937]">Something went wrong</h3>
      <p className="text-sm font-medium text-red-600/60 mt-2 max-w-xs">We couldn't load the information at this time. Please try again.</p>
      <button 
         onClick={onRetry}
         className="mt-8 flex items-center gap-2 bg-white border border-red-100 text-[#1F2937] px-8 py-3.5 rounded-2xl font-bold hover:bg-red-50 transition-all shadow-sm"
      >
        <RefreshCw size={18} />
        Retry Loading
      </button>
    </div>
  );
}
