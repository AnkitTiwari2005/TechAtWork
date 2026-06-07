import React from 'react';
import { motion } from 'framer-motion';

interface FilterChipsProps {
  chips: string[];
  active: string;
  onChange: (chip: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ chips, active, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
      {chips.map((chip) => (
        <motion.button
          key={chip}
          id={`filter-chip-${chip.toLowerCase().replace(/\s+/g, '-')}`}
          className={`filter-chip no-select flex-shrink-0 ${active === chip ? 'active' : ''}`}
          onClick={() => onChange(chip)}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {chip}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterChips;
