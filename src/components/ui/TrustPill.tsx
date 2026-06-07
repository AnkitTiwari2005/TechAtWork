import React from 'react';

interface TrustPillProps {
  icon: string;
  label: string;
}

const TrustPill: React.FC<TrustPillProps> = ({ icon, label }) => {
  return (
    <span className="trust-pill no-select">
      <span style={{ fontSize: '14px' }}>{icon}</span>
      {label}
    </span>
  );
};

export default TrustPill;
