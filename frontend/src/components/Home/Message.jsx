import React from "react";
import styles from "./Message.module.scss";
import { MdOutlineWavingHand } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";

const Message = ({ fName, refetch }) => {
  return (
    <div className={styles.helloMessage}>
      <div className={styles.message}>
        <div className={styles.hello}>
          <span>Привет,</span>
          <div className={styles.userIcon}>
            <span>{`${fName}.`}</span>
            <MdOutlineWavingHand />
          </div>
        </div>
        <div className={styles.review}>
          <span>Пожалуйста, просмотрите или обновите Вашу информацию:</span>
        </div>
      </div>
      {refetch && (
        <button className={styles.refresh} onClick={refetch}>
          <BiRefresh size={35} />
        </button>
      )}
    </div>
  );
};


export default Message;
