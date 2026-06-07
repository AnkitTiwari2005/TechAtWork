import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'flush';
  enableAnimations?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  enableAnimations = true,
  style,
  id,
}) => {
  const baseStyle: React.CSSProperties = {
    background: variant === 'elevated' ? 'rgba(28,28,28,0.85)' : 'rgba(28,28,28,0.7)',
    backdropFilter: `blur(${variant === 'elevated' ? 24 : 20}px) saturate(${variant === 'elevated' ? 160 : 150}%)`,
    border: `0.5px solid rgba(255,175,214,${variant === 'elevated' ? 0.18 : 0.1})`,
    borderRadius: variant === 'flush' ? '20px 20px 0 0' : '20px',
    boxShadow: variant === 'elevated'
      ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,175,214,0.08)'
      : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)',
    ...(onClick ? { position: 'relative', overflow: 'hidden' } : {}),
    ...style,
  };

  if (onClick || enableAnimations) {
    return (
      <motion.div
        id={id}
        style={baseStyle}
        className={className}
        onClick={onClick}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div id={id} style={baseStyle} className={className}>
      {children}
    </div>
  );
};

export default GlassCard;
