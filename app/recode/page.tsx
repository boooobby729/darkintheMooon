'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import ImageCard from '../components/ImageCard';

export default function RecodePage() {
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
        {/* Image Cards Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '60px',
          width: '100%',
          maxWidth: '1400px',
          padding: '40px 20px',
          justifyContent: 'center',
          alignItems: 'start',
        }}>
          {/* Siddhartha 图片卡片 */}
          <ImageCard 
            src="/image/Siddhartha.png" 
            alt="Siddhartha"
            name="Siddhartha"
          />
        </div>
      </div>
    </div>
  );
}
