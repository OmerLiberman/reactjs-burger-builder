import React, {Component} from "react";
import "./BurgerIngredient.css";
import classes from "./BurgerIngredient.css";
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render () {
        let ing;
        switch (this.props.type) {
            case ('bread-bottom'):
                ing = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ing = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ing = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ing = <div className={classes.Cheese}></div>;
                break;
            case ('salad'):
                ing = <div className={classes.Salad}></div>;
                break;
            case ('bacon'):
                ing = <div className={classes.Bacon}></div>;
                break;
            default:
                ing = null;
        }
        return ing;
    }
}

BurgerIngredient.propType = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;