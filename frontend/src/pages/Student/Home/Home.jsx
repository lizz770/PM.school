import React from "react";
import Button from "../../../components/Button";
import { useWhoami, useLogout } from "../../../queries/authQueries";
import { useDeleteAccount } from "../../../queries/accountQueries";
import styles from "./Home.module.scss";
import { useMobileNav } from "../../../context/MobileNavProvider";
import Message from "../../../components/Home/Message";
import Statistics from "../../../components/Home/Statistic";


const Home = () => {
  const { data, isLoading } = useWhoami();
  const { mutate: logout, isLoading: loggingOut } = useLogout();
  const { mutate: deleteAccount, deletingAcc } = useDeleteAccount();

  const {isOpened, setIsOpened} = useMobileNav();

  return (
    <div className={styles.container}>
      <Message fName={data?.user?.firstName}/>
      <Statistics/>
      <h2>{data?.user?.userRole}</h2>
      <div className={styles.btns}>
        <Button
          disabled={loggingOut || deletingAcc}
          isLoading={loggingOut}
          onClick={() => {
            logout();
          }}
        >
          Выйти
        </Button>
        <Button
          disabled={loggingOut || deletingAcc}
          isLoading={deletingAcc}
          onClick={() => {
            deleteAccount();
          }}
        >
          Удалить аккаунт
        </Button>
        <Button onClick={() => setIsOpened(!isOpened)}>Открыть меню</Button>
      </div>
    </div>
  );
};

export default Home;