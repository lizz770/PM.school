import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useLogin, useWhoami } from "../../queries/authQueries";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./Login.module.scss";
import Input from "../../components/FormInputs/BigInput";
import Logo from "./Logo";
import GlobalSpinner from "../../components/GlobalSpinner";
import Button from "../../components/Button";
import loginSchema from "../../schemas/loginSchema";

const Login = () => {
  const [rememberMe, setRembemerMe] = useState(false);
  const checkCheckbox = (e) => {
    if (e.key === "Enter") {
      setRembemerMe(!rememberMe);
    }
  };

  const { mutate: login, isLoading, isError, error } = useLogin();
  const {
    data: me,
    isLoading: meLoading,
    isRefetching: meRefetching,
  } = useWhoami();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  return (
    <div className={styles.container}>
      {(isLoading || meLoading || meRefetching) && <GlobalSpinner />}
      <div className={styles.form}>
        <div className={styles.inner}>

          {/* Сообщение */}
          <div className={styles.message}>
            <span>С возвращением!</span>
            <p>С возвращением! Пожалуйста, введите свои данные...</p>
          </div>

          {/* Форма для контейнера */}
          <div className={styles.formWrapper}>
            <form action='submit' onSubmit={handleSubmit(login)}>
              <Input
                label='Почта:'
                htmlFor='email'
                type='email'
                autocomplete='email'
                name='email'
                placeholder='Введите почту'
                register={register("email", { required: true })}
              />
              <Input
                label='Пароль:'
                htmlFor='password'
                type='password'
                name='password'
                autocomplete='current-password'
                placeholder='Введите пароль'
                register={register("password", { required: true })}
                err={error?.response?.data?.message}
              />


              {/* Опции */}
              <div className={styles.options}>
                <dir className={styles.remember}>
                  <input
                    type='checkbox'
                    checked={rememberMe}
                    onKeyPress={(e) => checkCheckbox(e)}
                  />
                  <label htmlFor='check'>Запомнить на 30 дней</label>
                </dir>
                <div className={styles.forgotPw}>
                  <Link to='/forgotPassword'>Забыли пароль</Link>
                </div>
              </div>

              {/* Войти в систему*/}
              <div className={styles.btnContainer}>
                <Button type='submit' size='md'>
                  <span>Войти</span>
                </Button>
              </div>

              {/* Нет ссылки на аккаунт*/}
              <div className={styles.noAccount}>
                <span>
                 У вас нет учетной записи? <Link to='/register'>Зарегистрироваться</Link>
                </span>
              </div>

            </form>
          </div>
        </div>
      </div>
      <Logo />
    </div>
  );
};

export default Login;