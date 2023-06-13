import React from "react";
import styles from "./Requests.module.scss";
import {
  useAcceptRequest,
  useCancelRequest,
  useDeclineRequest,
} from "../../queries/requestQueries";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import Button from "../../components/button";

const Pending = ({ request, type }) => {
  const { mutate: acceptRequest, isLoading: accepting } = useAcceptRequest();
  const { mutate: cancelRequest, isLoading: canceling } = useCancelRequest();
  const { mutate: declineRequest, isLoading: declining } = useDeclineRequest();

  return (
    <div className={styles.pendingRequest}>
      <div className={styles.requestInfo}>
        <div className={styles.requestedBy}>
          {type === "sent"
            ? `Запрос отправлен по адресу ${request?.firstName} ${request?.lastName}`
            : `Запрос получен от ${request?.firstName} ${request?.lastName}`}
        </div>
        <div className={styles.requestStatus}>{request.status}</div>
      </div>

      {type === "sent" ? (
        <>
          {canceling ? (
            <LoadingSpinner size={25} />
          ) : (
            <Button onClick={() => cancelRequest(request.id)} color='red'>
              Отменить
            </Button>
          )}
        </>
      ) : (
        <>
          {declining || accepting ? (
            <LoadingSpinner size={25} />
          ) : (
            <div className={styles.btns}>
              <Button onClick={() => acceptRequest(request?.id)} color='green'>
                Принять
              </Button>
              <Button onClick={() => declineRequest(request.id)} color='red'>
                <span>Decline</span>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

Pending.defaultProps = {
  request: {
    status: "",
  },
  type: "sent",
};

export default Pending;
