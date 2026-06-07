import React from 'react';
import { motion } from 'framer-motion';

interface TrustPillProps {
  icon: React.ReactNode;
  label: string;
  index?: number;
}

const TrustPill: React.FC<TrustPillProps> = ({ icon, label, index = 0 }) => {
  return (
    <motion.div
      className="trust-pill"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '99px',
        background: 'rgba(255,175,214,0.06)',
        border: '0.5px solid rgba(255,175,214,0.18)',
        fontSize: '12px',
        fontWeight: 600,
        color: 'rgba(214,193,201,0.85)',
        whiteSpace: 'nowrap',
        transition: 'border-color 0.2s ease',
        cursor: 'default',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', color: '#ffafd6' }}>{icon}</span>
      {label}
    </motion.div>
  );
};

export default TrustPill;
