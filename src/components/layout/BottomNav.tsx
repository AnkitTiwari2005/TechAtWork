import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const NAV_ITEMS = [
  { path: '/home', label: 'Home', icon: '⌂', id: 'nav-home' },
  { path: '/services', label: 'Services', icon: '⚡', id: 'nav-services' },
  { path: '/cases', label: 'Cases', icon: '◈', id: 'nav-cases' },
  { path: '/about', label: 'About', icon: '◎', id: 'nav-about' },
  { path: '/contact', label: 'Contact', icon: '✉', id: 'nav-contact' },
];

const BottomNav: React.FC = () => {
  const { isKeyboardOpen } = useAppStore();
  const location = useLocation();

  if (isKeyboardOpen) return null;

  return (
    <nav
      className={`bottom-nav ${isKeyboardOpen ? 'hidden-nav' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-[68px] px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              id={item.id}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full no-select relative"
              aria-label={item.label}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-b-full"
                  style={{ background: '#ffafd6' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <motion.span
                animate={{
                  color: isActive ? '#ffafd6' : 'rgba(214,193,201,0.5)',
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '20px', lineHeight: 1, display: 'block' }}
              >
                {item.icon}
              </motion.span>
              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? '#ffafd6' : 'rgba(214,193,201,0.45)' }}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
