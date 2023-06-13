import React from "react";
import styles from "./Prescriptions.module.scss";
import LoadingSpinner from "../../../components/loadingSpinner";
import LoadingSpinnerSquare from "../../../components/loadingSpinnerSquare";
import Prescription from "./Prescription";
import FilterWrapper from "../../../components/filterWrapper";
import Select from "../../../components/select";
import Button from "../../../components/button";
import { useGetTrustedUsers } from "../../../queries/trustedUsersQueries";
import { useGetPrescriptions } from "../../../queries/studentQueries";
import { usePageFilters } from "../../../context/PagesFiltersProvider";

const Prescriptions = () => {
  const {
    data: trustedUsers,
    isLoading: trustedUsersLoading,
    isRefetching: trustedUsersRefetching,
    isError: trustedUsersError,
  } = useGetTrustedUsers();
  const { personSelected: tutorId, setPersonSelected: setTutorId } =
    usePageFilters();

  const {
    data: pendingPrescriptions,
    isLoading: pendingPrescriptionsLoading,
    isRefetching: pendingPrescriptionsRefetching,
    refetch: refetchPendingPrescriptions,
  } = useGetPrescriptions({
    status: "PENDING",
    id: tutorId,
  });

  const {
    data: prescriptions,
    isLoading: prescriptionsLoading,
    isRefetching: prescriptionsRefetching,
    refetch: refetchPrescriptions,
  } = useGetPrescriptions({
    status: "ACCEPTED",
    id: tutorId,
  });

  return (
    <div className={styles.container}>
      {!trustedUsersLoading &&
        !trustedUsersRefetching &&
        !trustedUsersError && (
          <FilterWrapper>
            <Select
              options={[
                {
                  label: "Выбрать куратора",
                  value: "",
                },
                ...trustedUsers?.users?.map((user) => ({
                  value: user?.id,
                  label: `${user?.firstName} ${user?.lastName}`,
                })),
                {
                  label: "All",
                  value: "ALL",
                },
              ]}
              onChange={(e) => setTutorId(e.target.value)}
              value={tutorId}
              label='Выбрать куратора'
              ariaLabel='tutor selection'
              disabled={false}
              title='Выберите куратора что-бы увидеть его запросы'
            />
          </FilterWrapper>
        )}

      <div className={styles.pending}>
        <h2>Ожидающий обратной связи</h2>
        {(pendingPrescriptionsLoading || pendingPrescriptionsRefetching) &&
        tutorId ? (
          <LoadingSpinner size={30} />
        ) : (
          pendingPrescriptions?.prescriptions?.map((prescription) => (
            <Prescription key={prescription?.id} {...prescription} />
          ))
        )}
        {pendingPrescriptions?.prescription?.length < 1 &&
          !pendingPrescriptionsLoading &&
          !pendingPrescriptionsRefetching && (
            <p className={styles.noResults}>Не найдено запросов от кураторов</p>
          )}
      </div>
      <div className={styles.prescriptions}>
        <h2>Обратная связь </h2>
        {(prescriptionsLoading || prescriptionsRefetching) && tutorId ? (
          <LoadingSpinner size={30} />
        ) : (
          prescriptions?.prescriptions?.map((prescription) => (
            <Prescription key={prescription?.id} {...prescription} />
          ))
        )}
        {!prescriptions?.prescriptions?.length &&
          !prescriptionsLoading &&
          !prescriptionsRefetching && (
            <p className={styles.noResults}>Не найдено обратной связи</p>
          )}
      </div>
      {tutorId && !pendingPrescriptionsRefetching && (
        <div className={styles.btns}>
          <Button
            size='md'
            onClick={() => {
              refetchPrescriptions();
              refetchPendingPrescriptions();
            }}
            disabled={prescriptionsLoading || prescriptionsRefetching}
          >
            Обновить
          </Button>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
