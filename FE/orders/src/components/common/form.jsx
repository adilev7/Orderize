import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
// import OrderItem from "../orderItem";

class Form extends Component {
  ///* VALIDATE */
  //Returns an 'errors' object, matching the data properties to their errors returned from 'Joi'. Returns 'null' if no errors exist.
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  ///* VALIDATE INPUT */
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
    return error ? error.details[0].message : null;
  };

  ///* HANDLE CHANGE */
  //Sets the 'errors' object in the state everytime an error changes or doesn't exist.
  //Starts a binding between the data object in the state and the input's value.
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const errorMessage = this.validateInput(input);

    errorMessage
      ? (errors[input.name] = errorMessage)
      : delete errors[input.name];

    data[input.name]
      ? (data[input.name] = input.value)
      : (data.orderItems[0][input.name] = input.value);
    this.setState({ data, errors });
    /*     console.log(
      "data:AAA... " + JSON.stringify(data),
      "input.name:BBB... " + JSON.stringify(input.name),
      "counter:CCC..." + this.counter,
      "data.orderItems[this.counter][input.name]:DDD..." +
        JSON.stringify(data.orderItems[this.counter][input.name])
    ); */
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
  //
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    /* console.log("data111:..." + JSON.stringify(data));
    console.log("name222:..." + name);
    console.log("this.counter333:..." + this.counter);
    console.log("data[name]444..." + JSON.stringify(data[name]));
    console.log(
      "data.orderItems[this.counter][name]555:..." +
        JSON.stringify(data.orderItems[this.counter][name])
    ); */
    return (
      <Input
        name={name}
        label={label}
        min={type === "number" ? 1 : null}
        type={type}
        error={errors[name]}
        value={data[name] ? data[name] : data.orderItems[0][name]}
        onChange={this.handleChange}
      />
    );
  };
  renderButton = (label) => {
    return (
      <button className='btn btn-primary' disabled={this.validate()}>
        {label}
      </button>
    );
  };
}
export default Form;
