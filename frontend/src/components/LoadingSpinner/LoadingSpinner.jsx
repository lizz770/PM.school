import React from "react";
import styles from "./LoadingSpinner.module.scss";
import { AiOutlineLoading } from "react-icons/ai";
const LoadingSpinner = ({ size, color }) => {
  return (
    <div className={styles.container}>
      <AiOutlineLoading
        size={size}
        style={color ? { color: color } : undefined}
      />
    </div>
  );
};

export default LoadingSpinner;
