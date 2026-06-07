import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue, useTransform } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, children }) => {
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const dragStartY = useRef(0);

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
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
            style={{
              background: 'rgba(22,22,22,0.98)',
              backdropFilter: 'blur(24px)',
              border: '0.5px solid rgba(255,175,214,0.15)',
              borderBottom: 'none',
              maxHeight: '88vh',
              y,
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 400) {
                onClose();
              } else {
                y.set(0);
              }
            }}
          >
            {/* Handle */}
            <div
              className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div
                className="w-10 h-1 rounded-full"
                style={{ background: 'rgba(255,175,214,0.3)' }}
              />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 pb-3">
                <h3 className="text-lg font-headline font-bold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,175,214,0.1)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(214,193,201,0.8)" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}

            {/* Content */}
            <div className="px-6 pb-10 overflow-y-auto" style={{ maxHeight: 'calc(88vh - 80px)' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
