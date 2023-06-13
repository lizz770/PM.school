import React from "react";
import styles from "./Table.module.scss";
import SideTitle from "./SideTitle";
import Item from "./Item";
import { MdDesignServices } from "react-icons/md";
import Button from "../button";

const Table = ({ url, titleIcon, title, items, isTutor }) => {
  return (
    <div className={styles.container}>
      {/* таблица */}
      <div className={styles.inner}>
        <SideTitle icon={titleIcon}>{title}</SideTitle>
        {/* Элементы */}
        <div
          className={styles.items}
          style={
            isTutor && !items.length ? { justifyContent: "center" } : undefined
          }
        >
          {items?.length > 0 ? (
            items?.map((item, index) => {
              if (index < 3) return <Item key={index} {...item} />;
            })
          ) : (
            <div className={styles.noData}>Нет доступных данных</div>
          )}
          {/* кнопка ссылка на студента*/}
          {!isTutor && (
            <Button isLink to={url} align='center' mt={16} mb={16} size='md'>
              {`${items?.length > 0 ? "Посмотреть" : "Добавить данные"}`}
            </Button>
          )}
          {/* BUTTON LINKS FOR TutorS*/}
          {/* {isTutor && items?.length > 0 && (
            <Button isLink to={url} align='center' mt={16} mb={16} size='md'>
              See More
            </Button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Table;

Table.defaultProps = {
  url: "/",
  titleIcon: <MdDesignServices />,
  title: "Медиа Дизайн",
  children: null,
  items: [
    {
      label: "Удивительный искусственный свет",
      
      unitColor: "grey",
      date: "2021-05-01",
    },
    {
      label: "Прекрасен мир и мировоздание!",
      
      unitColor: "grey",
      date: "2021-05-01",
    },
    {
      label: "Прекрасен мир и мировоздание!",
      
      unitColor: "grey",
      date: "2021-05-01",
    },
  ],
  isTutor: false,
};
