'use client';

import { useRef, useEffect, useState } from 'react';

function drawSilverMetallic(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // 银色金属渐变：对角高光 + 暗部
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#f0f0f5');
  g.addColorStop(0.2, '#e0e0e8');
  g.addColorStop(0.4, '#c8c8d0');
  g.addColorStop(0.5, '#b0b0b8');
  g.addColorStop(0.65, '#a0a0a8');
  g.addColorStop(0.8, '#90909a');
  g.addColorStop(1, '#787882');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // 第二层：垂直高光条增强金属感
  const g2 = ctx.createLinearGradient(w * 0.3, 0, w * 0.7, 0);
  g2.addColorStop(0, 'rgba(255,255,255,0)');
  g2.addColorStop(0.4, 'rgba(255,255,255,0.15)');
  g2.addColorStop(0.5, 'rgba(255,255,255,0.25)');
  g2.addColorStop(0.6, 'rgba(255,255,255,0.15)');
  g2.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
}

const CARD_WIDTH = 400;
const CARD_HEIGHT = 300;

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const brushRadius = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = CARD_WIDTH;
    const h = CARD_HEIGHT;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawSilverMetallic(ctx, w, h);
  }, []);

  const getPos = (e: { clientX: number; clientY: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const x = ((clientX - rect.left) / rect.width) * CARD_WIDTH;
    const y = ((clientY - rect.top) / rect.height) * CARD_HEIGHT;
    return { x, y };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cx = Math.max(0, Math.min(CARD_WIDTH, x));
    const cy = Math.max(0, Math.min(CARD_HEIGHT, y));
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx - brushRadius * 0.35, cy, brushRadius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + brushRadius * 0.35, cy, brushRadius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy - brushRadius * 0.35, brushRadius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy + brushRadius * 0.35, brushRadius * 0.7, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handleMouseUp = () => setIsDrawing(false);
  const handleMouseLeave = () => {
    setIsDrawing(false);
    setIsHovered(false);
  };

  return (
    <div
      data-scratch-card="silver"
      style={{
        perspective: '1200px',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        flexShrink: 0,
      }}
    >
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          minWidth: CARD_WIDTH,
          minHeight: CARD_HEIGHT,
          borderRadius: '24px',
          overflow: 'hidden',
          cursor: 'crosshair',
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? 'translateZ(24px) rotateX(2deg) rotateY(2deg)'
            : 'translateZ(0) rotateX(0) rotateY(0)',
          boxShadow: isHovered
            ? '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)'
            : '0 10px 40px rgba(0,0,0,0.3)',
          transition: 'transform 0.35s ease-out, box-shadow 0.35s ease-out',
        }}
      >
        {/* 底层：黄橙色，铺满整张卡片 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            background: 'linear-gradient(135deg, #ffb347 0%, #ff8c00 50%, #ff7f00 100%)',
          }}
        />
        {/* 表层：银色金属刮层，铺满整张卡片 */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={(e) => {
            e.preventDefault();
            const t = e.touches[0];
            if (t) {
              setIsDrawing(true);
              const { x, y } = getPos(t);
              scratch(x, y);
            }
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            if (!isDrawing) return;
            const t = e.touches[0];
            if (t) {
              const { x, y } = getPos(t);
              scratch(x, y);
            }
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            setIsDrawing(false);
          }}
          onTouchCancel={() => setIsDrawing(false)}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            display: 'block',
            pointerEvents: 'auto',
            touchAction: 'none',
          }}
        />
      </div>
    </div>
  );
}
