import React from "react";
import styles from "./Prescription.module.scss";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Button from "../../../components/button";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import {
  useDeletePrescription,
  usePatchPrescription,
} from "../../../queries/studentQueries";

const Prescription = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const {
    data: prescription,
    isLoading: deletingPrescription,
    isError: deletingPrescriptionError,
    isSuccess: deletedPrescription,
    mutate: deletePrescription,
  } = useDeletePrescription();

  const {
    data: prescriptionPatch,
    isLoading: patchingPrescription,
    isError: patchingPrescriptionError,
    isSuccess: patchedPrescription,
    mutate: patchPrescription,
  } = usePatchPrescription();

  return (
    <div
      className={styles.container}
      style={deletedPrescription ? { display: "none" } : undefined}
    >
      <div className={styles.top}>
        <div className={styles.header}>
          <h2>{props?.title}</h2>
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
          <p className={styles.med}>{` ${props?.name}`}</p>
          <p className={styles.med}>{`${props?.description}`}</p>
          <p className={styles.med}>{`${props?.multimedia}`}</p>
          <span
            className={styles.by}
          >{`Куратор: ${props?.PrescribedBy?.firstName} ${props?.PrescribedBy.lastName}`}</span>
          <div className={styles.btns}>
            {props?.status === "PENDING" && (
              <div className={styles.btns}>
                <Button
                  color='green'
                  disabled={deletingPrescription || patchingPrescription}
                  onClick={() =>
                    patchPrescription({
                      prescriptionId: props?.id,
                      tutorId: props?.PrescribedBy?.id,
                    })
                  }
                >
                  {patchingPrescription ? (
                    <LoadingSpinner color='white' size={18.5} />
                  ) : (
                    "Принять"
                  )}
                </Button>
                <Button
                  color='red'
                  disabled={deletingPrescription || patchingPrescription}
                  onClick={() =>
                    deletePrescription({
                      prescriptionId: props?.id,
                      tutorId: props?.PrescribedBy?.id,
                    })
                  }
                >
                  {deletingPrescription ? (
                    <LoadingSpinner color='white' size={18.5} />
                  ) : (
                    "Удалить"
                  )}
                </Button>
              </div>
            )}
            {props?.status === "ACCEPTED" && (
              <div className={styles.btns}>
                <Button
                  color='red'
                  disabled={deletingPrescription || patchingPrescription}
                  onClick={() =>
                    deletePrescription({
                      prescriptionId: props?.id,
                      tutorId: props?.PrescribedBy?.id,
                    })
                  }
                >
                  {deletingPrescription ? (
                    <LoadingSpinner color='white' size={18.5} />
                  ) : (
                    "Удалить"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescription;
