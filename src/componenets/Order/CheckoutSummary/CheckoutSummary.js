import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
      <div className={classes.CheckoutSummary}>
        <h1> Hope it tastes well ! </h1>
        <div style={{width: '100%', margin: 'auto'}}>
          <Burger ingredients={props.ingredients}/>
        </div>
        <Button buttonType="Danger"
                clicked={props.checkoutCancelHandler}>Cancel</Button>
        <Button buttonType="Success"
                clicked={props.checkoutContinueHandler}>Continue</Button>
      </div>
  );
};

export default checkoutSummary;