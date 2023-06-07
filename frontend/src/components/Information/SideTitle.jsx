import React from "react";
import styles from "./SideTitle.module.scss";
import { useTheme } from "../../context/ThemeProvider";

const SideTitle = ({ icon, children }) => {
  const { mode } = useTheme();
  return (
    <div className={styles.sideTitle}>
      <div
        className={`${styles.iconContainer} ${
          mode && styles.darkIconContainer
        }`}
      >
        {icon}
      </div>
      <span>{children}</span>
    </div>
  );
};

export default SideTitle;