import React, {Component} from 'react';

import classes from './Orders.css';
import Order from '../../componenets/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios.get('/orders.json').then(resp => {
      let orders = [];      // store all orders.
      for (let key in resp.data) {
        orders.push({...resp.data[key], id: key});
      }
      this.setState({loading: false, orders: orders});
    }).catch(resp => {
          this.setState({loading: false});
        },
    );
  }

  render() {
    let orders = [];
    for (let key in this.state.orders) {
      let _ingredients = [];
      for (let _key in this.state.orders[key]['ingredients']) {
        _ingredients.push(
            <span
                style={{
                  border: '1px solid',
                  margin: '4px',
                  padding: '3px',
                  textTransform: 'capitalize',
                }}>
              {_key + ' (' + this.state.orders[key]['ingredients'][_key] + ') '}
            </span>,
        );
      }
      orders.push(<Order ingredients={_ingredients}
                         price={this.state.orders[key]['price']}/>);
    }

    return (
        <div className={classes.Orders}>
          <h1 className={classes.Title}> Your orders </h1>
          {orders}
        </div>
    );
  }
}

export default Orders;