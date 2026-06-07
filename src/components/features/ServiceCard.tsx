import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { ChevronDownIcon, CheckCircleIcon } from '../ui/Icon';

interface ServiceCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  index?: number;
  onCta?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  iconBg = 'rgba(255,175,214,0.1)',
  title,
  subtitle,
  description,
  features,
  index = 0,
  onCta,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Back button closes accordion
  useEffect(() => {
    if (!expanded) return;
    let handler: any;
    const register = async () => {
      try {
        const { App } = await import('@capacitor/app');
        handler = await App.addListener('backButton', () => setExpanded(false));
      } catch { }
    };
    register();
    return () => { if (handler) handler.remove(); };
  }, [expanded]);

  const numStr = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileTap={{ scale: 0.99 }}
    >
      <GlassCard className="overflow-hidden">
        {/* Card Header */}
        <div
          className="relative p-5 flex items-start gap-4 cursor-pointer select-none"
          onClick={() => setExpanded(!expanded)}
        >
          {/* Faint number badge */}
          <div
            className="absolute top-3 right-4 font-headline font-black select-none pointer-events-none"
            style={{ fontSize: '52px', lineHeight: 1, color: 'rgba(255,175,214,0.05)', letterSpacing: '-2px' }}
          >
            {numStr}
          </div>

          {/* Icon */}
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10"
            style={{ background: iconBg, border: '0.5px solid rgba(255,175,214,0.15)' }}
          >
            {icon}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#ffafd6' }}>
              {subtitle}
            </p>
            <h3 className="text-base font-headline font-bold text-white leading-tight">{title}</h3>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(214,193,201,0.65)' }}>
              {description}
            </p>
          </div>

          {/* Chevron */}
          <motion.div
            className="flex-shrink-0 mt-1 relative z-10"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <ChevronDownIcon size={18} color="rgba(214,193,201,0.5)" />
          </motion.div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-5 pb-5">
                <div
                  className="w-full h-px mb-4"
                  style={{ background: 'linear-gradient(90deg, rgba(255,175,214,0.15), transparent)' }}
                />
                <div className="flex flex-col gap-2.5 mb-4">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircleIcon size={14} color="#ffafd6" />
                      <span className="text-sm" style={{ color: 'rgba(214,193,201,0.85)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <motion.button
                  id={`service-cta-${index}`}
                  onClick={(e) => { e.stopPropagation(); onCta?.(); }}
                  className="text-xs font-semibold flex items-center gap-1.5 px-4 py-2 rounded-xl"
                  style={{ background: 'rgba(255,175,214,0.1)', color: '#ffafd6', border: '0.5px solid rgba(255,175,214,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Solution
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
};

export default ServiceCard;
