'use client';

export type FlameGesture = {
  scale?: number;
  x?: number;
  y?: number;
  active?: boolean;
  palmOpen?: boolean;
};

type Props = {
  gestures?: FlameGesture[];
};

const ORANGE_OUTER =
  'linear-gradient(to top, rgba(180, 50, 0, 0.9) 0%, rgba(255, 100, 0, 0.6) 30%, rgba(255, 180, 0, 0.2) 70%, transparent 100%)';
const ORANGE_MID =
  'linear-gradient(to top, rgba(255, 80, 0, 0.95) 0%, rgba(255, 150, 0, 0.8) 40%, rgba(255, 220, 0, 0.4) 80%, transparent 100%)';
const ORANGE_INNER =
  'linear-gradient(to top, rgba(255, 180, 0, 1) 0%, rgba(255, 220, 100, 0.9) 30%, rgba(255, 255, 200, 0.7) 60%, transparent 100%)';
const ORANGE_BASE =
  'radial-gradient(ellipse, rgba(255, 100, 0, 0.8) 0%, rgba(255, 60, 0, 0.4) 50%, transparent 70%)';

const BLUE_PURPLE_OUTER =
  'linear-gradient(to top, rgba(80, 30, 150, 0.9) 0%, rgba(120, 60, 200, 0.7) 30%, rgba(100, 150, 255, 0.3) 70%, transparent 100%)';
const BLUE_PURPLE_MID =
  'linear-gradient(to top, rgba(100, 50, 200, 0.95) 0%, rgba(150, 100, 255, 0.8) 40%, rgba(180, 150, 255, 0.5) 80%, transparent 100%)';
const BLUE_PURPLE_INNER =
  'linear-gradient(to top, rgba(150, 100, 255, 1) 0%, rgba(200, 180, 255, 0.9) 30%, rgba(220, 210, 255, 0.7) 60%, transparent 100%)';
const BLUE_PURPLE_BASE =
  'radial-gradient(ellipse, rgba(120, 60, 200, 0.8) 0%, rgba(80, 40, 150, 0.4) 50%, transparent 70%)';

const PARTICLE_CONFIGS = [
  { delay: 0, drift: '-8px', size: 6 },
  { delay: 0.15, drift: '6px', size: 8 },
  { delay: 0.3, drift: '-4px', size: 5 },
  { delay: 0.45, drift: '10px', size: 7 },
  { delay: 0.6, drift: '-6px', size: 6 },
  { delay: 0.2, drift: '4px', size: 5 },
  { delay: 0.35, drift: '-10px', size: 8 },
  { delay: 0.5, drift: '8px', size: 6 },
  { delay: 0.1, drift: '-3px', size: 7 },
  { delay: 0.4, drift: '5px', size: 5 },
];

function SingleFlame({
  gesture,
  isBlue,
  isSplit,
}: {
  gesture: FlameGesture | null;
  isBlue: boolean;
  isSplit: boolean;
}) {
  const palmOpen = gesture?.active && gesture?.palmOpen;
  const scale = palmOpen ? (isSplit ? 1.1 : 1.5) : 1;
  const offsetX = gesture?.active ? (gesture.x ?? 0) * (isSplit ? 60 : 80) : 0;
  const offsetY = gesture?.active ? (gesture.y ?? 0) * -50 : 0;

  const outerBg = palmOpen ? BLUE_PURPLE_OUTER : ORANGE_OUTER;
  const midBg = palmOpen ? BLUE_PURPLE_MID : ORANGE_MID;
  const innerBg = palmOpen ? BLUE_PURPLE_INNER : ORANGE_INNER;
  const baseBg = palmOpen ? BLUE_PURPLE_BASE : ORANGE_BASE;

  const particleColor = palmOpen
    ? 'rgba(180, 120, 255, 0.9)'
    : 'rgba(255, 150, 50, 0.9)';

  const flameScale = isSplit ? 0.85 : 1;

  return (
    <div
      style={{
        position: 'relative',
        width: 120 * flameScale,
        height: 200 * flameScale,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        transformOrigin: 'center bottom',
        transition: 'transform 0.2s ease-out',
      }}
    >
      {/* 粒子层 - 上升浮动的粒子 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: 80,
          height: 180,
          overflow: 'hidden',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        {PARTICLE_CONFIGS.map((p, i) => (
          <div
            key={i}
            className="flame-particle-dot"
            style={{
              width: p.size,
              height: p.size,
              marginLeft: `${-p.size / 2}px`,
              background: particleColor,
              boxShadow: `0 0 ${p.size * 2}px ${particleColor}`,
              animationDelay: `${p.delay}s`,
              ['--drift' as string]: p.drift,
              left: `${35 + (i % 5) * 8}%`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
      <div
        className="flame-outer flame-glow"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 140,
          height: 200,
          background: outerBg,
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 50% 90%, 30% 100%, 0% 50%)',
          filter: 'blur(8px)',
          opacity: 0.85,
          transition: 'background 0.2s ease-out',
        }}
      />
      <div
        className="flame-middle"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 100,
          height: 180,
          background: midBg,
          clipPath: 'polygon(35% 0%, 65% 0%, 100% 45%, 65% 100%, 50% 92%, 35% 100%, 0% 45%)',
          filter: 'blur(2px)',
          transition: 'background 0.2s ease-out',
        }}
      />
      <div
        className="flame-inner flame-particle"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 60,
          height: 140,
          background: innerBg,
          clipPath: 'polygon(40% 0%, 60% 0%, 85% 50%, 60% 100%, 50% 95%, 40% 100%, 15% 50%)',
          transition: 'background 0.2s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80,
          height: 30,
          background: baseBg,
          borderRadius: '50%',
          filter: 'blur(6px)',
          animation: 'flameBrightness 0.6s ease-in-out infinite',
          transition: 'background 0.2s ease-out',
        }}
      />
    </div>
  );
}

export default function FlameAnimation({ gestures = [] }: Props) {
  const displayGestures: FlameGesture[] =
    gestures.length > 0
      ? gestures
      : [{ active: false, palmOpen: false, scale: 1, x: 0, y: 0 }];

  const isSplit = displayGestures.length >= 2;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: isSplit ? 40 : 0,
        margin: '20px auto',
        minHeight: 220,
      }}
    >
      {displayGestures.map((g, i) => (
        <SingleFlame
          key={i}
          gesture={g}
          isBlue={!!g.palmOpen}
          isSplit={isSplit}
        />
      ))}
    </div>
  );
}
