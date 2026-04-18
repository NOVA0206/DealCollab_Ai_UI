import React from 'react';

interface DealCardProps {
  title: string;
  description: string;
}

export default function DealCard({ title, description }: DealCardProps) {
  return (
    <div className="flex-1 bg-white border border-brand-border rounded-lg p-4 shadow-sm hover:border-brand-accent/20 transition-all">
      <h3 className="text-[15px] font-bold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-brand-secondary line-clamp-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
