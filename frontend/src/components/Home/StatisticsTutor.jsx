import React from "react";
import styles from "./StatisticsTutor.module.scss";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineSchool } from "react-icons/md";
const StatisticsTutor = ({ students, prescriptions, risks }) => {
  return (
    <div className={styles.container}>
      {/* student NUMBER */}
      <div className={styles.outerContainer}>
        <div className={styles.students}>
          <div className={styles.iconContainer}>
            <IoPeopleOutline />
          </div>
          <div className={styles.num}>{students ? students.length : "-"}</div>
        </div>
        <div className={styles.slogan}>
          <span>Студенты</span>
          <p>Твои студенты</p>
        </div>
      </div>

      {/* Фидбэкк */}
      <div className={styles.outerContainer}>
        <div className={styles.prescriptions}>
          <div className={styles.iconContainer}>
            <MdOutlineSchool />
          </div>
          <div className={styles.num}>
            {prescriptions ? prescriptions.length : "-"}
          </div>
        </div>
        <div className={styles.slogan}>
          <span>FeedBack</span>
          <p>Обратная сзяь за последнии дни</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTutor;
