import React from "react";
import styles from "./Select.module.scss";

const Select = ({
  value,
  options,
  label,
  ariaLabel,
  disabled,
  title,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <select
        {...props}
        className={styles.select}
        value={value}
        onChange={props?.onChange}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={styles.select_option}
            aria-label={ariaLabel}
            disabled={disabled}
            title={title}
            {...props}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
