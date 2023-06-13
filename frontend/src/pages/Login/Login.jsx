import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin, useWhoami } from "../../queries/authQueries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/loginSchema";
import styles from "./Login.module.scss";
import LoginInput from "../../components/formInputs/LoginInput";
import Button from "../../components/button/Button";
import Logo from "./Logo";
import GlobalSpinner from "../../components/globalSpinner";

const Login = () => {
  const [rememberMe, setRembemerMe] = useState(false);
  const checkCheckbox = (e) => {
    if (e.key === "Enter") {
      setRembemerMe(!rememberMe);
    }
  };

  const { mutate: Login, isLoading, isError, error } = useLogin();
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
      {/* Форма */}
      <div className={styles.form}>
        <div className={styles.inner}>
          {/* Сообщение */}
          <div className={styles.message}>
            <span>Добро пожаловать!</span>
            <p>Пожалуйста, введите свои данные...</p>
          </div>
          {/* Контейнер для формы */}
          <div className={styles.formWrapper}>
            <form action='submit' onSubmit={handleSubmit(Login)}>
              <LoginInput
                label='Email:'
                htmlFor='email'
                type='email'
                autocomplete='email'
                name='email'
                placeholder='Введите вашу почту'
                register={register("email", { required: true })}
              />
              <LoginInput
                label='Password:'
                htmlFor='password'
                type='password'
                name='password'
                autocomplete='current-password'
                placeholder='Введите ваш пароль'
                register={register("password", { required: true })}
                err={error?.response?.data?.message}
              />
              <div className={styles.options}>
                <div className={styles.forgotPw}>
                  <Link to='/forgotPassword'>Забыли пароль?</Link>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Button type='submit' size='md'>
                  <span>Войти в систему</span>
                </Button>
              </div>
              <div className={styles.noAccount}>
                <span>
                У вас нет учетной записи ? <Link to='/register'>Зарегистрироваться</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* логооо */}
      <Logo />
    </div>
  );
};

export default Login;
