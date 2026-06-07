import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

interface MethodologyStepProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isLast?: boolean;
}

const MethodologyStep: React.FC<MethodologyStepProps> = ({
  number,
  title,
  description,
  icon,
  color,
  isLast = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="flex gap-4">
      {/* Left: Number + Connector Line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-headline font-black flex-shrink-0 border"
          style={{
            background: `${color}15`,
            borderColor: `${color}40`,
            color,
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'scale(1)' : 'scale(0.5)',
            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {icon}
        </div>
        {!isLast && (
          <div
            className="w-0.5 mt-2 flex-1 min-h-[40px]"
            style={{
              background: `linear-gradient(to bottom, ${color}60, transparent)`,
              opacity: isInView ? 1 : 0,
              transition: 'opacity 0.5s ease 0.3s',
            }}
          />
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
