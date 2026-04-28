'use client';

import { useState, useEffect } from 'react';

interface GlowEffectProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function GlowEffect({ containerRef }: GlowEffectProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isAtBottom) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const isBottom = scrollTop + clientHeight >= scrollHeight - 20; // 20px threshold
        setIsAtBottom(isBottom);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouseMove);
      handleScroll(); // Check initial state
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAtBottom, containerRef]);

  if (!isAtBottom) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(76, 175, 80, 0.5), rgba(76, 175, 80, 0.2), transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        transition: 'opacity 0.3s ease-out',
        opacity: 1
      }}
    />
  );
}
