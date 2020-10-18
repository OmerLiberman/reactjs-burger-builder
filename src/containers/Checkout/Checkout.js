import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary
  from '../../componenets/Order/CheckoutSummary/CheckoutSummary';
import classes from './Checkout.css';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0, // temporary
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const _ingredients = {};
    let _price = 0;
    for (let param of query.entries()) {
      if (param[0] !== 'price') {
        _ingredients[param[0]] = parseInt(param[1]); // ['salad', '1']
      } else {
        _price = param[1];
      }
    }
    this.setState({ingredients: _ingredients, price: _price});
  }

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
              ingredients={this.state.ingredients}
              checkoutCancelHandler={this.checkoutCancelHandler}
              checkoutContinueHandler={this.checkoutContinueHandler}/>
          <Route path={this.props.match.url + '/contact-data'}
                 render={(props) => (<ContactData ingredients={this.state.ingredients}
                                             price={this.state.price} {...props}/>)}/>
        </div>
    );
  }
}

export default Checkout;