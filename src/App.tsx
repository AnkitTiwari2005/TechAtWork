import { useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import CaseStudiesScreen from './screens/CaseStudiesScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { useAppStore } from './store/useAppStore';

// Premium page transition — scale + opacity instead of basic slide
const pageVariants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 25, duration: 0.35 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

// Global back button handler (only fires if no sheet is open)
function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSheetOpen } = useAppStore();

  const handleBack = useCallback(() => {
    if (isSheetOpen) return; // sheets handle their own back button
    if (location.pathname !== '/home' && location.pathname !== '/') {
      navigate(-1);
    }
  }, [navigate, location, isSheetOpen]);

  useEffect(() => {
    let handler: any;
    const register = async () => {
      try {
        const { App } = await import('@capacitor/app');
        handler = await App.addListener('backButton', handleBack);
      } catch { /* web environment */ }
    };
    register();
    return () => { if (handler) handler.remove(); };
  }, [handleBack]);

  return null;
}

function AppContent() {
  const { loadLeads } = useAppStore();

  useEffect(() => {
    loadLeads();

    // Set status bar color on Android
    const setStatusBar = async () => {
      try {
        const { StatusBar, Style } = await import('@capacitor/status-bar');
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#131313' });
      } catch { /* web environment */ }
    };

    setStatusBar();
  }, [loadLeads]);

  return (
    <>
      <BackButtonHandler />
      <Routes>
        {/* Splash */}
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <SplashScreen />
            </motion.div>
          }
        />

        {/* App Shell wraps all main screens */}
        <Route element={<AppShell />}>
          <Route
            path="/home"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="home"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <ErrorBoundary>
                    <HomeScreen />
                  </ErrorBoundary>
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="/services"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="services"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <ErrorBoundary>
                    <ServicesScreen />
                  </ErrorBoundary>
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="/cases"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="cases"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <ErrorBoundary>
                    <CaseStudiesScreen />
                  </ErrorBoundary>
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="/about"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="about"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <ErrorBoundary>
                    <AboutScreen />
                  </ErrorBoundary>
                </motion.div>
              </AnimatePresence>
            }
          />
          <Route
            path="/contact"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="contact"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <ErrorBoundary>
                    <ContactScreen />
                  </ErrorBoundary>
                </motion.div>
              </AnimatePresence>
            }
          />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
