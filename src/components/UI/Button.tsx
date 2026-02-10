
import React from "react";
import classes from "./Button.module.css";

const Button: React.FC<{type?:any, onClick?: () => void, children: React.ReactNode}> = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
