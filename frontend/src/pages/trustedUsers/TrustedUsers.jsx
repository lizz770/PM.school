import React from "react";
import styles from "./TrustedUsers.module.scss";
import {
  useGetTrustedUsers,
  useDeleteTrustedUser,
} from "../../queries/trustedUsersQueries";
import { useWhoami } from "../../queries/authQueries";
import LoadingSpinner from "../../components/loadingSpinner";
import Button from "../../components/button/Button";
import FilterWrapper from "../../components/filterWrapper";

const User = ({ user }) => {
  const {
    mutate: deleteTrustedUser,
    isLoading: deletingUser,
    isError,
  } = useDeleteTrustedUser();

  return (
    <div className={styles.userWrapper}>
      <div className={styles.user}>
        <div
          className={styles.name}
        >{`${user?.firstName} ${user?.lastName}`}</div>
        <div className={styles.email}>{user?.email}</div>
      </div>
      <div className={styles.action}>
        <Button
          className={styles.redBtn}
          disabled={deletingUser}
          onClick={() => deleteTrustedUser(user?.id)}
          color='red'
        >
          {deletingUser ? "Удаление..." : "Удалить"}
        </Button>
      </div>
    </div>
  );
};

const TrustedUsers = () => {
  const {
    data,
    isLoading: usersLoading,
    isRefetching: usersRefetching,
    isError: usersError,
    error: usersErrorObj,
    refetch,
  } = useGetTrustedUsers();

  const { data: me } = useWhoami();

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {me?.user?.userRole === "TUTOR" ? "Students" : "Tutors"}
        </h1>

        {(usersLoading || usersRefetching) && (
          <div className={styles.loading}>
            <LoadingSpinner size={40} />
          </div>
        )}

        {!usersLoading &&
          !usersRefetching &&
          data?.users?.map((user) => <User user={user} />)}
      </div>

      {!usersRefetching && (
        <FilterWrapper>
          <Button disabled={usersRefetching} onClick={() => refetch()}>
            Обновить 
          </Button>
        </FilterWrapper>
      )}
    </>
  );
};

export default TrustedUsers;
