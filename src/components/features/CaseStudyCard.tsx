import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '../ui/Icon';

interface CaseStudyCardProps {
  image: string;
  company: string;
  category: string;
  tagColor: string;
  description: string;
  stats: Array<{ value: string; label: string }>;
  tags: string[];
  onClick: () => void;
  onShare?: () => void;
  index?: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  image,
  company,
  category,
  tagColor,
  description,
  stats,
  tags,
  onClick,
  onShare,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, borderColor: 'rgba(255,175,214,0.05)' }}
      whileInView={{ opacity: 1, y: 0, borderColor: 'rgba(255,175,214,0.2)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: 'rgba(28,28,28,0.7)',
        backdropFilter: 'blur(20px) saturate(150%)',
        border: '0.5px solid rgba(255,175,214,0.05)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)',
      }}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image — 200px tall */}
      <div className="relative" style={{ height: '200px', overflow: 'hidden' }}>
        <img
          src={image}
          alt={`${company} case study`}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.9) contrast(1.05) saturate(0.95)' }}
        />
        {/* Base gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, rgba(19,19,19,0.95) 100%)',
          }}
        />
        {/* Colored tint overlay matching tagColor */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom right, ${tagColor}15 0%, transparent 60%)`,
          }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: tagColor, color: '#131313' }}
          >
            {category}
          </span>
        </div>
        {/* Share button */}
        {onShare && (
          <button
            id={`share-${company.toLowerCase()}`}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(19,19,19,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => { e.stopPropagation(); onShare(); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </button>
        )}
        {/* Company name overlaid */}
        <div className="absolute bottom-3 left-4">
          <h3 className="text-xl font-headline font-black text-white tracking-tight">{company}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(214,193,201,0.75)' }}>
          {description}
        </p>

        {/* Stats */}
        <div className="flex gap-3 mb-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 text-center py-2.5 rounded-xl" style={{ background: 'rgba(255,175,214,0.06)' }}>
              <div className="text-lg font-headline font-black text-gradient-static">{stat.value}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(214,193,201,0.6)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md"
              style={{ background: 'rgba(81,67,73,0.4)', color: 'rgba(214,193,201,0.7)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Upgrade B: pill CTA button */}
        <motion.div
          className="inline-flex items-center gap-1.5 text-xs font-semibold"
          style={{
            background: 'rgba(255,175,214,0.06)',
            border: '0.5px solid rgba(255,175,214,0.2)',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#ffafd6',
          }}
          whileTap={{ scale: 0.96 }}
        >
          Read full case study
          <ArrowRightIcon size={12} color="#ffafd6" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
