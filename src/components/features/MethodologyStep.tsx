import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MethodologyStepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isLast?: boolean;
  index?: number;
}

const MethodologyStep: React.FC<MethodologyStepProps> = ({
  number,
  title,
  description,
  icon,
  color,
  isLast = false,
  index = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex gap-4">
      {/* Left: Icon + Connector Line */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Upgrade J: pulsing ring behind icon */}
        <div style={{ position: 'relative' }}>
          {/* Pulsing ring */}
          <motion.div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              border: `1px solid ${color}`,
              opacity: 0,
            }}
            animate={isInView ? {
              opacity: [0, 0.4, 0],
              scale: [0.9, 1.3, 0.9],
            } : {}}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.4,
            }}
          />
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border"
            style={{
              background: `${color}15`,
              borderColor: `${color}40`,
              color,
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'scale(1)' : 'scale(0.5)',
              transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span style={{ display: 'flex', color }}>{icon}</span>
          </div>
        </div>

        {/* Upgrade J: animated fill connector line */}
        {!isLast && (
          <div style={{ width: '2px', marginTop: '6px', flex: 1, minHeight: '40px', background: 'rgba(255,175,214,0.08)', overflow: 'hidden', borderRadius: '1px' }}>
            <motion.div
              style={{ width: '100%', background: `linear-gradient(to bottom, ${color}60, transparent)` }}
              initial={{ height: '0%' }}
              animate={isInView ? { height: '100%' } : { height: '0%' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 + index * 0.1 }}
            />
          </div>
        )}
      </div>

      {/* Right: Content */}
      <div
        className="pb-8 flex-1"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateX(0)' : 'translateX(20px)',
          transition: 'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }}
      >
        <div
          className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color }}
        >
          {number}
        </div>
        <h4 className="text-lg font-headline font-bold text-white mb-2">{title}</h4>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.7)' }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default MethodologyStep;
