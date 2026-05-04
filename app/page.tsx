'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import NavBar from './components/NavBar';
import PageBackground from './components/PageBackground';
import Sculpture from './components/Sculpture';
import SmokeText from './components/SmokeText';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 页面加载后开始动画序列
    setIsReady(true);
  }, []);

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
        paddingTop: '100px',
      }}
    >
      <NavBar />
      <PageBackground />
      
      {/* Background Text - 第二个显示 */}
      <div
        style={{
          position: 'absolute',
          right: '100px',
          top: '300px',
          zIndex: 2,
          fontFamily: '"Intel One Mono", "Intel", monospace, sans-serif',
          textTransform: 'uppercase',
          textAlign: 'right',
          pointerEvents: 'none',
          lineHeight: '1.2',
          wordSpacing: '-10px',
        }}
      >
        <SmokeText
          config={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 'bold',
            color: 'rgba(255,255,255,0.85)',
            duration: 6,
            delay: 0.8,
            blurAmount: 12,
            minOpacity: 0.15,
            translateY: 20,
            style: { display: 'block' },
          }}
        >
          THE DARK SEA
        </SmokeText>
        <SmokeText
          config={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 'bold',
            color: 'rgba(255,255,255,0.85)',
            duration: 6,
            delay: 1.2,
            blurAmount: 12,
            minOpacity: 0.15,
            translateY: 20,
            style: { display: 'block' },
          }}
        >
          UNDER THE MOONLIGHT
        </SmokeText>
      </div>

      {/* Poem Text - Left Side */}
      <div 
        className={isReady ? 'fade-in-text' : ''}
        style={{
          position: 'absolute',
          left: '40px',
          top: '700px',
          zIndex: 2,
          fontSize: '8px',
          fontFamily: '"Intel One Mono", "Intel", monospace, sans-serif',
          textAlign: 'left',
          color: '#FFFFFF',
          opacity: 0.5,
          maxWidth: '500px',
          lineHeight: '1.8',
        }}
      >
        <p>The true self is like a sea beneath the moon,<br />
        Vast and silent, profound and pale.<br />
        It is the softest place of the soul,<br />
        Where waves rest still, yet currents flow unseen.</p>
        
        <p style={{ marginTop: '20px' }}>When I try to capture this radiance,<br />
        The moment I raise the camera,<br />
        The light vanishes,<br />
        Leaving only a desperate darkness.</p>
        
        <p style={{ marginTop: '20px' }}>Language is too impoverished,<br />
        Words too pallid,<br />
        Every explanation becomes a betrayal,<br />
        Every utterance a loss.</p>
        
        <p style={{ marginTop: '20px' }}>Moonlight illuminates my inner sea,<br />
        Yet cannot reach into your eyes.<br />
        My heart glimmers with brilliance,<br />
        But becomes void in your lens.</p>
        
        <p style={{ marginTop: '20px' }}>This is the paradox of existence,<br />
        The most authentic things,<br />
        Can never be fully transmitted,<br />
        Only flickering eternally in silence, bearing witness to the light.</p>
      </div>

      {/* Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '80px',
          width: '100%',
          maxWidth: '1200px',
          minHeight: '300vh',
          padding: '100px 20px',
        }}
      >
        {/* First Screen - Angel Image */}
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            className={isReady ? 'fade-in-angel' : ''}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              opacity: 0,
            }}
          >
            <Image
              src="/image/angel.webp"
              alt="天使"
              width={800}
              height={800}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                maxWidth: '100%',
              }}
              priority
            />
          </div>
          {/* 3D Roman Column - 位于第一屏右下方，部分可见，最后显示 */}
          <div className={isReady ? 'fade-in-sculpture' : ''} style={{ opacity: 0 }}>
            <Sculpture containerRef={containerRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

