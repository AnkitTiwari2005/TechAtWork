import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number; // ms between words
  direction?: 'top' | 'bottom';
  as?: React.ElementType;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delay = 100,
  direction = 'bottom',
  as: Tag = 'h2',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !triggered) setTriggered(true);
  }, [isInView, triggered]);

  const words = text.split(' ');
  const yStart = direction === 'bottom' ? '20px' : '-20px';

  return (
    <div ref={ref}>
      <Tag
        className={className}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', lineHeight: 1.1 }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: triggered ? 1 : 0,
              filter: triggered ? 'blur(0px)' : 'blur(8px)',
              transform: triggered ? 'translateY(0)' : `translateY(${yStart})`,
              transition: `opacity 0.6s ease ${i * delay}ms, filter 0.6s ease ${i * delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * delay}ms`,
            }}
          >
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
};

export default BlurText;

