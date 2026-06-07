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
    <div className="splash-screen">
      {/* Background gradient blobs */}
      <div
        className="gradient-blob"
        style={{
          width: '300px',
          height: '300px',
          background: 'rgba(255,175,214,0.12)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="gradient-blob"
        style={{
          width: '200px',
          height: '200px',
          background: 'rgba(190,204,154,0.08)',
          bottom: '20%',
          right: '10%',
        }}
      />

      {/* Logo */}
      <motion.div
        className="flex flex-col items-center gap-6 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo mark — real logo */}
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

        {/* Wordmark */}
        <div className="text-center">
          <h1
            className="text-3xl font-headline font-black tracking-tighter"
            style={{ color: '#e2e2e2' }}
          >
            Tech<span style={{ color: '#ffafd6' }}>@</span>Work
          </h1>
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] mt-1"
            style={{ color: 'rgba(214,193,201,0.5)' }}
          >
            AI-Driven Digital Transformation
          </p>
        </div>

        {/* Loading dots */}
        <motion.div
          className="flex gap-1.5 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ffafd6',
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
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
