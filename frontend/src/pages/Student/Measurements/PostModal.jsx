import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import styles from "./PostModal.module.scss";
import { usePostMeasurement } from "../../../queries/measurementQueries";
import Button from "../../../components/button";

Modal.setAppElement("#root");

const MeasurementInputs = ({ measurement, inputs, setInputs }) => {
  useEffect(() => {
    setInputs((prev) => ({ [measurement]: 0 }));
    measurement === "videoProduction" &&
      setInputs((prev) => ({ title: 0, video: 0 }));
  }, []);

  switch (measurement) {
    case "mediadesign":
      return (
        <div className={styles.input_wrapper}>
          <label htmlFor='title'>Название</label>
          <input
            type='string'
            name='title'
            id='title'
            onChange={(e) =>
              setInputs({
                ...inputs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor='description'>Описание:</label>
          <input
            type='string'
            name='description'
            id='description'
            onChange={(e) =>
              setInputs({
                ...inputs,
                description: e.target.value,
              })
            }
          />
          <label htmlFor='image'>Изображение</label>
          <input
            type='string'
            name='image'
            id='image'
            onChange={(e) =>
              setInputs({
                ...inputs,
                image: e.target.value,
              })
            }
          />
        </div>
        
      );
    case "photoProduction":
      return (
        <div className={styles.input_wrapper}>
          <label htmlFor='title'>Название</label>
          <input
            type='string'
            name='title'
            id='title'
            style={{ marginBottom: "1rem" }}
            onChange={(e) =>
              setInputs({
                ...inputs,
                title: e.target.value,
              })
            }
          />

          <label htmlFor='description'>Описание</label>
          <input
            type='string'
            name='description'
            id='description'
            onChange={(e) =>
              setInputs({
                ...inputs,
                description: e.target.value,
              })
            }
          />
          <label htmlFor='image'>Изображение</label>
          <input
            type='string'
            name='image'
            id='image'
            onChange={(e) =>
              setInputs({
                ...inputs,
                image: e.target.value,
              })
            }
          />
        </div>
      );
    case "videoProduction":
      return (
        <div className={styles.input_wrapper}>
          <label htmlFor='title'>Название</label>
          <input
            type='string'
            name='title'
            id='title'
            style={{ marginBottom: "1rem" }}
            onChange={(e) =>
              setInputs({
                ...inputs,
                title: e.target.value,
              })
            }
          />

          <label htmlFor='description'>Описание</label>
          <input
            type='string'
            name='description'
            id='description'
            onChange={(e) =>
              setInputs({
                ...inputs,
                description: e.target.value,
              })
            }
          />
          <label htmlFor='video'>Видео</label>
          <input
            type='string'
            name='video'
            id='video'
            onChange={(e) =>
              setInputs({
                ...inputs,
                video: e.target.value,
              })
            }
          />
        </div>
        
      );

    default:
      return null;
  }
};

const PostModal = ({ measurement, modalIsOpen, setIsOpen }) => {
  const {
    data,
    isLoading,
    isError,
    error,
    mutate: post,
  } = usePostMeasurement(measurement);

  const [inputs, setInputs] = useState();

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName={styles.overlay}
      className={styles.modal}
      contentLabel='Пример модели'
    >
      <div className={styles.title_wrapper}>
        <h1>Добавить </h1>
        <button onClick={() => setIsOpen(false)}>
          <FaTimes size={20} />
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <MeasurementInputs
          measurement={measurement}
          inputs={inputs}
          setInputs={setInputs}
        />
        <div className={styles.btns}>
          <Button
            type='submit'
            color='green'
            size={"md"}
            onClick={() =>
              post(inputs, {
                onSuccess: () => setIsOpen(false),
              })
            }
            disabled={isLoading}
          >
            {isLoading ? "Добавление..." : "Добавить"}
          </Button>
          <Button
            color='red'
            size='md'
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Отменить
          </Button>
        </div>
        <span
          style={{ display: "block", color: "darkRed", marginTop: "0.5rem" }}
        >
          {error && <p>{JSON.stringify(error)}</p>}
        </span>
      </form>
    </Modal>
  );
};

export default PostModal;
