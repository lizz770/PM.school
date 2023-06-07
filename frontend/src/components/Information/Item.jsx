import React from "react";
import styles from "./Item.module.scss";

const Item = ({ date, value, unitColor }) => {
  return (
    <div className={styles.container}>
      <div className={styles.valueWrapper}>
        <span className={styles.word}></span>
        <span
          className={styles.value}
          style={{
            color: unitColor,
          }}
        >
          {value}
          <span
            style={{
              color: unitColor,
            }}
          ></span>
        </span>
      </div>
      <div className={styles.dateContainer}>
        <span>{`Дата : ${date}`}</span>
      </div>
    </div>
  );
};



export default Item;