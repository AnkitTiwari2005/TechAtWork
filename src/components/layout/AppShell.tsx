import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import GrainOverlay from '../ui/GrainOverlay';
import { useAppStore } from '../../store/useAppStore';

const AppShell: React.FC = () => {
  const { setKeyboardOpen } = useAppStore();

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
      <GrainOverlay />
      <main className="screen-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppShell;
