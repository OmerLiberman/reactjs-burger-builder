import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(ingKey => {
        return (<li key={ingKey}> <span> {ingKey} </span>: {props.ingredients[ingKey]} </li>);
    });
    return (
        <Auxiliary>
            <h3> Your Order </h3>
            <p> A burger with the following ingredients: </p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p style={{fontWeight: "bold"}}> The price is: {props.price}.00$</p>
            <p> Continue to checkout ?</p>
            <Button buttonType={"Danger"} clicked={props.cancelHandler}> Cancel </Button>
            <Button buttonType={"Success"} clicked={props.continueHandler}> Continue </Button>
        </Auxiliary>
    );
};

export default orderSummary;