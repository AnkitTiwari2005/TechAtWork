import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, LightningIcon, BriefcaseIcon, UserIcon, MailIcon } from '../ui/Icon';

const hapticLight = async () => {
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {}
};

const NAV_ITEMS = [
  { to: '/home', label: 'Home', Icon: HomeIcon },
  { to: '/services', label: 'Services', Icon: LightningIcon },
  { to: '/cases', label: 'Cases', Icon: BriefcaseIcon },
  { to: '/about', label: 'About', Icon: UserIcon },
  { to: '/contact', label: 'Contact', Icon: MailIcon },
];

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '68px',
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(32px) saturate(200%)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%)',
        borderTop: '0.5px solid rgba(255,175,214,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: '8px',
        paddingRight: '8px',
      }}
    >
      {NAV_ITEMS.map(({ to, label, Icon }, navIndex) => {
        const isActive = location.pathname === to || (to === '/home' && location.pathname === '/');
        return (
          <React.Fragment key={to}>
            {/* Separator line between items */}
            {navIndex > 0 && (
              <div style={{ width: '0.5px', height: '24px', background: 'rgba(255,175,214,0.06)', flexShrink: 0 }} />
            )}
            <NavLink to={to} onClick={hapticLight} style={{ textDecoration: 'none', flex: 1 }}>
              <motion.div
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '3px', paddingTop: '4px', paddingBottom: '2px', position: 'relative',
                }}
              >
                {/* Top ink bar — 20px wide, 2px tall */}
                {isActive && (
                  <motion.div
                    layoutId="nav-ink"
                    style={{
                      position: 'absolute', top: 0,
                      width: '20px', height: '2px',
                      borderRadius: '0 0 2px 2px',
                      background: '#ffafd6',
                      boxShadow: '0 0 8px rgba(255,175,214,0.6)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}

                {/* Icon container with glow bg */}
                <div style={{ position: 'relative', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      style={{
                        position: 'absolute', inset: 0,
                        width: '44px', height: '44px',
                        borderRadius: '14px',
                        background: 'rgba(255,175,214,0.12)',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <Icon
                    size={22}
                    color={isActive ? '#ffafd6' : 'rgba(214,193,201,0.38)'}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                </div>

                {/* Label */}
                <span style={{ fontSize: '10px', fontWeight: 500, color: isActive ? '#ffafd6' : 'rgba(214,193,201,0.38)', letterSpacing: '0.02em' }}>
                  {label}
                </span>
              </motion.div>
            </NavLink>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default BottomNav;
