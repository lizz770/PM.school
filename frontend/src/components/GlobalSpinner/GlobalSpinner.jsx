import styles from "./GlobalSpinner.module.scss";

const GlobalSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default GlobalSpinner;
