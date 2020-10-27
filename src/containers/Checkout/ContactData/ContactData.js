import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../../../componenets/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../componenets/UI/Spinner/Spinner';
import Input from '../../../componenets/UI/Input/Input';

class ContactData extends Component {
  state = {
    loading: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your city',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      house: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your house number',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      delivery_method: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', display: 'Fastest'},
            {value: 'cheapest', display: 'Cheapest'},
          ],
          defaultValue: 'Method of delivery',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== '';
    }
    // Can add more conditions here!
    return isValid;
  };

  orderHandler = (event) => {
    event.preventDefault();

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    };

    let customer = {};
    for (let key in this.state.orderForm) {
      const copyOfCustomer = {...this.state.orderForm[key]};
      customer[key] = copyOfCustomer['value'];

      // check validity
      if (!this.state.orderForm[key].valid) {
        alert('Invalid field: ' + key);
        return;
      }
    }
    order['customer'] = customer;

    axios.post('/orders.json', order).then(res => {
      this.setState({loading: false});
      this.props.history.push('/');
    }).catch(err => {
      this.setState({loading: false});
      console.log(err);
    });
    this.props.history.push('/checkout');
  };

  formChangesHandler = (event, id) => {
    const updatedForm = {...this.state.orderForm};
    const updatedElement = {...updatedForm[id]};
    updatedElement.value = event.target.value;
    updatedElement.valid = this.checkValidity(updatedElement.value,
        updatedElement.validation);
    updatedForm[id] = updatedElement;
    this.setState({orderForm: updatedForm});
  };

  render() {
    let formElements = [];
    for (let key in this.state.orderForm) {
      let properties = this.state.orderForm[key];
      formElements.push({
        id: key,
        values: properties,
        value: properties['value'],
      });
    }

    let form = (
        <form onSubmit={this.orderHandler}>
          {formElements.map(formElements => (
                  <Input
                      tagtype={formElements.values['elementType']}
                      configs={formElements.values['elementConfig']}
                      changeHandler={(event) => this.formChangesHandler(event,
                          formElements.id)}
                      value={formElements['value']}/>
              ),
          )
          }
          <Button buttonType="Success"> Order </Button>
        </form>
    );

    if (this.state.loading) {
      form = <Spinner/>;
    }
    console.log("[ContactData]", this.props);
    return (
        <div className={classes.ContactData}>
          <h2> The total price is: {parseFloat(this.props.price).toFixed(2)}$</h2>
          <h4> Enter your contact data </h4>
          {form}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps, null)(ContactData);

