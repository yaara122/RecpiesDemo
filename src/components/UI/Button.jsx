import React from "react";
// import styled from "styled-components";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={classes.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
