'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: '/', label: 'BINGO' },
    { path: '/reading', label: 'READING' },
    { path: '/recode', label: 'RECODE' },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px 6px',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(60px)',
      WebkitBackdropFilter: 'blur(60px)',
      borderBottom: '1px solid rgba(247, 247, 247, 0.1)',
      overflowX: 'auto',
      overflowY: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        minWidth: 'min-content',
        padding: '0 4px'
      }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path === '/' && pathname === '/');
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                flexShrink: 0,
                fontWeight: '500',
                color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transition: 'color 0.2s, opacity 0.2s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                }
              }}
            >
              {item.label}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '2px',
                  background: '#FFFFFF',
                  opacity: 0.8
                }} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
