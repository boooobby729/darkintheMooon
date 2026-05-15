'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { MeshoptDecoder } from 'meshoptimizer';

// 使用 meshopt 压缩版本，解码速度远快于 Draco
const MODEL_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/models/column_meshopt.glb`;

interface ColumnModelProps {
  scrollProgress: number;
  isScrolling: boolean;
  onLoaded?: () => void;
}

function ColumnModel({ scrollProgress, isScrolling, onLoaded }: ColumnModelProps) {
  const group = useRef<any>(null);
  const { scene } = useGLTF(MODEL_PATH, undefined, undefined, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  useEffect(() => {
    if (scene && onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  useFrame((_state, delta) => {
    if (group.current) {
      const baseSpeed = 0.2;
      let speedMultiplier = 1;
      
      if (isScrolling) {
        speedMultiplier = 3;
      } else {
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
      position={[0, -0.5, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}

// 预加载模型
useGLTF.preload(MODEL_PATH);

// Loading 过渡动画
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

interface SculptureProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Sculpture({ containerRef }: SculptureProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
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
        
        const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
        setScrollProgress(progress);
        
        const isActuallyScrolling = Math.abs(scrollTop - lastScrollTop) > 0.5;
        lastScrollTop = scrollTop;
        
        if (isActuallyScrolling) {
          setIsScrolling(true);
          
          if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
          }
          
          scrollTimerRef.current = setTimeout(() => {
            setIsScrolling(false);
          }, 100);
        }
      }
    };

    const container = containerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
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
        opacity: modelLoaded ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
      }}
    >
      <Canvas
        camera={{ position: [0, 3, 12], fov: 45 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={5.0} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={20.0}
          castShadow
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={10.0}
        />
        <pointLight
          position={[0, 3, 5]}
          intensity={10.5}
        />
        <Suspense fallback={<LoadingFallback />}>
          <ColumnModel
            scrollProgress={scrollProgress}
            isScrolling={isScrolling}
            onLoaded={() => setModelLoaded(true)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
