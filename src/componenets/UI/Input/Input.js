import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  switch (props.tagtype) {

    case('input'):
      inputElement = <input onChange={props.changeHandler}
                            className={classes.InputElement}
                            {...props.configs}
                            value={props.value}/>;
      break;

    case('textarea'):
      inputElement =
          <textarea
              className={classes.InputElement}
              {...props.configs}
              value={props.value}
              onChange={props.changeHandler}/>;
      break;

    case('select'):
      let options = [];
      for (let opt in props.configs['options']) {
        options.push({
          value: props.configs['options'][opt]['value'],
          display: props.configs['options'][opt]['display'],
        });
      }

      inputElement =
          <select className={classes.InputElement} value={props.value} onChange={props.changeHandler}>
            <option value="" selected disabled hidden> {props.configs['defaultValue']}</option>
            {
              options.map(opt => (
                  <option value={opt['value']}> {opt['display']} </option>
              ))
            }
          </select>;
      break;

    default:
      inputElement = <input
          className={classes.InputElement}
          {...props.configs}
          value={props.value} onChange={props.changeHandler}/>;
      break;
  }

  return (
      <div className={classes.Input}>
        {inputElement}
      </div>
  );
};

export default input;