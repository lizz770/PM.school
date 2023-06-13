import React from "react";
import styles from "./Requests.module.scss";
import { usePostRequest } from "../../queries/requestQueries";
import Button from "../../components/button";

const User = ({ firstname, lastname, id, myId, userRole }) => {
  const { mutate: postRequest, isSuccess, isLoading } = usePostRequest();
  return (
    <div className={styles.user}>
      <div className={styles.user_name}>{`${firstname} ${lastname}`}</div>
      <div className={styles.user_role}>{userRole}</div>

      <Button
        onClick={
          userRole === "TUTOR"
            ? () => postRequest({ tutorId: id, studentId: myId })
            : () => postRequest({ studentId: id, tutorId: myId })
        }
        tabIndex='0'
        type='button'
        title='Отправить запрос'
        disabled={isSuccess || isLoading}
        isLoading={isLoading}
      >
        {isSuccess && !isLoading && <span>Запрос отправлен</span>}
        {!isSuccess && !isLoading && <span>Отправить запрос</span>}
      </Button>
    </div>
  );
};

User.defaultProps = {
  name: "John Doe",
  role: "user",
};

export default User;
