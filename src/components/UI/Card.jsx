import React from "react";
// import styled from "styled-components";

import classes from  './Card.module.css';

const Card = props => {
  return (
    <div  className={`${classes.card} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;