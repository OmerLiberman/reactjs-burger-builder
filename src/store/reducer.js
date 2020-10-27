import * as Action from './actions';

const ING_PRICES = {
  salad: 0.5,
  bacon: 2.35,
  cheese: 1.1,
  meat: 2,
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  console.log("[reducer.js]", action);
  switch (action.type) {
    case Action.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + ING_PRICES[action.ingName]
      };
    case Action.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1
        },
        totalPrice: Math.max(state.totalPrice - ING_PRICES[action.ingName], 0),
      };
    default:
      return state;
  }
};

export default reducer;