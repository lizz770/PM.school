import React from "react";
import styles from "./Requests.module.scss";
import { useState } from "react";
import { useSearchUser, useGetPending } from "../../queries/requestQueries";
import { useWhoami } from "../../queries/authQueries";
import User from "./User";
import Pending from "./Pending";
import GlobalSpinner from "../../components/globalSpinner";
import LoadingSpinner from "../../components/loadingSpinner";
import Button from "../../components/button";
import Container from "../../components/filterWrapper";

const Requests = () => {
  const [input, setInput] = useState("");
  const {
    data: users,
    isLoading,
    isRefetching,
    isError,
    error,
    refetch: searchUser,
  } = useSearchUser(input);

  const debouncedSearch = () => {
    if (search.current) return;

    search.current = true;

    setTimeout(() => {
      searchUser();
      search.current = false;
    }, 1000);
  };

  React.useEffect(() => {
    if (input.length > 2) {
      debouncedSearch();
    }
  }, [input]);

  const search = React.useRef(null);

  const {
    data: pendingRequests,
    isLoading: pendingLoading,
    isRefetching: pendingRefetching,
    refetch: pendingRefetch,
  } = useGetPending();
  const { data: me } = useWhoami();

  return (
    <>
      {pendingLoading ? (
        <GlobalSpinner />
      ) : (
        <div className={styles.container}>
          <div className={styles.pending}>
            <h2>Ожидающий запрос</h2>
            {!pendingLoading &&
              !pendingRefetching &&
              pendingRequests?.sent?.map((request) => (
                <Pending key={request.id} request={request} type='sent' />
              ))}
            {!pendingLoading &&
              !pendingRefetching &&
              pendingRequests?.received?.map((request) => (
                <Pending key={request.id} request={request} type='received' />
              ))}
            {!pendingLoading &&
              !pendingRefetching &&
              pendingRequests?.sent?.length === 0 &&
              pendingRequests?.received?.length === 0 && (
                <div className={styles.noRequests}>
                  <p>У вас нет ожидающих запросов</p>
                </div>
              )}
            {(pendingLoading || pendingRefetching) && (
              <LoadingSpinner size={40} />
            )}
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.input}>
              <label htmlFor='user' id='search-label'>
                Поиск пользователя
              </label>
              <div className={styles.inner}>
                <input
                  type='text'
                  id='user'
                  name='user'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Введите Имя'
                  aria-label='Search user'
                  aria-describedby='search-label'
                />
                <div title='Loading' aria-hidden='true' role='alert'>
                  {isLoading && input?.length > 2 && (
                    <LoadingSpinner size={20} color='black' />
                  )}
                </div>
              </div>
            </div>

            {/* Пользователь */}
            <div className={styles.users}>
              {input.length > 2 &&
                users?.searchResults?.map((user) => (
                  <User
                    key={user.id}
                    firstname={user.firstName}
                    lastname={user.lastName}
                    userRole={user.userRole}
                    id={user.id}
                    myId={me?.user?.id}
                  />
                ))}
            </div>
          </div>
          <Container>
            <Button
              disabled={pendingRefetching || pendingLoading}
              isLoading={pendingRefetching || pendingRefetching}
              onClick={() => pendingRefetch()}
              size='md'
            >
              Обновить запрос
            </Button>
          </Container>
        </div>
      )}
    </>
  );
};

export default Requests;
