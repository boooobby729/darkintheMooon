'use client';

import { useRef } from 'react';
import NavBar from '../components/NavBar';
import PageBackground from '../components/PageBackground';

export default function RecodePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100vw',
        minHeight: '100vh',
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
      <PageBackground />
      
      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        paddingTop: '100px'
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '14px',
          fontFamily: '"Intel One Mono", monospace',
        }}>
          Coming soon...
        </p>
      </div>
    </div>
  );
}
