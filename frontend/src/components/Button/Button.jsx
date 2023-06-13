import React from "react";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import LoadingSpinner from "../loadingSpinner";

const Button = ({
  children,
  type,
  color,
  w,
  h,
  ml,
  mr,
  mt,
  mb,
  align,
  size,
  onClick,
  disabled,
  title,
  tabIndex,
  isLink,
  to,
  isLoading,
}) => {
  return (
    <div
      className={
        size === "lg"
          ? styles.big
          : size === "md"
          ? styles.medium
          : styles.small
      }
      style={{
        marginLeft: ml ? `${ml}px` : "0px",
        marginRight: mr ? `${mr}px` : "0px",
        marginTop: mt ? `${mt}px` : "0px",
        marginBottom: mb ? `${mb}px` : "0px",
        alignSelf: align ? align : "auto",
      }}
    >
      {isLink ? (
        <Link
          to={to}
          type={type}
          className={
            color === "red"
              ? styles.red
              : color === "green"
              ? styles.green
              : styles.default
          }
          title={title}
          tabIndex={tabIndex}
          style={{
            width: w ? w : "max-content",
            height: h ? h : "max-content",
          }}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          type={type}
          className={
            color === "red"
              ? styles.red
              : color === "green"
              ? styles.green
              : styles.default
          }
          disabled={disabled}
          title={title}
          tabIndex={tabIndex}
          style={{
            width: w ? w : "auto",
            height: h ? h : "auto",
          }}
        >
          {isLoading ? (
            <LoadingSpinner
              size={size === "md" ? 22.5 : size === "lg" ? 25 : 19.5}
              color='whitesmoke'
            />
          ) : (
            children
          )}
        </button>
      )}
    </div>
  );
};

Button.defaultProps = {
  isLoading: false,
};

export default Button;
