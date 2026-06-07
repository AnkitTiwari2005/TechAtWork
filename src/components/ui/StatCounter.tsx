import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: string;
  color?: string;
  duration?: number;
  isStatic?: boolean;
  staticValue?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  label,
  icon,
  color = '#ffafd6',
  duration = 2000,
  isStatic = false,
  staticValue = '',
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && !started && !isStatic) {
      setStarted(true);
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(target);
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, started, target, duration, isStatic]);

  return (
    <div ref={ref} className="glass-card p-4 flex flex-col gap-2">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        {icon}
      </div>
      <div
        className="text-3xl font-headline font-black tracking-tighter"
        style={{ color, lineHeight: 1 }}
      >
        {isStatic ? staticValue : `${prefix}${count}${suffix}`}
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant opacity-70">
        {label}
      </div>
    </div>
  );
};

export default StatCounter;
