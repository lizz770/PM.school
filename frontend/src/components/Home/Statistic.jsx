import styles from "./Statistic.module.scss";

//иконки
//фото
import { HiOutlinePhotograph} from "react-icons/hi";
//камера
import { BsCameraVideo } from "react-icons/bs";
//статьи дизайн
import { MdDesignServices } from "react-icons/md";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Statistics = ({ design, photo, video, isLoading }) => {
    return (
      <div className={styles.container}>
        {/*Медиадизайн */}
        <div className={`${styles.designContainer} ${styles.outer}`}>
          <div className={styles.inner}>
            <div className={styles.valueContainer}>
              <div className={styles.iconContainer}>
                <MdDesignServices />
              </div>
              <span className={styles.value}>
                {design && !isLoading ? (
                  `${design}`
                ) : isLoading ? (
                  <LoadingSpinner size={20} />
                ) : (
                  " "
                )}
              </span>
            </div>
            <span className={styles.title}>Медиадизайн</span>
            <p className={styles.info}>
            Медиадизайн-это разработка цифрового наполнения 
            для публикации на разных площадках в рамках различных контекстов
            </p>
          </div>
        </div>
        {/* Фото-продакшн */}
        <div className={`${styles.photoContainer} ${styles.outer}`}>
          <div className={styles.inner}>
            <div className={styles.valueContainer}>
              <div className={styles.iconContainer}>
                <HiOutlinePhotograph />
              </div>
              <span className={styles.value}>
                {photo && !isLoading ? (
                  `${photo} `
                ) : isLoading ? (
                  <LoadingSpinner size={20} />
                ) : (
                  " "
                )}
              </span>
            </div>
            <span className={styles.title}>Фото-продакшн</span>
            <p className={styles.info}>
            Фотогра́фия — технология записи изображения путём регистрации оптических излучений. 
            </p>
          </div>
        </div>
  
        {/* Видео продакшн */}
        <div className={`${styles.videoContainer} ${styles.outer}`}>
          <div className={styles.inner}>
            <div className={styles.valueContainer}>
              <div className={styles.iconContainer}>
                <BsCameraVideo />
              </div>
              <span className={styles.value}>
                {video && !isLoading ? (
                  `${video} `
                ) : isLoading ? (
                  <LoadingSpinner size={20} />
                ) : (
                  " "
                )}
              </span>
            </div>
            <span className={styles.title}>Видео-продакшн</span>
            <p className={styles.info}>
            Ви́део — электронная технология формирования, записи, обработки, передачи, 
            хранения и воспроизведения подвижного изображения.
           
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  
  

export default Statistics;