import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import CaseStudiesScreen from './screens/CaseStudiesScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import { useAppStore } from './store/useAppStore';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const pageTransition = {
  duration: 0.25,
  ease: 'easeOut' as const,
};

function App() {
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
    <BrowserRouter>
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
              transition={pageTransition}
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
                  transition={pageTransition}
                >
                  <HomeScreen />
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
                  transition={pageTransition}
                >
                  <ServicesScreen />
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
                  transition={pageTransition}
                >
                  <CaseStudiesScreen />
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
                  transition={pageTransition}
                >
                  <AboutScreen />
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
                  transition={pageTransition}
                >
                  <ContactScreen />
                </motion.div>
              </AnimatePresence>
            }
          />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
