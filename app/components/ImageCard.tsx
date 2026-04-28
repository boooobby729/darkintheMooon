'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageCardProps {
  src: string;
  alt: string;
  name: string;
}

export default function ImageCard({ src, alt, name }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="image-card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '200px',
        height: '300px',
        position: 'relative',
        overflow: 'visible',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-out',
        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
        transformOrigin: 'center center',
        zIndex: isHovered ? 20 : 10,
        marginBottom: isHovered ? '50px' : '0',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#FFFFFF',
          fontSize: '32px',
          fontWeight: 'bold',
          fontFamily: '"汉仪瑞意宋", "HYRuiYiSong", "Noto Serif SC", "STSong", "SimSun", serif',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          opacity: isHovered ? 0.9 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {name}
      </div>
    </div>
  );
}
