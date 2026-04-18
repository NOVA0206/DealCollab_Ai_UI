import React from 'react';

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
    <div className="flex-1 flex flex-col h-full w-full max-w-4xl mx-auto px-10">
      <div className="w-full pt-8 pb-6 mb-8 border-b border-gray-100 flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-48 h-8" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
      <div className="space-y-8">
        <div className="flex flex-col items-center py-12 gap-4">
          <Skeleton className="w-16 h-16 rounded-2xl" />
          <Skeleton className="w-56 h-6" />
          <Skeleton className="w-48 h-4" />
        </div>
        <div className="flex justify-end gap-3">
          <Skeleton className="w-2/3 h-12 rounded-2xl rounded-tr-sm" />
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-3/4 h-32 rounded-2xl rounded-tl-sm" />
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
        <div className="grid grid-cols-12 px-4 gap-4">
          <Skeleton className="col-span-8 h-3" />
          <Skeleton className="col-span-3 h-3" />
          <Skeleton className="col-span-1 h-3" />
        </div>
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className="w-full h-16 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
