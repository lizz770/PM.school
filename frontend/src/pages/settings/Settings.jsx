import React, { useState } from "react";
import styles from "./Settings.module.scss";
import { useLogout } from "../../queries/authQueries";
import GlobalSpinner from "../../components/globalSpinner";
import LoadingSpinner from "../../components/loadingSpinner";
import Button from "../../components/button/Button";
import { useDeleteAccount } from "../../queries/accountQueries";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import passwordSchema from "../../schemas/passwordSchema";
import { useChangePassword } from "../../queries/accountQueries";

const Settings = () => {
  const { mutate: logout, isLoading } = useLogout();
  const { mutate: deleteAccount, isLoading: accountDeleting } =
    useDeleteAccount();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const {
    mutate: changePassword,
    isLoading: changingPassword,
    isError: changingPasswordErr,
  } = useChangePassword();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className={styles.container}>
      <form
        action='submit'
        onSubmit={handleSubmit(() =>
          changePassword({
            currentPassword: getValues("currentPassword"),
            newPassword: getValues("newPassword"),
          })
        )}
      >
        <div className={styles.password}>
          <div className={styles.input_wrapper}>
            <label htmlFor='currentPassword'>Текущий пароль:</label>
            <div className={styles.input}>
              <div className={styles.inner}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name='currentPassword'
                  id='currentPassword'
                  placeholder='Текущий пароль'
                  {...register("currentPassword", { required: true })}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPasswordVisible(!passwordVisible);
                  }}
                  tabIndex={-1}
                >
                  {passwordVisible ? (
                    <AiOutlineEyeInvisible size={23} />
                  ) : (
                    <AiOutlineEye size={23} />
                  )}
                </button>
              </div>
              {errors?.currentPassword && (
                <div className={styles.error}>
                  <p>{errors?.currentPassword?.message}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='newPassword'>Новый пароль:</label>
            <div className={styles.input}>
              <div className={styles.inner}>
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  name='newPassword'
                  id='newPassword'
                  placeholder='Новый пароль'
                  {...register("newPassword", { required: true })}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNewPasswordVisible(!newPasswordVisible);
                  }}
                  tabIndex={-1}
                >
                  {newPasswordVisible ? (
                    <AiOutlineEyeInvisible size={23} />
                  ) : (
                    <AiOutlineEye size={23} />
                  )}
                </button>
              </div>

              {errors?.newPassword && (
                <div className={styles.error}>
                  <p>{errors?.newPassword?.message}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.input_wrapper}>
            <label htmlFor='confirmPassword'>Подтвердите пароль:</label>
            <div className={styles.input}>
              <div className={styles.inner}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name='confirmPassword'
                  id='confirmPassword'
                  placeholder='Подтвердите пароль'
                  {...register("confirmPassword", { required: true })}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmPasswordVisible(!confirmPasswordVisible);
                  }}
                  tabIndex={-1}
                >
                  {confirmPasswordVisible ? (
                    <AiOutlineEyeInvisible size={23} />
                  ) : (
                    <AiOutlineEye size={23} />
                  )}
                </button>
              </div>
              {errors?.confirmPassword && (
                <div className={styles.error}>
                  <p>{errors?.confirmPassword?.message}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.btns}>
            <Button
              type='submit'
              disabled={changingPassword}
              isLoading={changingPassword}
            >
              Изменить пароль
            </Button>
          </div>
        </div>
      </form>
      <div className={styles.actions}>
        <div className={styles.btns}>
          <Button onClick={() => logout()}>Выйти</Button>
          <Button onClick={() => deleteAccount()}>Удалить аккаунт</Button>
        </div>
      </div>

      {(isLoading || accountDeleting || changingPassword) && <GlobalSpinner />}
    </div>
  );
};

export default Settings;
