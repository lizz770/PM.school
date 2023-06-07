import React from "react";
import styles from "./BigInput.module.scss";

const BigInput = ({
  label,
  htmlFor,
  type,
  name,
  autocomplete,
  placeholder,
  onChange,
  err,
  register,
}) => {
  return (
    <dir className={styles.container}>
      <label htmlFor={htmlFor}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          name={name}
          autoComplete={autocomplete}
          placeholder={placeholder}
          onChange={onChange}
          {...register}
        />
      </div>
      <span className={styles.err}>{err}</span>
    </dir>
  );
};

BigInput.defaultProps = {
  label: "Email",
  htmlFor: undefined,
  type: undefined,
  autocomplete: undefined,
  placeholder: "Введите адрес электронной почты",
  onChange: () => {},
  err: "",
};

export default BigInput;