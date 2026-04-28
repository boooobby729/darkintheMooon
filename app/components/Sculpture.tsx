'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';

interface ColumnModelProps {
  scrollProgress: number;
  isScrolling: boolean;
}

function ColumnModel({ scrollProgress, isScrolling }: ColumnModelProps) {
  const group = useRef<any>(null);
  // 加载放在 public/models 下的罗马柱模型
  const { scene } = useGLTF('/models/column.glb');

  useFrame((_state, delta) => {
    // 根据滚动状态调整旋转速度
    if (group.current) {
      const baseSpeed = 0.2;
      let speedMultiplier = 1;
      
      if (isScrolling) {
        // 滑动时，转速提高三倍
        speedMultiplier = 3;
      } else {
        // 不动时，转速慢一倍（即基础速度的一半）
        speedMultiplier = 0.5;
      }
      
      group.current.rotation.y += delta * baseSpeed * speedMultiplier;
    }
  });

  return (
    <group
      ref={group}
      dispose={null}
      scale={[6, 6, 6]}
      position={[0, -0.5, 0]} // 略微下移，避免顶部被裁切
    >
      <primitive object={scene} />
    </group>
  );
}

// 预加载模型
useGLTF.preload('/models/column.glb');

interface SculptureProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Sculpture({ containerRef }: SculptureProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      if (containerRef?.current) {
        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        // 计算滚动进度 (0 到 1)
        const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
        setScrollProgress(progress);
        
        // 检测是否真的在滚动（位置发生变化）
        const isActuallyScrolling = Math.abs(scrollTop - lastScrollTop) > 0.5;
        lastScrollTop = scrollTop;
        
        if (isActuallyScrolling) {
          // 立即设置为滚动状态
          setIsScrolling(true);
          
          // 清除之前的定时器
          if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
          }
          
          // 100ms 后如果没有新的滚动事件，认为滚动停止
          scrollTimerRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 100);
        }
      }
    };

    const container = containerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // 初始化计算
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <div
      style={{
        position: 'absolute',
        right: '5%',
        bottom: '10%',
        width: '800px',
        height: '1000px',
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 5,
        transform: 'translateX(600px) translateY(900px)',
      }}
    >
      <Canvas
        camera={{ position: [0, 3, 12], fov: 45 }} // 拉远相机并扩大视野，让模型完整显示
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* 环境光 - 提供整体基础亮度 */}
        <ambientLight intensity={5.0} />
        
        {/* 主方向光 - 从上方右侧照射 */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={20.0}
          castShadow
        />
        
        {/* 辅助方向光 - 从左侧补充光照 */}
        <directionalLight
          position={[-5, 5, -5]}
          intensity={10.0}
        />
        
        {/* 点光源 - 从前方补充光照 */}
        <pointLight
          position={[0, 3, 5]}
          intensity={10.5}
        />
        <Suspense fallback={null}>
          <ColumnModel scrollProgress={scrollProgress} isScrolling={isScrolling} />
        </Suspense>
      </Canvas>
    </div>
  );
}
