import styles from "./Info.module.scss";


import { GoMail } from "react-icons/go";
import { MdOutlineSchool } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";


import { Link } from "react-router-dom";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

const Title = ({ Icon, Title, optionClass }) => {
  return (
    <dir className={`${optionClass}`}>
      <div className={styles.iconContainer}>{Icon}</div>
      <span className={styles.title}>{Title}</span>
    </dir>
  );
};


const Comment = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.itemTitleContainer}>
        <div className={`${styles.iconContainer} `}>
          <GoMail />
        </div>
        <span className={styles.title}>{`Заголовок : ${comment?.name}`}</span>
      </div>
      <div className={styles.description}>
        {/* Описание */}
        <div className={styles.doseContainer}>
          <span className={styles.doseSpan}>Описание : </span>
          <span className={styles.dose}>{comment.description}</span>
        </div>
        {/* Мультимедия */}
        <div className={styles.instructionsContainer}>
          <span className={styles.descSpan}>Мультимедия :</span>
          <div className={styles.descContainer}>
            <p>&#8594; {comment?.multimedia}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ meds, isLoading }) => {
  return (
    <div className={styles.container}>

      {/* Отзыв коментарий */}
      <div className={styles.commentsWrapper}>
        <Title
          Title={"comments"}
          Icon={<MdOutlineEmail />}
          optionClass={styles.commentsTitle}
        />
        {isLoading ? (
          <LoadingSpinner size={35} />
        ) : (
          <div className={styles.comments}>
            {meds?.length ? (
              <>
                {meds?.map((comment, index) => (
                  <Comment key={index} comment={comment} />
                ))}
              </>
            ) : (
              <div className={styles.noMeds}>
                <span>Нет обратного отзыва</span>
                <div className={styles.noMedsBg}>
                  <MdOutlineSchool />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Посмотреть */}
        <div className={styles.seeMore}>
          <Link to='/prescriptions'>Посмотреть</Link>
        </div>
      </div>
    </div>
  );
};

Info.defaultProps = {
  meds: [
    {
      name: "name",
      description: "description",
      multimedia: "multimedia",
    },
    {
      name: "name",
      description: "description",
      multimedia: "multimedia",
    },
    {
      name: "name",
      description: "description",
      multimedia: "multimedia",
    },
  ],
  isLoading: false,
};

export default Info;
