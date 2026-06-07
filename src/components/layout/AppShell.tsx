import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from './BottomNav';
import GrainOverlay from '../ui/GrainOverlay';
import { WifiOffIcon } from '../ui/Icon';
import { useAppStore } from '../../store/useAppStore';

const AppShell: React.FC = () => {
  const { setKeyboardOpen, isOffline } = useAppStore();

  useEffect(() => {
    // Detect keyboard open/close via visual viewport
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        setKeyboardOpen(windowHeight - viewportHeight > 150);
      }
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    return () => window.visualViewport?.removeEventListener('resize', handleResize);
  }, [setKeyboardOpen]);

  return (
    <div style={{ background: '#131313', minHeight: '100dvh', position: 'relative' }}>
      {/* Offline banner — slides down from y:-36 when connection is lost */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            key="offline-banner"
            initial={{ y: -36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -36, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '36px',
              background: 'rgba(255,80,80,0.9)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              zIndex: 100,
              fontSize: '12px',
              fontWeight: 600,
              color: 'white',
            }}
          >
            <WifiOffIcon size={14} />
            No connection — some features may be unavailable
          </motion.div>
        )}
      </AnimatePresence>

      <GrainOverlay />
      <main className="screen-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppShell;
