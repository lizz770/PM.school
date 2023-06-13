import React, { useState } from "react";
import styles from "./Prescription.module.scss";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Button from "../../../components/button";
import { useWhoami } from "../../../queries/authQueries";
import { useDeletePrescription } from "../../../queries/tutorQueries";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";

const Prescription = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { data: me } = useWhoami();
  const {
    mutate: deletePrescription,
    isLoading: deletingPrescription,
    isSuccess: deletedPrescription,
  } = useDeletePrescription();
  return (
    <div
      className={styles.container}
      style={deletedPrescription ? { display: "none" } : undefined}
    >
      <div className={styles.top}>
        <div className={styles.header}>
          <h2>{props?.name}</h2>
          <div
            className={
              props?.status === "ACCEPTED" ? styles.green : styles.default
            }
          >
            {props?.status}
          </div>
        </div>
        <button
          className={styles.expand}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <MdKeyboardArrowUp size={35} />
          ) : (
            <MdKeyboardArrowDown size={35} />
          )}
        </button>
      </div>
      {expanded && (
        <div className={styles.info}>
          <p className={styles.med}>{`${props?.name}`}</p>
          <p className={styles.med}>{`${props?.description}`}</p>
          <p className={styles.med}>{`${props?.multimedia}`}</p>
          <span
            className={styles.by}
          >{`Куратор: ${props?.PrescribedBy?.firstName} ${props?.PrescribedBy.lastName}`}</span>
          {me?.user?.id === props?.PrescribedBy?.id && (
            <div className={styles.btns}>
              <Button
                color='red'
                disabled={deletingPrescription}
                onClick={() =>
                  deletePrescription({
                    prescriptionId: props?.id,
                    studentId: props?.PrescribedTo?.id,
                  })
                }
              >
                {deletingPrescription ? <LoadingSpinner size={22} /> : "Удалить"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Prescription;
