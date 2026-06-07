import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, LightningIcon, BriefcaseIcon, UserIcon, MailIcon } from '../ui/Icon';

const hapticLight = async () => {
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch { }
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
        height: '72px',
        background: 'rgba(13,13,13,0.92)',
        backdropFilter: 'blur(24px) saturate(180%)',
        borderTop: '0.5px solid rgba(255,175,214,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: '8px',
        paddingRight: '8px',
      }}
    >
      {NAV_ITEMS.map(({ to, label, Icon }) => {
        const isActive = location.pathname === to || (to === '/home' && location.pathname === '/');
        return (
          <NavLink
            key={to}
            to={to}
            onClick={hapticLight}
            style={{ textDecoration: 'none', flex: 1 }}
          >
            <motion.div
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                paddingTop: '6px',
                paddingBottom: '4px',
                position: 'relative',
              }}
            >
              {/* Active indicator pill — above icon */}
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '32px',
                    height: '3px',
                    borderRadius: '0 0 3px 3px',
                    background: '#ffafd6',
                    boxShadow: '0 0 8px rgba(255,175,214,0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}

              {/* Icon container */}
              <motion.div
                animate={{
                  backgroundColor: isActive ? 'rgba(255,175,214,0.1)' : 'transparent',
                  scale: isActive ? 1 : 0.9,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  size={22}
                  color={isActive ? '#ffafd6' : 'rgba(214,193,201,0.4)'}
                  strokeWidth={isActive ? 2 : 1.5}
                />
              </motion.div>

              {/* Label */}
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: isActive ? '#ffafd6' : 'rgba(214,193,201,0.4)',
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </span>
            </motion.div>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
