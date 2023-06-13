import React from "react";
import styles from "./Information.module.scss";
import Table from "../../../components/information/Table";
//фото
import { HiOutlinePhotograph} from "react-icons/hi";
//камера
import { BsCameraVideo } from "react-icons/bs";
//статьи дизайн
import { MdDesignServices } from "react-icons/md";
import GlobalSpinner from "../../../components/globalSpinner";
import { useHomeStats } from "../../../queries/accountQueries";

const Information = () => {
  const {
    data: stats,
    isLoading: statsLoading,
    isRefetching: statsRefetching,
  } = useHomeStats();

  return (
    <div className={styles.container}>
      {statsLoading || statsRefetching ? (
        <GlobalSpinner />
      ) : (
        <>
          <Table
            title='Медиа Дизайн'
            titleIcon={<MdDesignServices />}
            url='mediadesign'
            items={stats?.Mediadesign?.map((item) => {
              return {
                value: item?.title,
                unitColor: "#6aa84f",
                date: item?.updatedAt,
              };
            })}
          />

          <Table
            title='Фото Продакшн'
            titleIcon={<HiOutlinePhotograph />}
            url='photoProduction'
            items={stats?.PhotoProduction.map((item) => {
              return {
                value: item?.title,
                unitColor: "#6aa84f",
                date: item?.updatedAt,
              };
            })}
          />

          <Table
            title='Видео Продакшн'
            titleIcon={<BsCameraVideo />}
            url='videoProduction'
            items={stats?.VideoProduction?.map((item) => {
              return {
                value: item?.title,
                unitColor: "#6aa84f",
                date: item?.updatedAt,
              };
            })}
          />
        </>
      )}
    </div>
  );
};

export default Information;
