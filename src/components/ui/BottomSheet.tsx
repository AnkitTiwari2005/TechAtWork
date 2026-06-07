import React, { useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, subtitle, children }) => {
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const { setSheetOpen } = useAppStore();

  // Bug 3 fix: sync isSheetOpen in store so global back handler stands down
  useEffect(() => {
    setSheetOpen(isOpen);
  }, [isOpen, setSheetOpen]);

  // Consolidated scroll lock
  useEffect(() => {
    const scrollable = document.querySelector('.screen-content') as HTMLElement | null;
    if (isOpen) {
      if (scrollable) scrollable.style.overflowY = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (scrollable) scrollable.style.overflowY = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Capacitor back button
  useEffect(() => {
    if (!isOpen) return;
    let handler: any;
    const registerHandler = async () => {
      try {
        const { App } = await import('@capacitor/app');
        handler = await App.addListener('backButton', () => {
          onClose();
        });
      } catch { /* web fallback */ }
    };
    registerHandler();
    return () => {
      if (handler) handler.remove();
    };
  }, [isOpen, onClose]);

  // Reset drag position when opened
  useEffect(() => {
    if (isOpen) y.set(0);
  }, [isOpen, y]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet — Bug 2 Part C: NO drag on the outer sheet div */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl"
            style={{
              background: 'linear-gradient(180deg, rgba(28,22,26,0.99) 0%, rgba(19,19,19,0.99) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '0.5px solid rgba(255,175,214,0.15)',
              borderBottom: 'none',
              maxHeight: '88vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
          >
            {/* Upgrade C: Neon top glow edge */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,175,214,0.4) 50%, transparent 100%)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            {/* Bug 2 Part C: drag ONLY on the handle bar */}
            <motion.div
              drag="y"
              dragControls={dragControls}
              dragConstraints={{ top: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  onClose();
                } else {
                  y.set(0);
                }
              }}
              className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing flex-shrink-0"
              style={{ touchAction: 'none' }}
            >
              {/* Upgrade C: animated handle bar */}
              <motion.div
                style={{
                  height: '4px',
                  borderRadius: '99px',
                  background: 'rgba(255,175,214,0.3)',
                }}
                animate={{ width: ['36px', '28px', '36px'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Upgrade C: Header with subtitle badge */}
            {title && (
              <div className="flex items-center justify-between px-6 pb-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      fontFamily: '"Space Grotesk", sans-serif',
                      color: '#fff',
                      margin: 0,
                    }}
                  >
                    {title}
                  </h3>
                  {subtitle && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#ffafd6',
                        background: 'rgba(255,175,214,0.1)',
                        border: '0.5px solid rgba(255,175,214,0.2)',
                        borderRadius: '6px',
                        padding: '2px 8px',
                      }}
                    >
                      {subtitle}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,175,214,0.08)', border: '0.5px solid rgba(255,175,214,0.15)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(214,193,201,0.8)" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}

            {/* Content area — outer sheet already has maxHeight: 88vh */}
            <div
              className="px-6 pb-10 flex-1"
              style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
