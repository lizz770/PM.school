import React, { useEffect } from "react";
import styles from "./PrescriptionModal.module.scss";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import Button from "../../../components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePostPrescription } from "../../../queries/tutorQueries";
import postPrescriptionSchema from "../../../schemas/postPrescriptionSchema";

const PrescriptionModal = ({ modalIsOpen, setIsOpen, studentId }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postPrescriptionSchema),
  });

  const {
    mutate: postPrescription,
    isLoading: postingPrescription,
    isError: postingPrescriptionErr,
  } = usePostPrescription();

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName={styles.overlay}
      className={styles.modal}
      contentLabel='FeedBack Modal'
    >
      <div className={styles.title_wrapper}>
        <h1>Обратная связь</h1>
        <button onClick={() => setIsOpen(false)}>
          <FaTimes size={20} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(() =>
          postPrescription(
            {
              id: studentId,
              name: getValues("name"),
              description: getValues("description"),
              multimedia: getValues("multimedia"),
            },
            {
              onSuccess: () => {
                reset();
                setIsOpen(false);
              },
            }
          )
        )}
      >
        <div className={styles.input_wrapper}>
          <label htmlFor='name'>Заголовок:</label>
          <div className={styles.input}>
            <input
              type='string'
              name='name'
              id='name'
              placeholder='Название заголовка'
              {...register("name", { required: true })}
            />
            {errors?.name && (
              <div className={styles.error}>
                <p>Запрашиваемый</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='description'>Описание:</label>
          <div className={styles.input}>
            <input
              type='string'
              name='description'
              id='description'
              placeholder='Описание'
              {...register("description", { required: true })}
            />
            <div className={styles.error}>
              {errors?.description && (
                <div className={styles.error}>
                  <p>Запрашиваемый</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor='multimedia'>Мультимедия:</label>
          <div className={styles.input}>
            <input
              type='string'
              name='multimedia'
              id='multimedia'
              placeholder='Мультимедия'
              {...register("multimedia", { required: true })}
            />
            <div className={styles.error}>
              {errors?.multimedia && (
                <div className={styles.error}>
                  <p>Запрашиваемый</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.btns}>
          <Button
            type='submit'
            color='green'
            size='md'
            disabled={postingPrescription}
            isLoading={postingPrescription}
          >
            Добавить
          </Button>
          <Button
            color='red'
            size='md'
            onClick={() => setIsOpen(false)}
            disabled={postingPrescription}
          >
            Отменить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PrescriptionModal;
