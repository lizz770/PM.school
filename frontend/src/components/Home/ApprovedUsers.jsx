import styles from "./ApprovedUsers.module.scss";
import { FaUserGraduate } from "react-icons/fa";
import { VscInfo } from "react-icons/vsc";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import LoadingSpinner from "../loadingSpinner";

const ApprovedUser = ({ user }) => {
  return (
    <div className={styles.user}>
      <dir className={styles.info}>
        <div className={styles.iconContainer}>
          <VscInfo />
        </div>
        <span
          className={styles.name}
        >{`${user?.firstName} ${user?.lastName}`}</span>
      </dir>
      <div className={styles.approved}>
        <span>{user.status ?? "PENDING"}</span>
      </div>
    </div>
  );
};

ApprovedUser.defaultProps = {
  user: {
    firstName: "John",
    lastName: "Doe",
  },
};

const ApprovedUsers = ({ user, approvedUsers, isLoading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.titleWrapper}>
          <div className={styles.iconContainer}>
            {user?.userRole === "STUDENT" ? <FaUserGraduate /> : <IoMdPerson />}
          </div>
          <span>
            {user?.userRole === "STUDENT" ? "Мои кураторы" : "Мои студенты"}
          </span>
        </div>
        {isLoading ? (
          <div style={{ margin: "1.2rem 0" }}>
            <LoadingSpinner size={35} />
          </div>
        ) : (
          <div className={styles.approvedUsers}>
            {approvedUsers?.length > 0 ? (
              approvedUsers.map((user) => {
                return <ApprovedUser key={user?.id} user={user} />;
              })
            ) : (
              <div className={styles.noApprovedUsers}>
                <span>
                  {user?.userRole === "STUDENT"
                    ? "Нет одобренных кураторов"
                    : "Нет одобренных студентов"}
                </span>
                <div className={styles.iconWrapper}>
                  {user?.userRole === "STUDENT" ? (
                    <FaUserGraduate />
                  ) : (
                    <IoMdPerson />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <div
          className={styles.seeMore}
          onClick={() => setAll(false, false, true, false)}
        >
          <Link to={user?.userRole === "STUDENT" ? "/tutors" : "/students"}>
            Посмотреть
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApprovedUsers;

ApprovedUsers.defaultProps = {
  user: {
    role: "STUDENT",
  },
  users: [],
  isLoading: false,
};
