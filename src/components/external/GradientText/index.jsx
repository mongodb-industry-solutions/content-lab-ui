import styles from "./GradientText.module.css";

export default function GradientText({
  children,
  className = "",
  colors = ["#00A35C", "#00ED64", "#00A35C", "#00ED64", "#00A35C"],
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
