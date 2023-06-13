import React from "react";
import styles from "./FilterWrapper.module.scss";

const FilterWrapper = ({ children }) => {
  return <div className={styles.filters}>{children}</div>;
};

export default FilterWrapper;
