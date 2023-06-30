import React from "react";
import styles from "./ForgotPassword.module.scss";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";
import Button from "../../components/button";
import Input from "../../components/formInputs/LoginInput";
import forgotPasswordSchema from "../../schemas/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { mode } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  return (
    <div className={styles.container}>
      <div className={styles.forgotPw}>
        <div className={styles.inner}>
          <form action='submit' onSubmit={handleSubmit(() => {})}>
            <span className={styles.please}>Пожалуйста введите вашу почту:</span>
            <span className={styles.reset}>
              Мы пришлем вам ссылку для смена пароля...
            </span>
            <Input
              name='email'
              label='Email :'
              htmlFor='email'
              type='email'
              autocomplete='email'
              register={register("email", { required: true })}
              err={errors?.email?.message}
            />
            <div className={styles.btnContainer}>
              <Button type='submit'>Отправить</Button>
            </div>
          </form>
          <div className={styles.signin}>
            <span>
              Вернутся обратно <Link to='/login'>Страница входа</Link>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.circleContainer}>
        <div className={styles.circleTop}></div>
        <div className={styles.circleBtm}>
          <div
            className={styles.inner}
            style={mode ? { maxHeight: "120px" } : undefined}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
