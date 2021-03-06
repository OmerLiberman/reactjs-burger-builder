import React from "react";

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";

const modal = (props) => {
    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalOff}/>
            <div
                style={{
                    transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                className={classes.Modal}>
                {props.children}
            </div>
        </Auxiliary>

);
}

export default modal;