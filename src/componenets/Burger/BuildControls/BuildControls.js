import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p className={classes.Price}> Current Price: {props.price}.0$ </p>
        {controls.map(control => {
            return <BuildControl
                        key={control.label} label={control.label}
                        addIng={() => props.addIng(control.type)}
                        remIng={() => props.remIng(control.type)}
                        disabled={props.disabled[control.type]}
                    />
        })}
        <button className={classes.OrderButton}
                onClick={props.purchasing}
                disabled={!props.purchasable}
                >
            Order
        </button>
    </div>
);

export default buildControls;