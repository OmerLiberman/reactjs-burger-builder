import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary
  from '../../componenets/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
        <div className={classes.Checkout}>
          <CheckoutSummary
              ingredients={this.props.ings}
              checkoutCancelHandler={this.checkoutCancelHandler}
              checkoutContinueHandler={this.checkoutContinueHandler}/>
          <Route path={this.props.match.path + '/contact-data'}
                 component={ContactData}/>)}/>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
}

export default connect(mapStateToProps, null)(Checkout);