"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from './GridPattern.module.css';

export default function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className = '',
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}) {
  const id = useId();
  const containerRef = useRef(null);
  const updateCounterRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState([]);

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }

  function generateSquares(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
      animationDelay: i * 0.1,
      uniqueKey: `${i}-${updateCounterRef.current}`,
    }));
  }

  const updateSquarePosition = (squareId) => {
    updateCounterRef.current += 1;
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === squareId
          ? {
              ...sq,
              pos: getPos(),
              uniqueKey: `${squareId}-${updateCounterRef.current}`,
            }
          : sq,
      ),
    );
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      updateCounterRef.current = 0;
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={`${styles.gridSvg} ${className}`}
      style={{
        '--max-opacity': maxOpacity,
        '--animation-duration': `${duration}s`,
        '--repeat-delay': `${repeatDelay}s`,
      }}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
            className={styles.gridPath}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className={styles.overflow}>
        {squares.map(({ pos: [posX, posY], id: squareId, animationDelay, uniqueKey }, index) => (
          <rect
            key={uniqueKey}
            className={styles.animatedSquare}
            style={{
              '--animation-delay': `${animationDelay}s`,
            }}
            width={width - 1}
            height={height - 1}
            x={posX * width + 1}
            y={posY * height + 1}
            fill="currentColor"
            strokeWidth="0"
            onAnimationEnd={() => {
              // Delay before updating position for repeat effect
              setTimeout(() => updateSquarePosition(squareId), repeatDelay * 1000);
            }}
          />
        ))}
      </svg>
    </svg>
  );
}

