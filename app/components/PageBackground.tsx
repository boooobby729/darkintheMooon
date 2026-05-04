'use client';

/**
 * Shared page background with animated gradient circles + blur overlay.
 * Used across all pages for consistent visual effect.
 */
export default function PageBackground() {
  return (
    <>
      {/* Animated Gradient Circles Background */}
      <div className="gradient-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
        <div className="gradient-circle circle-4"></div>
      </div>

      {/* Blur Overlay - single optimized layer */}
      <div className="rectangles-container" />
    </>
  );
}
