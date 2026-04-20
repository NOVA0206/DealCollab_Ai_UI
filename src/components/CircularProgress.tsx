'use client';
import React, { useEffect, useState } from 'react';
import { Coins, CheckCircle2 } from 'lucide-react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showBadge?: boolean;
}

export default function CircularProgress({ 
  percentage, 
  size = 200, 
  strokeWidth = 12,
  showBadge = true
}: CircularProgressProps) {
  const [offset, setOffset] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const progressOffset = ((100 - percentage) / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  const getStatus = (p: number) => {
    if (p === 100) return { label: 'Deal Ready', color: 'text-green-500', stroke: '#22C55E' };
    if (p >= 70) return { label: 'Almost There', color: 'text-[#F97316]', stroke: '#F97316' };
    if (p >= 40) return { label: 'Building Credibility', color: 'text-[#6B7280]', stroke: '#9CA3AF' };
    return { label: 'Getting Started', color: 'text-[#9CA3AF]', stroke: '#E5E7EB' };
  };

  const status = getStatus(percentage);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="rotate-[-90deg]" width={size} height={size}>
          <circle
            className="text-gray-100"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress Circle */}
          <circle
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 200ms ease-in-out, stroke 200ms ease-in-out'
            }}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke={status.stroke}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-[32px] font-black tracking-tighter ${status.color}`}>
            {percentage}%
          </span>
          {percentage === 100 && showBadge && (
            <div className="absolute -top-2 -right-2 animate-in zoom-in-50 duration-300">
               <div className="bg-[#F97316] text-white p-1.5 rounded-full shadow-lg">
                  <Coins size={14} />
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${status.color}`}>
          {status.label}
        </p>
        <h4 className="text-[10px] font-bold text-[#1F2937]">Professional Readiness Score</h4>
      </div>

      {percentage === 100 && (
        <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-wider animate-in slide-in-from-bottom-2 duration-300">
           <CheckCircle2 size={12} /> Verification Complete
        </div>
      )}
    </div>
  );
}
