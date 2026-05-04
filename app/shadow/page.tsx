'use client';

import { useRef, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PageBackground from '../components/PageBackground';

/* ============================================================
   配置区域 - 可自由调整参数
   ============================================================ */

// 视差图层配置
const PARALLAX_CONFIG = {
  // 容器尺寸（占视口宽度百分比）
  containerWidth: '66.67%',
  // 容器圆角
  borderRadius: '20px',
  // 图层位移缓动系数（0~1，越小越丝滑）
  lerp: 0.08,
  // 位移强度
  translateX: 120,
  translateY: 80,
};

// 3D 倾斜效果配置
const TILT_CONFIG = {
  // 最大旋转角度（度）
  maxRotateX: 1.5,
  maxRotateY: 2.5,
  // 透视距离（px）
  perspective: 1200,
  // 缓动系数（0~1，越小越丝滑）
  lerp: 0.06,
  // hover 时的阴影
  hoverShadow: '0 30px 100px rgba(102, 126, 234, 0.15), 0 10px 40px rgba(0, 0, 0, 0.5)',
  // 默认阴影
  defaultShadow: '0 20px 80px rgba(0, 0, 0, 0.6)',
  // 高光叠加层透明度上限
  glareMaxOpacity: 0.04,
};

// 8 layers from bottom (farthest) to top (nearest)
const layers = [
  { src: '/shadow/layer8.webp', depth: 0.03 },  // 最远 - 橙色背景
  { src: '/shadow/layer7.webp', depth: 0.06 },  // 暗色山峦
  { src: '/shadow/layer6.webp', depth: 0.10 },  // 山峦+小蛙
  { src: '/shadow/layer5.webp', depth: 0.15 },  // 弧形波浪
  { src: '/shadow/layer4.webp', depth: 0.22 },  // 门神角色
  { src: '/shadow/layer3.webp', depth: 0.30 },  // 紫色海螺
  { src: '/shadow/layer2.webp', depth: 0.38 },  // 前景蜗牛
  { src: '/shadow/layer1.webp', depth: 0.48 },  // 最近 - 前景山峦
];

/* ============================================================ */

export default function ShadowPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const animCurrent = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ rotX: 0, rotY: 0 });
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalize to -1 ~ 1
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseTarget.current = { x, y };
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseTarget.current = { x: 0, y: 0 };
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

  // Animation loop - parallax + 3D tilt
  useEffect(() => {
    const animate = () => {
      const { x: tx, y: ty } = mouseTarget.current;

      // Smooth lerp for parallax layers
      animCurrent.current.x += (tx - animCurrent.current.x) * PARALLAX_CONFIG.lerp;
      animCurrent.current.y += (ty - animCurrent.current.y) * PARALLAX_CONFIG.lerp;

      // Smooth lerp for 3D tilt
      const targetRotY = tx * TILT_CONFIG.maxRotateY;
      const targetRotX = -ty * TILT_CONFIG.maxRotateX;
      tiltCurrent.current.rotX += (targetRotX - tiltCurrent.current.rotX) * TILT_CONFIG.lerp;
      tiltCurrent.current.rotY += (targetRotY - tiltCurrent.current.rotY) * TILT_CONFIG.lerp;

      // Apply parallax to layers
      const layerElements = containerRef.current?.querySelectorAll('.parallax-layer');
      if (layerElements) {
        layerElements.forEach((el, index) => {
          const depth = layers[index].depth;
          const moveX = animCurrent.current.x * depth * PARALLAX_CONFIG.translateX;
          const moveY = animCurrent.current.y * depth * PARALLAX_CONFIG.translateY;
          (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      }

      // Apply 3D tilt to container wrapper
      const wrapper = containerRef.current?.parentElement;
      if (wrapper) {
        wrapper.style.transform = `perspective(${TILT_CONFIG.perspective}px) rotateX(${tiltCurrent.current.rotX}deg) rotateY(${tiltCurrent.current.rotY}deg)`;
      }

      // Update glare position
      if (glareRef.current) {
        const glareX = (animCurrent.current.x + 1) / 2 * 100;
        const glareY = (animCurrent.current.y + 1) / 2 * 100;
        const opacity = Math.sqrt(tx * tx + ty * ty) * TILT_CONFIG.glareMaxOpacity;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${opacity}) 0%, transparent 60%)`;
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
      {/* 背景层 - 独立 fixed 定位，避免 backdrop-filter 干扰 3D transform */}
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

        {/* 3D Tilt Wrapper */}
        <div style={{
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform',
        }}>
        {/* Parallax Scene Container */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            // 让容器在视口中自适应
            width: 'min(66.67vw, 1100px)',
            aspectRatio: '4096 / 2774',
            borderRadius: PARALLAX_CONFIG.borderRadius,
            overflow: 'hidden',
            cursor: 'crosshair',
            boxShadow: isHovered ? TILT_CONFIG.hoverShadow : TILT_CONFIG.defaultShadow,
            transition: 'box-shadow 0.4s ease',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Parallax Layers */}
          {layers.map((layer, index) => (
            <div
              key={index}
              className="parallax-layer"
              style={{
                position: 'absolute',
                inset: '-50px',
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

          {/* Glare overlay - 高光层 */}
          <div
            ref={glareRef}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: PARALLAX_CONFIG.borderRadius,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />
        </div>
        </div>
      </div>
    </>
  );
}
