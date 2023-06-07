import React from "react";
import styles from "./Measurement.module.scss";

const SkeletonTable = () => {
  const cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(
      <tr>
        <td>
          <div className={styles.skeletonCell} />
        </td>
        <td>
          <div className={styles.skeletonCell} />
        </td>
        <td>
          <div className={styles.skeletonCell} />
        </td>
        <td>
          <div className={styles.skeletonCell} />
        </td>
      </tr>
    );
  }

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>
              <div className={styles.skeletonCell} />
            </th>
            <th>
              <div className={styles.skeletonCell} />
            </th>
            <th>
              <div className={styles.skeletonCell} />
            </th>
            <th>
              <div className={styles.skeletonCell} />
            </th>
          </tr>
        </thead>
        <tbody>{cells}</tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
