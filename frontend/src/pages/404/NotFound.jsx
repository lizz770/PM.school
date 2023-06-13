import React from "react";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <span>404 Этой страницы не существет</span>
      <Link to='/'>Home</Link>
    </div>
  );
};

export default NotFound;
