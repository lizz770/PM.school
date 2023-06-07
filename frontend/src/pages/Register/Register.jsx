import React from "react";

import styles from "./Register.module.scss";

import Logo from "./Logo";

import Input from "../../components/FormInputs/BigInput";

import Button from "../../components/Button";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import GlobalSpinner from "../../components/GlobalSpinner";
import registerSchema from "../../schemas/registerSchema";
import { useWhoami, useRegister } from "../../queries/authQueries";

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

          {/* Сообщение */}

          <div className={styles.message}>
            <span>Добро пожаловать!</span>
            <p>Пожалуйста, введите свои данные для регистрации...</p>
          </div>

          {/* Форма*/}
          <div className={styles.formWrapper}>
            <form action='submit' onSubmit={handleSubmit(Register)}>

              {/* Имя */}
              <div className={styles.nameContainer}>
                <div className={styles.nameInner}>
                  <Input
                    label='Имя:'
                    htmlFor='fname'
                    placeholder='Имя'
                    register={register("firstName", { required: true })}
                    err={errors?.firstName?.message}
                  />
                  <Input
                    label={"Фамилия:"}
                    htmlFor={"lname"}
                    placeholder={"Фамилия"}
                    register={register("lastName", { required: true })}
                    err={errors?.lastName?.message}
                  />
                </div>
              </div>

              {/* Почта */}
              <Input
                label='Почта:'
                htmlFor='email'
                type='email'
                autoComplete='email'
                placeholder='Введите почту'
                register={register("email", { required: true })}
                err={errors?.email?.message}
              />

              {/* Пароль */}
              <Input
                label='Пароль:'
                htmlFor='password'
                type='password'
                autoComplete='current-password'
                placeholder='Введите пароль'
                register={register("password", { required: true })}
                err={errors?.password?.message}
              />

              {/* Подтвердить пароль */}
              <Input
                label='Подтвердить пароль:'
                htmlFor='confirmPassword'
                type='password'
                autoComplete='current-password'
                placeholder='Подтвердить пароль'
                register={register("confirmPassword", { required: true })}
                err={errors?.confirmPassword?.message}
              />

              {/* Роль */}
              <div className={styles.roleContainer}>

                <label htmlFor='role'>Роль:</label>
                <dir className={styles.selectContainer}>
                  <select name='role' {...register("role", { required: true })}>
                    <option value='STUDENT'>Студент</option>
                    <option value='TUTOR'>Куратор</option>
                  </select>
                </dir>
              </div>

              {/* Действия */}
              <div className={styles.btnContainer}>
                <Button type='submit'>
                  <span>Зарегистрироваться</span>
                </Button>
              </div>
              <div className={styles.accountExists}>
                <span>
                  У вас есть аккаунт <Link to='/login'>Войти в систему</Link>
                </span>
              </div>

              {/* Ошибка */}
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