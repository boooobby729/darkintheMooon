'use client';

import { useEffect, useRef, useState } from 'react';

const MODEL_URL = '/api/mediapipe/hand-landmarker';
// 与 npm 安装的版本保持一致
const WASM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';

export type FlameGesture = {
  scale: number;
  x: number;
  y: number;
  active: boolean;
  palmOpen: boolean; // 手掌张开
};

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// MediaPipe 手部关键点索引
// 4=拇指尖, 8=食指尖, 12=中指尖, 16=无名指尖, 20=小指尖
// 2=拇指MCP, 5=食指MCP, 9=中指MCP, 13=无名指MCP, 17=小指MCP
// 3=拇指IP, 6=食指PIP, 10=中指PIP, 14=无名指PIP, 18=小指PIP
function isFingerExtended(
  hand: { x: number; y: number; z: number }[],
  tipIdx: number,
  pipIdx: number,
  mcpIdx: number,
): boolean {
  // y 轴向下，指尖 y 值比 MCP 小 → 手指伸展
  // 用 PIP 到 MCP 的方向判断更稳定
  const tip = hand[tipIdx];
  const pip = hand[pipIdx];
  const mcp = hand[mcpIdx];
  // 指尖到MCP的距离 > PIP到MCP距离 * 1.4 → 伸展
  return dist(tip, mcp) > dist(pip, mcp) * 1.4;
}

function isThumbExtended(hand: { x: number; y: number; z: number }[]): boolean {
  // 拇指用水平距离判断（拇指在侧面伸展）
  return dist(hand[4], hand[2]) > dist(hand[3], hand[2]) * 1.3;
}

function getPalmOpenness(hand: { x: number; y: number; z: number }[]): {
  palmOpen: boolean;
  openFingers: number;
} {
  const ext = [
    isThumbExtended(hand),
    isFingerExtended(hand, 8, 6, 5),   // 食指
    isFingerExtended(hand, 12, 10, 9),  // 中指
    isFingerExtended(hand, 16, 14, 13), // 无名指
    isFingerExtended(hand, 20, 18, 17), // 小指
  ];
  const openFingers = ext.filter(Boolean).length;
  return { palmOpen: openFingers >= 3, openFingers };
}

export function useGestureFlame() {
  const [gestures, setGestures] = useState<FlameGesture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const landmarkerRef = useRef<any>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { FilesetResolver, HandLandmarker } = await import(
          '@mediapipe/tasks-vision'
        );
        const vision = await FilesetResolver.forVisionTasks(WASM_URL);
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL },
          numHands: 2,
          runningMode: 'VIDEO',
        });

        if (!mounted) return;
        landmarkerRef.current = landmarker;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 320, height: 240 },
        });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        video.style.cssText = 'position:fixed;opacity:0;pointer-events:none;width:1px;height:1px;';
        document.body.appendChild(video);
        await video.play();
        videoRef.current = video;

        function detect() {
          if (!mounted || !landmarkerRef.current || !videoRef.current) return;
          const video = videoRef.current;
          if (video.readyState < 2) {
            rafRef.current = requestAnimationFrame(detect);
            return;
          }
          const result = landmarkerRef.current.detectForVideo(
            video,
            performance.now()
          );
          if (result.landmarks?.length > 0) {
            const list: FlameGesture[] = result.landmarks.map((hand: { x: number; y: number; z: number }[]) => {
              // 用手指伸展检测判断手掌是否张开（更准确）
              const { palmOpen, openFingers } = getPalmOpenness(hand);
              // scale 根据张开手指数来映射，0根→0.6，5根→1.8
              const scale = Math.min(1.8, 0.6 + (openFingers / 5) * 1.2);
              const cx = hand.reduce((s, p) => s + p.x, 0) / hand.length;
              const cy = hand.reduce((s, p) => s + p.y, 0) / hand.length;
              return {
                scale,
                x: (cx - 0.5) * 2,
                y: (cy - 0.5) * 2,
                active: true,
                palmOpen,
              };
            });
            setGestures(list);
          } else {
            setGestures([]);
          }
          rafRef.current = requestAnimationFrame(detect);
        }
        detect();
      } catch (e) {
        if (mounted) setError(String(e));
      }
    }

    init();
    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
      videoRef.current?.parentNode?.removeChild(videoRef.current);
    };
  }, []);

  return { gestures, error };
}
