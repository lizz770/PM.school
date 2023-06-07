import React from "react";
import styles from "./Table.module.scss";
import SideTitle from "./SideTitle";
import Item from "./Item";
import { MdDesignServices } from "react-icons/md";

import Button from "../Button";

const Table = ({ url, titleIcon, title, items, isTutor }) => {
  return (
    <div className={styles.container}>
      {/* ТАБЛИЦА*/}
      <div className={styles.inner}>
        <SideTitle icon={titleIcon}>{title}</SideTitle>
        {/* ЭЛЕМЕНТЫ ТАБЛИЦЫ */}
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
            <div className={styles.noData}>Нет Данных</div>
          )}
          {/* ССылки на кнопки для студента*/}
          {!isTutor && (
            <Button isLink to={url} align='center' mt={16} mb={16} size='md'>
              {`${items?.length > 0 ? "Увидеть больше" : "Добавить данные"}`}
            </Button>
          )}
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
      
      value: "Основы дизайна",
      unitColor: "grey",
      date: "2021-05-01",
    },
    {
      
      value: "Профессиональная индустрия",
      unitColor: "grey",
      date: "2021-05-01",
    },
    {
      
      value: "Красивое и прекрасное",
      unitColor: "grey",
      date: "2021-05-01",
    },
  ],
  isTutor: false,
};