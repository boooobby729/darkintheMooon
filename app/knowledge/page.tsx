'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import ScratchCard from '../components/ScratchCard';

export default function KnowledgePage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

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
        paddingTop: '100px'
      }}
    >
      <NavBar />
      {/* Animated Gradient Circles Background */}
      <div className="gradient-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
        <div className="gradient-circle circle-4"></div>
      </div>
      
      {/* 30 Rectangles with Blur and White Gradient */}
      <div className="rectangles-container">
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className="blur-rectangle"></div>
        ))}
      </div>
      
      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '30px',
        minHeight: '300vh',
        paddingTop: '100px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '600',
          color: '#FFFFFF',
          opacity: 0.9
        }}>
          knowledge
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#FFFFFF',
          opacity: 0.6
        }}>
          此页面正在开发中
        </p>
        {/* 刮刮乐卡片 */}
        <ScratchCard />
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            fontWeight: '500',
            color: '#FFFFFF',
            background: 'rgba(15, 15, 15, 0.8)',
            border: '1px solid rgba(247, 247, 247, 0.3)',
            borderRadius: '32px',
            cursor: 'pointer',
            backdropFilter: 'blur(60px)',
            WebkitBackdropFilter: 'blur(60px)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          返回首页
        </button>
      </div>
    </div>
  );
}
