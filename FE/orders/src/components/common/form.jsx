import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  ///* VALIDATE */
  //Returns an 'errors' object, matching the data properties to their errors returned from 'Joi'. Returns 'null' if no errors exist.
  // called only when renderring the 'submit' button (for enable/disable the button).
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    let orderItems = [];
    for (let item of error.details) {
      console.log("77777 error item:  ", item);
      item.path[0] === "orderItems"
        ? // ? (errors["orderItems"][0][item.path[2]] = item.message)
          orderItems.push({
            [`${item.path[2]}<${item.path[1]}>`]: item.message,
          })
        : //   (orderItems[item.path[1]] = { [item.path[2]]: item.message })
          (errors[item.path[0]] = item.message);
    }
    errors["orderItems"] = orderItems;
    console.log("errorSSSSS:  ", JSON.stringify(this.state));
    // console.log("errors orderitems:  ", JSON.stringify(orderItems));

    return errors;
  };

  ///* VALIDATE INPUT */
  // called within onChange event...
  //Validates a specific input using 'Joi'.
  //Returns the error message. If no error exists, returns 'null'.
  validateInput = ({ name, value }) => {
    const obj = { [name]: value };

    const schema = {
      [name]: this.schema[name]
        ? this.schema[name]
        : this.orderItemsSchema[name],
    };
    const { error } = Joi.validate(obj, schema);
    console.log(JSON.stringify(error));
    return error ? error.details[0].message : null;
  };

  ///* HANDLE CHANGE */
  //Sets the 'errors' object in the state everytime an error changes or doesn't exist.
  //Starts a binding between the data object in the state and the input's value.
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };

    const errorMessage = this.validateInput(input);

    this.handleErrChnge(errors, input, errorMessage);

    data.hasOwnProperty(input.name)
      ? (data[input.name] = input.value)
      : (data.orderItems[input.id || 0][input.name] = input.value);

    this.setState({
      data,
      errors,
    });
  };

  ///* HANDLE SUBMIT */
  //Prevents the refreshing of the page on submition.
  //Sets the 'errors' object of the state to the 'errors' object returned by 'this.validate', or to an empty object if no errors exist.
  //Envokes the 'doSubmit' function.
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  //Bind the value of the input to "data[name]" if exists, if not, bind to "data.orderItems[data.orderItems.length-1][name]", witch is the last item in the array, on the [name] prop;
  renderInput = (name, label, type = "text", id) => {
    let data = { ...this.state.data };
    const errors = { ...this.state.errors };
    let inptErr = this.handleErrRndr(errors, name, id);
    return (
      <Input
        name={name}
        label={label}
        min={type === "number" ? 1 : null}
        id={id}
        type={type}
        error={inptErr}
        value={data[name] || data.orderItems[id || 0][name]}
        onChange={this.handleChange}
      />
    );
  };
  renderButton = (label) => {
    return (
      <div className='container'>
        <button className='btn btn-primary m-5 ' disabled={this.validate()}>
          {label}
        </button>
      </div>
    );
  };
}
export default Form;
