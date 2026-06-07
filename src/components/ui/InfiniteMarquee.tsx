import React from 'react';

interface InfiniteMarqueeProps {
  items: string[];
  direction?: 'forward' | 'reverse';
  className?: string;
  itemClassName?: string;
  speed?: string;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items,
  direction = 'forward',
  className = '',
  itemClassName = '',
  speed = '20s',
}) => {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={`marquee-wrapper py-2 ${className}`}>
      <div
        className={direction === 'forward' ? 'marquee-track' : 'marquee-track-reverse'}
        style={{ animationDuration: speed }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-2 px-6 text-sm font-semibold uppercase tracking-widest ${itemClassName}`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: i % 3 === 0 ? '#ffafd6' : i % 3 === 1 ? '#becc9a' : '#e38cb8' }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
