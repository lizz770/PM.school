import React from "react";
import styles from "./Register.module.scss";
import Logo from "../login/Logo";
import Input from "../../components/formInputs/LoginInput";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../../schemas/registerSchema";
import { useRegister, useWhoami } from "../../queries/authQueries";
import GlobalSpinner from "../../components/globalSpinner";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { data, mutate: Register, isLoading, isError, error } = useRegister();
  const {
    data: me,
    isLoading: meLoading,
    isRefetching: meRefetching,
  } = useWhoami();

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.inner}>
          <div className={styles.message}>
            <span>Добро пожаловать!</span>
            <p>Пожалуйста, введите свои данные для регистрации...</p>
          </div>
          <div className={styles.formWrapper}>
            <form action='submit' onSubmit={handleSubmit(Register)}>
              
              <div className={styles.nameContainer}>
                <div className={styles.nameInner}>
                  <Input
                    label='Имя'
                    htmlFor='fname'
                    placeholder='Имя'
                    register={register("firstName", { required: true })}
                    err={errors?.firstName?.message}
                  />
                  <Input
                    label={"Фамилия"}
                    htmlFor={"lname"}
                    placeholder={"Фамилия"}
                    register={register("lastName", { required: true })}
                    err={errors?.lastName?.message}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <Input
                label='Почта'
                htmlFor='email'
                type='email'
                autoComplete='email'
                placeholder='Введите вашу почту'
                register={register("email", { required: true })}
                err={errors?.email?.message}
              />

              {/* PASSWORD */}
              <Input
                label='Пароль'
                htmlFor='password'
                type='password'
                autoComplete='current-password'
                placeholder='Введите пароль'
                register={register("password", { required: true })}
                err={errors?.password?.message}
              />

              {/* CONFIRM PASSWORD */}
              <Input
                label='Подтверждение пароля'
                htmlFor='confirmPassword'
                type='password'
                autoComplete='current-password'
                placeholder='Подтвердить пароль'
                register={register("confirmPassword", { required: true })}
                err={errors?.confirmPassword?.message}
              />

              <div className={styles.roleContainer}>
                <label htmlFor='role'>Роль :</label>
                <dir className={styles.selectContainer}>
                  <select name='role' {...register("role", { required: true })}>
                    <option value='STUDENT'>Студент</option>
                    <option value='TUTOR'>Куратор</option>
                  </select>
                </dir>
              </div>

              <div className={styles.btnContainer}>
                <Button type='submit'>
                  <span>Зарегистрироваться</span>
                </Button>
              </div>
              <div className={styles.accountExists}>
                <span>
                  Есть учетная запись? <Link to='/login'>Войти</Link>
                </span>
              </div>
              {error && (
                <div className={styles.err}>
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Logo />
      {(isLoading || meLoading || meRefetching) && <GlobalSpinner />}
    </div>
  );
};

export default Register;
