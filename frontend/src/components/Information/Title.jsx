import styles from "./Title.module.scss";

const Title = ({ children, icon }) => {
  return (
    <div className={styles.titleContainer}>
      <span>{children}</span>
      <div className={styles.iconContainer}>{icon}</div>
    </div>
  );
};

Title.defaultProps = {
  children: "Title",
  icon: undefined,
};

export default Title;
