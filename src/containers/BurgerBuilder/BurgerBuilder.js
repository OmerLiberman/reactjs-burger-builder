import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../componenets/Burger/Burger';
import BuildControls
  from '../../componenets/Burger/BuildControls/BuildControls';
import Modal from '../../componenets/UI/Modal/Modal';
import OrderSummary from '../../componenets/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../componenets/UI/Spinner/Spinner';

const ING_PRICES = {
  salad: 1,
  bacon: 2,
  cheese: 3,
  meat: 4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios.get('https://burger1-49bba.firebaseio.com/ingredients.json').
        then(res => {
          this.setState({ingredients: res.data});
        }).
        catch(err => {
          console.log('Error: ' + err);
        });
  }

  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients).map(ing => {
      return ingredients[ing];
    }).reduce((sum, element) => {
      return sum + element;
    }, 0);
    this.setState({purchaseable: (sum > 0)});
  }

  addIngHandler = (ing) => {
    const count = this.state.ingredients[ing];
    const updatedIngState = {...this.state.ingredients};
    updatedIngState[ing] = count + 1;

    const prevPrice = this.state.price;
    const newPrice = prevPrice + ING_PRICES[ing];

    this.setState({
      ingredients: updatedIngState,
      price: newPrice,
    });

    this.updatePurchasable(updatedIngState);
  };

  removeIngHandler = (ing) => {
    const prevPrice = this.state.price;
    let newPrice = null;

    const count = this.state.ingredients[ing];
    const updatedIngState = {...this.state.ingredients};
    if (count > 0) {
      updatedIngState[ing] = count - 1;
      newPrice = prevPrice - ING_PRICES[ing];
    }
    this.setState({
      ingredients: updatedIngState,
      price: newPrice,
    });

    this.updatePurchasable(updatedIngState);
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    const query = [];
    for (let ingredient in this.state.ingredients) {
      query.push(encodeURIComponent(ingredient) + '=' +
          encodeURIComponent(this.state.ingredients[ingredient]));
    }
    query.push('price=' + this.state.price);
    const queryStr = query.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryStr,
    });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };

    for (let key in disableInfo) {
      // turns false if there are no orders of this element.
      disableInfo[key] = (disableInfo[key] <= 0);
    }

    let orderSummary = <Spinner/>;
    let burger = <Spinner/>;
    if (this.state.ingredients) {
      burger = (
          <Auxiliary>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                addIng={this.addIngHandler}
                remIng={this.removeIngHandler}
                disabled={disableInfo}
                price={this.state.price}
                purchasable={this.updatePurchasable}
                purchasing={this.purchaseHandler}
            />
          </Auxiliary>
      );

      orderSummary = (
          <OrderSummary
              ingredients={this.state.ingredients}
              cancelHandler={this.purchaseCancelHandler}
              continueHandler={this.purchaseContinueHandler}
              price={this.state.price}
          />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }

    return (
        <Auxiliary>
          <Modal
              show={this.state.purchasing}
              modalOff={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
        </Auxiliary>
    );
  }
}

export default BurgerBuilder;