import React from 'react';

export interface AdSlotProps {
  position: 'header' | 'content' | 'result';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  return (
    <div
      data-ad-position={position}
      className={`w-full my-4 py-2.5 px-4 bg-slate-100/60 border border-slate-200/80 rounded-xl text-center ${className}`}
    >
      <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
        Advertisement
      </span>
    </div>
  );
}
