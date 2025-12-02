'use client';

import { useEffect, useState } from "react";

interface CardStatProps {
  icon: React.ReactNode; // Aceita ícones como componentes
  finalValue: number;
  text: string;
  suffix?: string;
}

export default function CardStat({ icon, finalValue, text, suffix = "" }: CardStatProps) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = finalValue / (duration / 20);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        setCurrentValue(finalValue);
        clearInterval(timer);
      } else {
        setCurrentValue(start);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [finalValue]);

  return (
    <div className="bg-brand-surface/60 backdrop-blur-md border border-brand-green/30 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(29,229,109,0.15)] hover:border-brand-green/60 transition-all duration-300 h-full flex flex-col items-center justify-center group">
      <div className="text-brand-green mb-4 p-4 bg-brand-green/10 rounded-full group-hover:bg-brand-green/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-5xl font-extrabold text-white mb-2 leading-tight font-mono">
        {Math.floor(currentValue)}{suffix}
      </h3>
      <p className="text-gray-400 font-medium text-sm uppercase tracking-wider">{text}</p>
    </div>
  );
}