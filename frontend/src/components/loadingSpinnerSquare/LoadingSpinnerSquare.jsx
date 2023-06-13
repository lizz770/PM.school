import React from "react";
import styles from "./Loading.module.scss";
import LoadingSpinner from "../loadingSpinner/";

const LoadingSpinnerSquare = ({ h, mt, mb, mr, ml, size }) => {
  return (
    <div
      className={styles.container}
      style={{
        height: h ? `${h}px` : undefined,
        marginTop: mt ? `${mt}px` : undefined,
        marginBottom: mb ? `${mb}px` : undefined,
        marginRight: mr ? `${mr}px` : undefined,
        marginLeft: ml ? `${ml}px` : undefined,
      }}
    >
      <LoadingSpinner size={size} />
    </div>
  );
};

export default LoadingSpinnerSquare;
