import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassCard from './GlassCard';

interface StatCounterProps {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  color?: string;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({
  target,
  suffix = '',
  label,
  icon,
  color = '#ffafd6',
  duration = 1800,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const end = start + duration;
    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (now < end) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <GlassCard className="p-4 flex flex-col gap-2">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        ref={ref}
      >
        <span style={{ color, display: 'flex' }}>{icon}</span>
      </div>
      <div
        className="text-3xl font-headline font-black stat-value"
        style={{ color, lineHeight: 1 }}
      >
        {count}{suffix}
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(214,193,201,0.6)' }}>
        {label}
      </div>
    </GlassCard>
  );
};

export default StatCounter;
