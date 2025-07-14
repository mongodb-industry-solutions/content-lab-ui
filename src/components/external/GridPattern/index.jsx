"use client";

/**
 * Grid pattern component source: https://magicui.design/docs/components/animated-grid-pattern
 */

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import PropTypes from "prop-types";
import styles from "./GridPattern.module.css";

export default function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className = "",
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState(() => generateSquares(numSquares));

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
    }));
  }

  const updateSquarePosition = (id) => {
    setSquares((current) =>
      current.map((sq) =>
        sq.id === id ? { ...sq, pos: getPos() } : sq
      )
    );
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
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

  // Merge CSS-module class with any passed-in className
  const combinedClassName = `${styles.container}${className ? ` ${className}` : ""}`;

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={combinedClassName}
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
          />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill={`url(#${id})`}
        strokeWidth={0}
      />

      <svg x={x} y={y} className={styles.overflowVisible}>
        {squares.map(({ pos: [sx, sy], id: sqId }, index) => (
          <motion.rect
            key={`${sx}-${sy}-${sqId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * repeatDelay,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(sqId)}
            width={width - 1}
            height={height - 1}
            x={sx * width + 1}
            y={sy * height + 1}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </svg>
    </svg>
  );
}

GridPattern.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  strokeDasharray: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  numSquares: PropTypes.number,
  maxOpacity: PropTypes.number,
  duration: PropTypes.number,
  repeatDelay: PropTypes.number,
  className: PropTypes.string,
};
