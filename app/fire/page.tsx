'use client';

import { useRef, useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FlameAnimation from '../components/FlameAnimation';
import { useGestureFlame } from '../hooks/useGestureFlame';

export default function FirePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { gestures, error } = useGestureFlame();
  const [simulatePalmOpen, setSimulatePalmOpen] = useState(false);
  const [simulateTwoHands, setSimulateTwoHands] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') setSimulatePalmOpen(true);
      if (e.key === '2') setSimulateTwoHands(true);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') setSimulatePalmOpen(false);
      if (e.key === '2') setSimulateTwoHands(false);
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '300vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'auto',
        padding: '20px',
        paddingTop: '100px',
      }}
    >
      <NavBar />
      <div className="gradient-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
        <div className="gradient-circle circle-4"></div>
      </div>
      <div className="rectangles-container">
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className="blur-rectangle"></div>
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '30px',
          minHeight: '300vh',
          paddingTop: '100px',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: '600',
            color: '#FFFFFF',
            opacity: 0.9,
          }}
        >
          FIRE
        </h1>
        {error && (
          <p style={{ color: '#ff6b6b', fontSize: 14, marginBottom: 8 }}>
            手势识别需摄像头权限，请允许后刷新
          </p>
        )}
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
          手掌张开 → 蓝紫色 · 两只手 → 两股火焰 · 粒子上升 · P 模拟单手 · 2 模拟双手
        </p>
        <FlameAnimation
          gestures={
            simulateTwoHands
              ? [
                  { active: true, palmOpen: simulatePalmOpen, scale: 1, x: -0.4, y: 0 },
                  { active: true, palmOpen: simulatePalmOpen, scale: 1, x: 0.4, y: 0 },
                ]
              : simulatePalmOpen
                ? [{ active: true, palmOpen: true, scale: 1, x: 0, y: 0 }]
                : gestures
          }
        />
      </div>
    </div>
  );
}
