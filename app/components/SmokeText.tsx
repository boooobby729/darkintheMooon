'use client';

import React, { CSSProperties, useEffect, useRef, useCallback } from 'react';

export interface SmokeTextConfig {
  /** 字体大小，默认 'clamp(36px, 6vw, 80px)' */
  fontSize?: string;
  /** 基础字重（波浪中心值），默认 500 */
  baseWeight?: number;
  /** 字重波动幅度，默认 400（即 100-900 之间波动） */
  weightAmplitude?: number;
  /** 波浪速度，默认 0.06 */
  speed?: number;
  /** 字母间相位差，默认 0.8 */
  phaseGap?: number;
  /** 文字颜色，默认 'rgba(255,255,255,0.85)' */
  color?: string;
  /** 动画延迟（秒），默认 0 */
  delay?: number;
  /** 自定义 className */
  className?: string;
  /** 自定义 style */
  style?: CSSProperties;
}

interface SmokeTextProps {
  children: React.ReactNode;
  config?: SmokeTextConfig;
}

const defaultConfig = {
  fontSize: 'clamp(36px, 6vw, 80px)',
  baseWeight: 500,
  weightAmplitude: 400,
  speed: 0.06,
  phaseGap: 0.8,
  color: 'rgba(255,255,255,0.85)',
  delay: 0,
};

export default function SmokeText({ children, config = {} }: SmokeTextProps) {
  const c = { ...defaultConfig, ...config };
  const containerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const phaseRef = useRef(0);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const startedRef = useRef(false);

  const startAnimation = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const animate = () => {
      phaseRef.current += c.speed;
      const letters = lettersRef.current;
      for (let i = 0; i < letters.length; i++) {
        const val = Math.sin(phaseRef.current + i * c.phaseGap);
        const weight = Math.round(c.baseWeight + val * c.weightAmplitude);
        // clamp between 100 and 900
        letters[i].style.fontWeight = String(Math.max(100, Math.min(900, weight)));
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  }, [c.speed, c.phaseGap, c.baseWeight, c.weightAmplitude]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 拆分文字为单个字母 span
    const text = container.textContent || '';
    container.textContent = '';
    lettersRef.current = [];

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.whiteSpace = 'pre';
      span.style.transition = 'font-weight 0.4s cubic-bezier(.22,1,.36,1)';
      span.style.willChange = 'font-weight';
      span.textContent = text[i];
      container.appendChild(span);
      lettersRef.current.push(span);
    }

    // 延迟启动
    const timer = setTimeout(() => {
      startAnimation();
    }, c.delay * 1000);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      startedRef.current = false;
    };
  }, [children, c.delay, startAnimation]);

  const inlineStyle: CSSProperties = {
    display: 'inline-flex',
    fontSize: c.fontSize,
    fontWeight: 800,
    color: c.color,
    fontFamily: "'Inter', sans-serif",
    ...config.style,
  };

  return (
    <span
      ref={containerRef}
      className={config.className}
      style={inlineStyle}
    >
      {children}
    </span>
  );
}
