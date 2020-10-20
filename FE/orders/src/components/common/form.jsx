import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Search from "./search";

class Form extends Component {
  ///* validate */
  // Returns an 'errors' object, matching the data properties to their errors returned    from 'Joi'. Returns 'null' if no errors exist.
  // Called only within the 'submit' button functions (for enabling/disabling the button) and for final validation before submition.
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    const errors = {};
    let orderItems = [];

    if (error) {
      for (let item of error.details) {
        if (item.path[0] === "orderItems") {
          orderItems.push({});
          errors["orderItems"] = orderItems;
        } else {
          errors[item.path[0]] = item.message;
        }
      }
      return errors;
    }
  };

  ///* validateInput */
  // Called within the handleChange function (line 49)
  // Validates a specific input using 'Joi'.
  // Returns the error message if exists.
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

  ///* handleChange */
  // Sets the 'errors' object in the state everytime an error status changes.
  // Starts a binding between the data object in the state and the input's value.
  handleChange = async ({ currentTarget: input }, searchErr) => {
    const { data } = this.state;
    const errors = { ...this.state.errors };
    const errorMessage = searchErr?.message || this.validateInput(input);
    this.handleErrChnge(errors, input, errorMessage);

    data.hasOwnProperty(input.name)
      ? (data[input.name] = input.value)
      : (data.orderItems[input.id || 0][input.name] = input.value);

    this.setState({ data, errors });
    this.totalPrice && this.totalPrice();
  };

  ///* handleSubmit */
  // Sets the 'errors' object of the state to the 'errors' object returned by the validate function (line 10), or to an empty object if no errors exist.
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  /* renderInput */
  //Binds the value of the input to its specific place in the component"
  renderInput = (
    name,
    label,
    id,
    placeholder,
    type = "text",
    className = "form-control"
  ) => {
    let { data, errors } = this.state;
    //inptErr will hold the specific input's error message (if exists);
    let inptErr = this.handleErrRndr(errors, name, id);
    return (
      <Input
        name={name}
        className={className}
        placeholder={placeholder}
        label={label}
        id={id}
        min={type === "number" ? (name === "quantity" ? 1 : 0) : null}
        type={type}
        error={inptErr}
        value={
          data[name] || (data.orderItems && data.orderItems[id || 0][name])
        }
        onChange={this.handleChange}
      />
    );
  };

  /* renderSearch */
  // A search bar using "react-autosuggest" (see search component)
  renderSearch = (
    name,
    id,
    placeholder,
    errMsg,
    className = "form-control"
  ) => {
    const { data, errors, dbdata } = this.state;
    let inptErr = this.handleErrRndr(errors, name, id);
    return (
      <Search
        name={name}
        id={id}
        placeholder={placeholder}
        data={dbdata}
        className={className}
        error={inptErr}
        errMsg={errMsg}
        value={data[name] || data.orderItems[id || 0][name]}
        validate={this.validate}
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
