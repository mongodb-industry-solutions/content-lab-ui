/**
 * Gradient text component source: https://reactbits.dev/text-animations/gradient-text
 */

import styles from "./GradientText.module.css";

export default function GradientText({
  children,
  className = "",
  colors = ["#015f61", "#013030", "#015759", "#012828", "#015051"],
  animationSpeed = 8,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`${styles.animatedGradientText} ${className}`}>
      {showBorder && <div className={styles.gradientOverlay} style={gradientStyle}></div>}
      <div className={styles.textContent} style={gradientStyle}>{children}</div>
    </div>
  );
}
