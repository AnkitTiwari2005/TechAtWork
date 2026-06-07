import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home', { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated bloom behind logo */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,175,214,0.18) 0%, transparent 70%)',
          zIndex: 1,
        }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating SVG rings */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
        <motion.svg
          width="200" height="200" viewBox="0 0 200 200"
          style={{ position: 'absolute', top: '-100px', left: '-100px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="rgba(255,175,214,0.25)"
            strokeWidth="1"
            strokeDasharray="30 10"
            strokeLinecap="round"
          />
        </motion.svg>
        <motion.svg
          width="240" height="240" viewBox="0 0 240 240"
          style={{ position: 'absolute', top: '-120px', left: '-120px' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="120" cy="120" r="110"
            fill="none"
            stroke="rgba(255,175,214,0.15)"
            strokeWidth="0.5"
            strokeDasharray="20 15"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>

      {/* Background gradient blobs */}
      <div
        className="gradient-blob"
        style={{ width: '300px', height: '300px', background: 'rgba(255,175,214,0.08)', top: '20%', left: '50%', transform: 'translateX(-50%)' }}
      />
      <div
        className="gradient-blob"
        style={{ width: '200px', height: '200px', background: 'rgba(190,204,154,0.06)', bottom: '20%', right: '10%' }}
      />

      {/* Logo + wordmark */}
      <motion.div
        className="flex flex-col items-center gap-6 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo mark */}
        <motion.div
          className="animate-pulse-glow"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(255,175,214,0.4), 0 0 80px rgba(255,175,214,0.2)',
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Tech@Work"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>

        {/* Wordmark with gradient */}
        <div className="text-center">
          <h1
            className="text-3xl font-headline font-black tracking-tighter text-gradient"
          >
            Tech@Work
          </h1>
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] mt-1"
            style={{ color: 'rgba(214,193,201,0.5)' }}
          >
            AI-Driven Digital Transformation
          </p>
        </div>

        {/* Premium progress bar */}
        <motion.div
          style={{ width: '120px', height: '2px', background: 'rgba(255,175,214,0.12)', borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ffafd6, #e38cb8)',
              borderRadius: '99px',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeOut', delay: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        className="absolute bottom-12 text-center text-xs"
        style={{ color: 'rgba(214,193,201,0.3)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Powered by AI · Built for Business
      </motion.p>
    </div>
  );
};

export default SplashScreen;
