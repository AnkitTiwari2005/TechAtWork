import React from 'react';

interface InfiniteMarqueeProps {
  items: string[];
  direction?: 'forward' | 'reverse';
  speed?: number;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  items,
  direction = 'forward',
  speed = 30,
}) => {
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: 'linear-gradient(90deg, transparent 0%, rgba(19,19,19,1) 8%, rgba(19,19,19,1) 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(19,19,19,1) 8%, rgba(19,19,19,1) 92%, transparent 100%)',
      }}
    >
      <div
        className="flex gap-2 w-max"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'running'; }}
      >
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 18px',
                borderRadius: '99px',
                border: '0.5px solid rgba(255,175,214,0.15)',
                background: 'rgba(255,175,214,0.04)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(214,193,201,0.7)',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
            {i < doubled.length - 1 && (
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'rgba(255,175,214,0.3)',
                  alignSelf: 'center',
                  flexShrink: 0,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
