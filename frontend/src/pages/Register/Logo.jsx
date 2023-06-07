import React from "react";
import styles from "./Logo.module.scss";
import { useTheme } from "../../context/ThemeProvider";

const Logo = () => {
  const { mode } = useTheme();
  return (
    <div className={styles.circleContainer}>
      
      <div className={styles.circleTop}></div>
      
      <div className={styles.circleBtm}>
        <div
          className={styles.inner}
          style={mode ? { maxHeight: "120px" } : undefined}
        ></div>
        
      </div>
      
    </div>
    
  );
};

export default Logo;