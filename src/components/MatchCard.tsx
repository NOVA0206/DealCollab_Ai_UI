import React from 'react';

interface MatchCardProps {
  entity: string;
  description: string;
}

export default function MatchCard({ entity, description }: MatchCardProps) {
  return (
    <div className="flex-1 bg-white border border-brand-border rounded-lg p-4 shadow-sm hover:border-brand-accent/20 transition-all">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider bg-brand-accent-glow px-1.5 py-0.5 rounded">AI Match</span>
        <h3 className="text-[15px] font-bold text-foreground">{entity}</h3>
      </div>
      <p className="text-xs text-brand-secondary line-clamp-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
