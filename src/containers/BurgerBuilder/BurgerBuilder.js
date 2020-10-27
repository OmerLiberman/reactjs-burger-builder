import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../componenets/Burger/Burger';
import BuildControls
  from '../../componenets/Burger/BuildControls/BuildControls';
import Modal from '../../componenets/UI/Modal/Modal';
import OrderSummary from '../../componenets/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../componenets/UI/Spinner/Spinner';
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from '../../store/actions';


class BurgerBuilder extends Component {
  state = {
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

    return (sum > 0);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };

    for (let key in disableInfo) {
      // turns false if there are no orders of this element.
      disableInfo[key] = (disableInfo[key] <= 0);
    }
    console.log("[BurgerBuilder]" ,this.props.ings);
    let orderSummary = <Spinner/>;
    let burger = <Spinner/>;
    if (this.props.ings) {
      burger = (
          <Auxiliary>
            <Burger ingredients={this.props.ings}/>
            <BuildControls
                addIng={this.props.onIngredientAdded}
                remIng={this.props.onIngredientRemoved}
                disabled={disableInfo}
                price={this.props.totalPrice}
                purchasable={this.updatePurchasable(this.props.ings)}
                purchasing={this.purchaseHandler}
            />
          </Auxiliary>
      );

      orderSummary = (
          <OrderSummary
              ingredients={this.props.ings}
              cancelHandler={this.purchaseCancelHandler}
              continueHandler={this.purchaseContinueHandler}
              price={this.props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: ADD_INGREDIENT, ingName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: REMOVE_INGREDIENT, ingName: ingName})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);