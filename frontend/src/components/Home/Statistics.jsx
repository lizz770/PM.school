import styles from "./Statistics.module.scss";

//Иконки

import { TfiVideoClapper } from "react-icons/tfi";
import { MdDesignServices } from "react-icons/md";
import { MdOutlineInsertPhoto } from "react-icons/md";


import LoadingSpinner from "../loadingSpinner";

const Statistics = ({ hr, tp, bp, isLoading }) => {
  return (
    <div className={styles.container}>
      {/* Медиа Дизайн */}
      <div className={`${styles.heartRateContainer} ${styles.outer}`}>
        <div className={styles.inner}>
          <div className={styles.valueContainer}>
            <div className={styles.iconContainer}>
              <MdDesignServices />
            </div>
            <span className={styles.value}>
              {bp.sys && !isLoading ? (
                `${bp.sys}`
              ) : isLoading ? (
                <LoadingSpinner size={20} />
              ) : (
                ""
              )}
            </span>
          </div>
          <span className={styles.title}>Медиа Дизайн</span>
          <p className={styles.info}>
          Создание и Проектирование визуальных элементов и контента для различных медиа-платформ
          </p>
        </div>
      </div>
      {/* Фото продакшн */}
      <div className={`${styles.temperatureContainer} ${styles.outer}`}>
        <div className={styles.inner}>
          <div className={styles.valueContainer}>
            <div className={styles.iconContainer}>
              <MdOutlineInsertPhoto />
            </div>
            <span className={styles.value}>
              {hr && !isLoading ? (
                `${hr}`
              ) : isLoading ? (
                <LoadingSpinner size={20} />
              ) : (
                ""
              )}
            </span>
          </div>
          <span className={styles.title}>Фото-продакшн</span>
          <p className={styles.info}>
          Фокус на создании и производстве фотографий с использованием различных техник и композиций
          </p>
        </div>
      </div>

      {/* Видео продакшн */}
      <div className={`${styles.bloodPressureContainer} ${styles.outer}`}>
        <div className={styles.inner}>
          <div className={styles.valueContainer}>
            <div className={styles.iconContainer}>
              <TfiVideoClapper />
            </div>
            <span className={styles.value}>
              {tp && !isLoading ? (
                `${tp}`
              ) : isLoading ? (
                <LoadingSpinner size={20} />
              ) : (
                ""
              )}
            </span>
          </div>
          <span className={styles.title}>Видеопродакшн</span>
          <p className={styles.info}>
          Связан с созданием и производством видеоматериалов.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
