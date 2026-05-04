'use client';

import { useRef, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PageBackground from '../components/PageBackground';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/* ============================================================
   配置区域 - 可自由调整参数
   ============================================================ */

const PARALLAX_CONFIG = {
  // 容器圆角
  borderRadius: '20px',
  // 图层位移缓动系数（0~1，越小越丝滑）
  lerp: 0.08,
  // 位移强度
  translateX: 120,
  translateY: 80,
  // hover 时图层放大比例（>1 = 放大，为视差位移留出空间）
  layerZoomScale: 1.12,
  // 缩放缓动系数
  scaleLerp: 0.04,
};

// 8 layers from bottom (farthest) to top (nearest)
const layers = [
  { src: `${basePath}/shadow/layer8.webp`, depth: 0.03 },  // 最远 - 橙色背景
  { src: `${basePath}/shadow/layer7.webp`, depth: 0.06 },  // 暗色山峦
  { src: `${basePath}/shadow/layer6.webp`, depth: 0.10 },  // 山峦+小蛙
  { src: `${basePath}/shadow/layer5.webp`, depth: 0.15 },  // 弧形波浪
  { src: `${basePath}/shadow/layer4.webp`, depth: 0.22 },  // 门神角色
  { src: `${basePath}/shadow/layer3.webp`, depth: 0.30 },  // 紫色海螺
  { src: `${basePath}/shadow/layer2.webp`, depth: 0.38 },  // 前景蜗牛
  { src: `${basePath}/shadow/layer1.webp`, depth: 0.48 },  // 最近 - 前景山峦
];

/* ============================================================ */

export default function ShadowPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const animCurrent = useRef({ x: 0, y: 0 });
  const scaleTarget = useRef(1);
  const scaleCurrent = useRef(1);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseTarget.current = { x, y };
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      scaleTarget.current = PARALLAX_CONFIG.layerZoomScale;
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseTarget.current = { x: 0, y: 0 };
      scaleTarget.current = 1;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation loop - parallax + scale 全部在 RAF 中统一处理
  useEffect(() => {
    const animate = () => {
      // Lerp parallax position
      animCurrent.current.x += (mouseTarget.current.x - animCurrent.current.x) * PARALLAX_CONFIG.lerp;
      animCurrent.current.y += (mouseTarget.current.y - animCurrent.current.y) * PARALLAX_CONFIG.lerp;

      // Lerp scale
      scaleCurrent.current += (scaleTarget.current - scaleCurrent.current) * PARALLAX_CONFIG.scaleLerp;

      // Apply to layers
      const layerElements = containerRef.current?.querySelectorAll('.parallax-layer');
      if (layerElements) {
        layerElements.forEach((el, index) => {
          const depth = layers[index].depth;
          const moveX = animCurrent.current.x * depth * PARALLAX_CONFIG.translateX;
          const moveY = animCurrent.current.y * depth * PARALLAX_CONFIG.translateY;
          const s = scaleCurrent.current;
          (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${s})`;
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* 背景层 */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: '#000000',
        pointerEvents: 'none',
      }}>
        <PageBackground />
      </div>

      {/* 主内容层 */}
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <NavBar />

        {/* Parallax Scene Container - 容器大小固定不变 */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: 'min(66.67vw, 1100px)',
            aspectRatio: '4096 / 2774',
            borderRadius: PARALLAX_CONFIG.borderRadius,
            overflow: 'hidden',
            cursor: 'crosshair',
          }}
        >
          {/* Parallax Layers */}
          {layers.map((layer, index) => (
            <div
              key={index}
              className="parallax-layer"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform',
              }}
            >
              <img
                src={layer.src}
                alt={`Layer ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
