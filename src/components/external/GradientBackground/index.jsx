/**
 * Clean gradient background component
 */

import styles from "./GradientBackground.module.css";

// Main gradient background component
export const GradientBackground = ({
  className,
  gradientFrom = "rgba(0, 104, 74, 0.8)",
  gradientMiddle = "rgba(0, 104, 74, 0.4)",
  gradientTo = "transparent", 
  gradientSize = "ellipse 800px 500px",
  gradientPosition = "50% 66%",
}) => {
  return (
    <div 
      className={`${styles.gradientBackground} ${className || ''}`}
      style={{
        background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} 0%, ${gradientMiddle} 40%, ${gradientTo} 80%)`
      }}
    />
  );
}; 