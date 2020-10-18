import React from 'react';

import classes from "./Order.css";

const react = (props) => {
  return (
    <div className={classes.Order}>
      <p style={{fontSize: '20px'}}> Ingredients </p>
      <p className={classes.Ingredients}> {props.ingredients} </p>
      <p style={{fontSize: '20px'}}> Price </p>
      <p><strong> {props.price} $ </strong></p>
    </div>
  );
};

export default react;