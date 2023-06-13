import React from "react";
import styles from "./Prescriptions.module.scss";
import LoadingSpinnerSquare from "../../../components/loadingSpinnerSquare";
import Select from "../../../components/select";
import FilterWrapper from "../../../components/filterWrapper";
import Button from "../../../components/button";
import { useGetTrustedUsers } from "../../../queries/trustedUsersQueries";
import { useGetPrescriptions } from "../../../queries/tutorQueries";
import { usePageFilters } from "../../../context/PagesFiltersProvider";
import Prescription from "./Prescription";
import PrescriptionModal from "./PrescriptionModal";

const MED_STATUS = [
  {
    label: "Выбрать статус:",
    value: "",
  },
  {
    label: "Pассматриваемый",
    value: "PENDING",
  },
  {
    label: "Принято",
    value: "ACCEPTED",
  },
  {
    label: "Отклонено",
    value: "REJECTED",
  },
  {
    label: "Все",
    value: "ALL",
  },
];

const MEDS_BY = [
  { label: "Отобрать по:", value: "" },
  { label: "Я", value: "ME" },
  { label: "Все", value: "ALL" },
];

const Prescriptions = () => {
  const {
    data: trustedUsers,
    isLoading: trustedUsersLoading,
    isRefetching: trustedUsersRefetching,
    isError: trustedUsersError,
  } = useGetTrustedUsers();
  const { personSelected: studentId, setPersonSelected: setStudentId } =
    usePageFilters();

  const [medStatus, setMedStatus] = React.useState(MED_STATUS[0]?.value);
  const [medsBy, setMedsBy] = React.useState(MEDS_BY[0]?.value);

  const {
    data: prescriptions,
    isLoading: prescriptionsLoading,
    isRefetching: prescriptionsRefetching,
    isError: prescriptionError,
    refetch: refetchPrescriptions,
  } = useGetPrescriptions({
    id: studentId,
    status: medStatus,
    by: medsBy,
  });

  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className={styles.container}>
      {(trustedUsersLoading || trustedUsersRefetching) && (
        <LoadingSpinnerSquare h={80} size={35} />
      )}
      {!trustedUsersLoading &&
        !trustedUsersRefetching &&
        !trustedUsersError && (
          <FilterWrapper>
            <Select
              options={[
                {
                  label: "Выбрать студента",
                  value: "",
                },
                ...trustedUsers?.users?.map((user) => ({
                  value: user?.id,
                  label: `${user?.firstName} ${user?.lastName}`,
                })),
                {
                  label: "Все",
                  value: "ALL",
                },
              ]}
              onChange={(e) => setStudentId(e.target.value)}
              value={studentId}
              label='Выбрать студента'
              ariaLabel='student selection'
              disabled={false}
              title='Выбрать студента что-бы посмотреть информацию'
            />

            <Select
              options={MED_STATUS}
              disabled={false}
              onChange={(e) => setMedStatus(e.target.value)}
              value={medStatus}
              label='Status'
            />

            <Select
              options={MEDS_BY}
              disabled={false}
              onChange={(e) => setMedsBy(e.target.value)}
              value={medsBy}
              label='By'
            />
          </FilterWrapper>
        )}

      {(prescriptionsLoading || prescriptionsRefetching) &&
        studentId &&
        medStatus &&
        medsBy && <LoadingSpinnerSquare h={120} size={35} />}

      {!prescriptionsLoading &&
        !prescriptionsRefetching &&
        !prescriptionError &&
        prescriptions?.PrescribedTo.map((prescription) => {
          return <Prescription {...prescription} />;
        })}

      {/* Если выбранные  учащиеся равны как all*/}
      {!prescriptionsLoading &&
        !prescriptionsRefetching &&
        prescriptions?.length > 1 && (
          <div className={styles.prescriptions}>
            {prescriptions?.map((user) => {
              return user?.PrescribedTo?.map((prescription) => {
                return <Prescription {...prescription} />;
              });
            })}
          </div>
        )}

      {studentId && !prescriptionsRefetching && (
        <div className={styles.btns}>
          {studentId !== "ALL" && (
            <Button size='md' onClick={() => setShowModal(true)}>
             Опубликовать
            </Button>
          )}

          {studentId && medStatus && medsBy && (
            <Button
              size='md'
              onClick={() => refetchPrescriptions()}
              disabled={prescriptionsRefetching}
            >
              Обновить
            </Button>
          )}
        </div>
      )}

      {showModal && (studentId !== "ALL" || "") && (
        <PrescriptionModal
          setIsOpen={setShowModal}
          modalIsOpen={showModal}
          studentId={studentId}
        />
      )}
    </div>
  );
};

export default Prescriptions;
