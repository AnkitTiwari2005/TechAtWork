import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home', { replace: true });
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="splash-screen"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 60% 40% at 50% 45%, rgba(255,175,214,0.1) 0%, transparent 70%), #131313',
      }}
    >
      {/* Three concentric animated SVG rings — centered behind logo */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <svg width="240" height="240" viewBox="0 0 240 240" style={{ position: 'absolute', top: '-120px', left: '-120px' }}>
          {/* Inner ring */}
          <motion.circle
            cx="120" cy="120" r="60"
            fill="none"
            stroke="rgba(255,175,214,0.35)"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '120px 120px' }}
          />
          {/* Middle ring */}
          <motion.circle
            cx="120" cy="120" r="80"
            fill="none"
            stroke="rgba(255,175,214,0.2)"
            strokeWidth="0.8"
            strokeDasharray="2 12"
            strokeLinecap="round"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '120px 120px' }}
          />
          {/* Outer ring */}
          <motion.circle
            cx="120" cy="120" r="105"
            fill="none"
            stroke="rgba(255,175,214,0.1)"
            strokeWidth="0.5"
            strokeDasharray="1 16"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '120px 120px' }}
          />
        </svg>
      </div>

      {/* Logo + wordmark */}
      <motion.div
        className="flex flex-col items-center gap-5 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* SVG Logo mark — no external image dependency */}
        <motion.div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '26px',
            background: 'linear-gradient(135deg, rgba(255,175,214,0.15) 0%, rgba(227,140,184,0.1) 100%)',
            border: '0.5px solid rgba(255,175,214,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(255,175,214,0.3), 0 0 80px rgba(255,175,214,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
          animate={{
            boxShadow: [
              '0 0 40px rgba(255,175,214,0.3), 0 0 80px rgba(255,175,214,0.15)',
              '0 0 60px rgba(255,175,214,0.5), 0 0 100px rgba(255,175,214,0.25)',
              '0 0 40px rgba(255,175,214,0.3), 0 0 80px rgba(255,175,214,0.15)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 900,
              fontSize: '28px',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #ffafd6, #e38cb8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            @
          </span>
        </motion.div>

        {/* Wordmark — inline gradient safe for Android WebView */}
        <div className="text-center">
          <h1
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 900,
              fontSize: '32px',
              letterSpacing: '-0.04em',
              margin: 0,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #ffafd6 0%, #e38cb8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Tech@Work
          </h1>
          {/* Divider */}
          <div
            style={{
              width: '80px',
              height: '1px',
              background: 'rgba(255,175,214,0.15)',
              margin: '10px auto 8px',
            }}
          />
          <p
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(214,193,201,0.5)',
            }}
          >
            AI-Driven Digital Transformation
          </p>
        </div>

        {/* Progress bar */}
        <motion.div
          style={{
            width: '120px',
            height: '2px',
            background: 'rgba(255,175,214,0.1)',
            borderRadius: '99px',
            overflow: 'hidden',
            marginTop: '4px',
          }}
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
            transition={{ duration: 2.4, ease: 'easeOut', delay: 0.3 }}
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
