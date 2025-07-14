/**
 * Gradient background component source: https://21st.dev/muhammadnadeemmn9485134/bg-gredient/default
 */

import styles from "./GradientBackground.module.css";

export const GradientBackground = ({ 
  className,
  gradientFrom = "#fff",
  gradientTo = "#00ED64",
  gradientSize = "125% 125%",
  gradientPosition = "50% 10%",
  gradientStop = "33.5%"
}) => {
  return (
    <div 
      className={`${styles.gradientBackground} ${className || ''}`}
      style={{
        background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} ${gradientStop}, ${gradientTo} 100%)`
      }}
    />
  );
}; 