import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home', { replace: true }), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#131313',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '420px',
          height: '420px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(255,175,214,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Four concentric rotating rings */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
        <svg width="340" height="340" viewBox="0 0 340 340" style={{ position: 'absolute', top: '-170px', left: '-170px' }}>
          <motion.circle cx="170" cy="170" r="68" fill="none" stroke="rgba(255,175,214,0.28)" strokeWidth="0.8" strokeDasharray="4 8" strokeLinecap="round"
            animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '170px 170px' }} />
          <motion.circle cx="170" cy="170" r="94" fill="none" stroke="rgba(255,175,214,0.16)" strokeWidth="0.6" strokeDasharray="2 12" strokeLinecap="round"
            animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '170px 170px' }} />
          <motion.circle cx="170" cy="170" r="124" fill="none" stroke="rgba(255,175,214,0.09)" strokeWidth="0.5" strokeDasharray="1 16" strokeLinecap="round"
            animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '170px 170px' }} />
          <motion.circle cx="170" cy="170" r="156" fill="none" stroke="rgba(255,175,214,0.05)" strokeWidth="0.4" strokeDasharray="0.5 20" strokeLinecap="round"
            animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '170px 170px' }} />
        </svg>
      </div>

      {/* Center content — logo + wordmark */}
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 10 }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo container — 120px rounded square with T@W monogram */}
        <motion.div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '34px',
            background: 'linear-gradient(145deg, rgba(255,175,214,0.18) 0%, rgba(227,140,184,0.06) 100%)',
            border: '1px solid rgba(255,175,214,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          animate={{
            boxShadow: [
              '0 0 40px rgba(255,175,214,0.15), 0 0 80px rgba(255,175,214,0.06)',
              '0 0 60px rgba(255,175,214,0.3), 0 0 100px rgba(255,175,214,0.12)',
              '0 0 40px rgba(255,175,214,0.15), 0 0 80px rgba(255,175,214,0.06)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Inner shimmer sweep */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
            }}
            animate={{ x: ['-120px', '120px'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />
          {/* The @ monogram — larger and bolder */}
          <span
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 900,
              fontSize: '48px',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(145deg, #ffafd6 20%, #e38cb8 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'relative',
              zIndex: 2,
            }}
          >
            @
          </span>
        </motion.div>

        {/* Wordmark */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 900,
              fontSize: '40px',
              letterSpacing: '-0.05em',
              margin: 0,
              lineHeight: 1,
              background: 'linear-gradient(145deg, #ffafd6 0%, #e38cb8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Tech@Work
          </h1>
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,175,214,0.2), transparent)', margin: '14px auto 10px' }} />
          <p
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(214,193,201,0.4)',
              margin: 0,
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
            background: 'rgba(255,175,214,0.07)',
            borderRadius: '99px',
            overflow: 'hidden',
            marginTop: '4px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #ffafd6, #e38cb8)',
              borderRadius: '99px',
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <motion.div
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
              animate={{ x: ['-120px', '120px'] }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
