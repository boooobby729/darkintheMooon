'use client';

import React, { CSSProperties } from 'react';

export interface SmokeTextConfig {
  /** 字体大小，默认 '80px' */
  fontSize?: string;
  /** 字体粗细，默认 'bold' */
  fontWeight?: string | number;
  /** 文字颜色，默认继承父元素 */
  color?: string;
  /** 动画时长（秒），默认 4 */
  duration?: number;
  /** 动画延迟（秒），默认 0 */
  delay?: number;
  /** blur 峰值（px），默认 8 */
  blurAmount?: number;
  /** opacity 最低值，默认 0.3 */
  minOpacity?: number;
  /** 上浮距离（px），默认 20 */
  translateY?: number;
  /** 动画缓动，默认 'ease-in-out' */
  easing?: string;
  /** 自定义 className */
  className?: string;
  /** 自定义 style */
  style?: CSSProperties;
}

interface SmokeTextProps {
  children: React.ReactNode;
  config?: SmokeTextConfig;
}

const defaultConfig: Required<Omit<SmokeTextConfig, 'className' | 'style'>> = {
  fontSize: '80px',
  fontWeight: 'bold',
  color: 'inherit',
  duration: 4,
  delay: 0,
  blurAmount: 8,
  minOpacity: 0.3,
  translateY: 20,
  easing: 'ease-in-out',
};

export default function SmokeText({ children, config = {} }: SmokeTextProps) {
  const c = { ...defaultConfig, ...config };

  const animationName = `smokeText_${c.blurAmount}_${c.minOpacity}_${c.translateY}`.replace(/\./g, '_');

  const keyframes = `
    @keyframes ${animationName} {
      0%, 100% {
        filter: blur(0px);
        opacity: 1;
        transform: translateY(0);
      }
      50% {
        filter: blur(${c.blurAmount}px);
        opacity: ${c.minOpacity};
        transform: translateY(-${c.translateY}px);
      }
    }
  `;

  const inlineStyle: CSSProperties = {
    fontSize: c.fontSize,
    fontWeight: c.fontWeight,
    color: c.color,
    animation: `${animationName} ${c.duration}s ${c.easing} ${c.delay}s infinite`,
    display: 'inline-block',
    ...config.style,
  };

  return (
    <>
      <style>{keyframes}</style>
      <span
        className={config.className}
        style={inlineStyle}
      >
        {children}
      </span>
    </>
  );
}
