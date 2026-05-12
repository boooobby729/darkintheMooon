'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ===== 配置项 ===== */
interface ChromaScrollConfig {
  /** 最大拉伸量（px），默认 500 */
  maxStretch?: number;
  /** 阻尼系数 0-1，越小越难拉，默认 0.4 */
  damping?: number;
  /** 衰减系数 0-1，越大回弹越慢，默认 0.96 */
  decay?: number;
  /** 吸附阈值（px），低于此值直接归零，默认 0.5 */
  snapThreshold?: number;
  /** 输入静默时间（ms），停止输入后多久开始回弹，默认 80 */
  inputQuietMs?: number;
  /** 底部偏移（px），chroma 层藏在屏幕外的距离，默认 200 */
  bottomOffset?: number;
  /** 层高度（px），默认 700 */
  layerHeight?: number;
  /** 淡出阈值 0-1，低于此 progress 时同步淡出，默认 0.3 */
  fadeThreshold?: number;

  /* ---- 颜色配置 ---- */
  /** 底层渐变色组（从底到顶） */
  colorsL1?: string[];
  /** 中层渐变色组 */
  colorsL2?: string[];
  /** 顶层渐变色组 */
  colorsL3?: string[];

  /* ---- 模糊配置 ---- */
  blurL1?: number;
  blurL2?: number;
  blurL3?: number;

  /* ---- 遮罩配置 ---- */
  maskEllipseW?: string;
  maskEllipseH?: string;
}

const DEFAULT_CONFIG: Required<ChromaScrollConfig> = {
  maxStretch: 500,
  damping: 0.4,
  decay: 0.96,
  snapThreshold: 0.5,
  inputQuietMs: 80,
  bottomOffset: 200,
  layerHeight: 700,
  fadeThreshold: 0.3,

  colorsL1: [
    'rgba(255,172,227,.85) 0%',
    'rgba(255,200,200,.65) 10%',
    'rgba(255,241,172,.55) 20%',
    'rgba(190,235,195,.5) 30%',
    'rgba(121,201,255,.6) 40%',
    'rgba(90,140,230,.5) 50%',
    'rgba(74,96,209,.45) 60%',
    'rgba(60,106,255,.35) 70%',
    'rgba(60,106,255,.18) 80%',
    'rgba(40,60,150,.06) 90%',
    'transparent 100%',
  ],
  colorsL2: [
    'rgba(255,172,227,.7) 0%',
    'rgba(255,190,210,.55) 8%',
    'rgba(255,220,180,.45) 16%',
    'rgba(255,241,172,.4) 24%',
    'rgba(200,240,190,.38) 32%',
    'rgba(121,201,255,.5) 40%',
    'rgba(80,146,199,.42) 50%',
    'rgba(74,96,209,.38) 58%',
    'rgba(60,106,255,.3) 66%',
    'rgba(60,106,255,.12) 78%',
    'transparent 100%',
  ],
  colorsL3: [
    'rgba(255,172,227,.5) 0%',
    'rgba(255,200,210,.38) 7%',
    'rgba(255,230,180,.3) 14%',
    'rgba(255,241,172,.25) 21%',
    'rgba(180,238,200,.25) 28%',
    'rgba(159,234,185,.25) 35%',
    'rgba(121,201,255,.3) 42%',
    'rgba(80,146,199,.25) 50%',
    'rgba(74,96,209,.22) 58%',
    'rgba(60,106,255,.14) 68%',
    'rgba(60,106,255,.05) 80%',
    'transparent 100%',
  ],

  blurL1: 50,
  blurL2: 28,
  blurL3: 12,

  maskEllipseW: '55%',
  maskEllipseH: '50%',
};

/* ===== 组件 ===== */
interface ChromaScrollProps {
  /** 滚动容器 Ref；传入时监听该容器，否则监听 window */
  scrollRef?: React.RefObject<HTMLElement | null>;
  /** 配置覆盖 */
  config?: ChromaScrollConfig;
}

export default function ChromaScroll({ scrollRef, config }: ChromaScrollProps) {
  const cfg = { ...DEFAULT_CONFIG, ...config } as Required<ChromaScrollConfig>;

  const layerRef = useRef<HTMLDivElement>(null);
  const stretchRef = useRef(0);
  const animIdRef = useRef<number | null>(null);
  const lastInputRef = useRef(0);
  const touchLastYRef = useRef(0);

  /* ---- helpers ---- */
  const getScrollContainer = useCallback(() => {
    return scrollRef?.current ?? null;
  }, [scrollRef]);

  const checkBottom = useCallback(() => {
    const el = getScrollContainer();
    if (el) {
      return el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    }
    return (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2
    );
  }, [getScrollContainer]);

  const renderStretch = useCallback(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const progress = stretchRef.current / cfg.maxStretch;
    const ty = 100 * (1 - progress);
    layer.style.transform = `translateY(${ty}%)`;
    layer.style.opacity =
      progress < cfg.fadeThreshold
        ? String(progress / cfg.fadeThreshold)
        : '1';
  }, [cfg.maxStretch, cfg.fadeThreshold]);

  const decayLoop = useCallback(() => {
    if (Date.now() - lastInputRef.current < cfg.inputQuietMs) {
      animIdRef.current = requestAnimationFrame(decayLoop);
      return;
    }
    stretchRef.current *= cfg.decay;
    if (stretchRef.current < cfg.snapThreshold) {
      stretchRef.current = 0;
      renderStretch();
      animIdRef.current = null;
      return;
    }
    renderStretch();
    animIdRef.current = requestAnimationFrame(decayLoop);
  }, [cfg.decay, cfg.snapThreshold, cfg.inputQuietMs, renderStretch]);

  const startDecay = useCallback(() => {
    if (animIdRef.current) return;
    animIdRef.current = requestAnimationFrame(decayLoop);
  }, [decayLoop]);

  const applyStretch = useCallback(
    (delta: number) => {
      const resistance = 1 - stretchRef.current / cfg.maxStretch;
      stretchRef.current +=
        delta * cfg.damping * Math.max(resistance, 0.05);
      stretchRef.current = Math.max(
        0,
        Math.min(cfg.maxStretch, stretchRef.current),
      );
      renderStretch();
      lastInputRef.current = Date.now();
      startDecay();
    },
    [cfg.maxStretch, cfg.damping, renderStretch, startDecay],
  );

  /* ---- event bindigs ---- */
  useEffect(() => {
    const el = getScrollContainer();
    const target = el ?? window;

    const onWheel = (e: Event) => {
      const we = e as WheelEvent;
      if (we.deltaY > 0 && checkBottom()) {
        we.preventDefault();
        applyStretch(we.deltaY);
      }
      if (we.deltaY < 0 && stretchRef.current > 0) {
        we.preventDefault();
        stretchRef.current = Math.max(0, stretchRef.current + we.deltaY * 0.5);
        renderStretch();
      }
    };

    const onTouchStart = (e: Event) => {
      const te = e as TouchEvent;
      touchLastYRef.current = te.touches[0].clientY;
    };

    const onTouchMove = (e: Event) => {
      const te = e as TouchEvent;
      const y = te.touches[0].clientY;
      const delta = touchLastYRef.current - y;
      touchLastYRef.current = y;
      if (delta > 0 && checkBottom()) {
        te.preventDefault();
        applyStretch(delta);
      }
      if (delta < 0 && stretchRef.current > 0) {
        te.preventDefault();
        stretchRef.current = Math.max(
          0,
          stretchRef.current + delta * 0.3,
        );
        renderStretch();
      }
    };

    const onTouchEnd = () => {
      lastInputRef.current = Date.now();
      startDecay();
    };

    target.addEventListener('wheel', onWheel, { passive: false });
    target.addEventListener('touchstart', onTouchStart, { passive: true });
    target.addEventListener('touchmove', onTouchMove, { passive: false });
    target.addEventListener('touchend', onTouchEnd);

    return () => {
      target.removeEventListener('wheel', onWheel);
      target.removeEventListener('touchstart', onTouchStart);
      target.removeEventListener('touchmove', onTouchMove);
      target.removeEventListener('touchend', onTouchEnd);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [getScrollContainer, checkBottom, applyStretch, renderStretch, startDecay]);

  /* ---- CSS 变量 & 样式 ---- */
  const maskImage = `radial-gradient(ellipse ${cfg.maskEllipseW} ${cfg.maskEllipseH} at 50% 60%, black 0%, rgba(0,0,0,.7) 40%, rgba(0,0,0,.3) 65%, transparent 100%)`;

  const layerBase: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  };

  return (
    <div
      ref={layerRef}
      style={{
        position: 'fixed',
        left: '-120px',
        right: '-120px',
        bottom: `-${cfg.bottomOffset}px`,
        height: `${cfg.layerHeight}px`,
        zIndex: 50,
        pointerEvents: 'none',
        transform: 'translateY(100%)',
        willChange: 'transform',
        WebkitMaskImage: maskImage,
        maskImage,
      }}
    >
      {/* L1 — 底层大面积柔和光晕 */}
      <div
        style={{
          ...layerBase,
          background: `linear-gradient(to top, ${cfg.colorsL1.join(', ')})`,
          filter: `blur(${cfg.blurL1}px)`,
        }}
      />
      {/* L2 — 中层色彩丰富度 */}
      <div
        style={{
          ...layerBase,
          background: `linear-gradient(to top, ${cfg.colorsL2.join(', ')})`,
          filter: `blur(${cfg.blurL2}px)`,
        }}
      />
      {/* L3 — 顶层层次感 */}
      <div
        style={{
          ...layerBase,
          background: `linear-gradient(to top, ${cfg.colorsL3.join(', ')})`,
          filter: `blur(${cfg.blurL3}px)`,
        }}
      />
    </div>
  );
}
