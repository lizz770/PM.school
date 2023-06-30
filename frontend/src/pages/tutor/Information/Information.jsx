import React from "react";
import styles from "./Information.module.scss";
import Table from "../../../components/information/Table";
import Select from "../../../components/select/Select";
import { useGetTrustedUsers } from "../../../queries/trustedUsersQueries";
//фото
import { HiOutlinePhotograph} from "react-icons/hi";
//камера
import { BsCameraVideo } from "react-icons/bs";
//статьи дизайн

import LoadingSpinnerSquare from "../../../components/loadingSpinnerSquare/LoadingSpinnerSquare";
import { useGetStudentOverview } from "../../../queries/tutorQueries";
import FilterWrapper from "../../../components/filterWrapper";
import { usePageFilters } from "../../../context/PagesFiltersProvider";

const Information = () => {
  const {
    data: trustedUsers,
    isLoading: trustedUsersLoading,
    isRefetching: trustedUsersRefetching,
  } = useGetTrustedUsers();

  const { personSelected: studentId, setPersonSelected: setStudentId } =
    usePageFilters();

  const {
    data: studentOverview,
    isLoading: studentOverviewLoading,
    isRefetching: studentOverviewRefetching,
    isError: studentOverviewErr,
  } = useGetStudentOverview(studentId);

  return (
    <div className={styles.container}>
      {trustedUsersLoading || trustedUsersRefetching ? (
        <LoadingSpinnerSquare h={90} size={35} />
      ) : (
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
            ]}
            onChange={(e) => setStudentId(e.target.value)}
            value={studentId}
            label='Выбрать студента'
            ariaLabel='Student selection'
            disabled={false}
            title='Выбрать студента что бы посмотреть информацию'
          />
        </FilterWrapper>
      )}

      {(studentOverviewLoading || studentOverviewRefetching) && studentId ? (
        <LoadingSpinnerSquare size={45} h={150} mt={24} />
      ) : (
        <div className={styles.tables}>
          <Table
            url='mediadesign'
            items={
              studentOverview?.mediadesign?.map((item) => {
                return {
                  value: item?.title&& item?.description ,
                  unitColor: "#6aa84f",
                  date: item?.updatedAt,
                };
              }) || []
            }
            isTutor
          />

          <Table
            title='Фото Продакшн'
            titleIcon={<HiOutlinePhotograph />}
            url='photoProduction'
            items={
              studentOverview?.photoProduction?.map((item) => {
                return {
                  value: item?.title,
                  unitColor: "#6aa84f",
                  date: item?.updatedAt,
                };
              }) || []
            }
            isTutor
          />

          <Table
            title='Видео Продакшн'
            titleIcon={<BsCameraVideo />}
            url='videoProduction'
            items={
              studentOverview?.videoProduction?.map((item) => {
                return {
                  value: item?.title,
                  unitColor: "#6aa84f",
                  date: item?.updatedAt,
                };
              }) || []
            }
            isTutor
          />
        </div>
      )}
    </div>
  );
};

export default Information;
