import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

interface ServiceCardProps {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  features: string[];
  ctaText?: string;
  onCta?: () => void;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  iconBg,
  title,
  description,
  features,
  ctaText = 'Explore Solution →',
  onCta,
  index = 0,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <GlassCard className="p-5 overflow-hidden" hoverable>
        <button
          id={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="w-full text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: iconBg }}
            >
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-headline font-bold text-white mb-1">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(214,193,201,0.7)' }}>
                {description}
              </p>
            </div>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-primary flex-shrink-0 mt-1"
              style={{ color: '#ffafd6' }}
            >
              ▾
            </motion.span>
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pt-4 mt-4 border-t" style={{ borderColor: 'rgba(81,67,73,0.2)' }}>
                <ul className="flex flex-col gap-2 mb-4">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#ffafd6' }} />
                      <span style={{ color: 'rgba(226,226,226,0.85)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  id={`service-cta-${title.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={onCta}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'rgba(255,175,214,0.12)',
                    color: '#ffafd6',
                    border: '1px solid rgba(255,175,214,0.25)',
                  }}
                >
                  {ctaText}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
};

export default ServiceCard;
