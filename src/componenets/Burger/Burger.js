import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const burger = (props) => {
    console.log("[Burger]", props);
    let transformedIng = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, ind) => {
            return <BurgerIngredient key={ingKey + ind} type={ingKey}/>
        })
    }).reduce((arr, element) => {
        return arr.concat(element);
        }, []);

    if (transformedIng.length === 0) {
        transformedIng = <p> Please add some ingredients! </p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIng}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;