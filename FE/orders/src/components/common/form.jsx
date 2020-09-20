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

    const validate_errors = {};
    let validate_orderItems = [];
    for (let item of error.details) {
      console.log("77777 error item:  ", item);
      item.path[0] === "orderItems"
        ? // ? (errors["orderItems"][0][item.path[2]] = item.message)
          validate_orderItems.push({
            idx: item.path[1],
            err_desc: `${item.path[2]}: ${item.message}`,
          })
        : //   (orderItems[item.path[1]] = { [item.path[2]]: item.message })
          (validate_errors[item.path[0]] = item.message);
    }
    validate_errors["orderItems"] = validate_orderItems;
    console.log("errorSSSSS:  ", JSON.stringify(this.state));
    // console.log("errors orderitems:  ", JSON.stringify(orderItems));

    return validate_errors !== {} ? validate_errors : null;
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
    // const { data, errors } = this.state;
    const data = { ...this.state.data };
    //===>>>>>>> const errors = { ...this.state.data };
    const errors = { ...this.state.data.errors };

    const errorMessage = this.validateInput(input);

    errorMessage
      ? (errors[input.name] = { indx: input.id, err_desc: errorMessage })
      : delete errors[input.name];

    input.name in data
      ? (data[input.name] = input.value)
      : (data.orderItems[input.id ? input.id : 0][input.name] = input.value);
    this.setState({ data, errors });
    // console.log("input.name:  ", input.name);
    // console.log("input.value:  ", input.value);

    // console.log("DATAAAAAAAA:  ", data);
    // console.log("DATA[custName]:  ", this.state.data["custName"]);
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
    const { data, errors } = this.state;
    // errors[name]
    //   ? console.log("errors[name] EXISTS!!!! ", errors[name])
    //   : console.log("errors.orderItems IS ALIVE!!!! ", errors.orderItems); 5555555

    var xxx = errors.orderItems
      ? errors.orderItems.filter((elmnt) => elmnt[id] === id)
      : "";
    console.log("66666666666", errors.orderItems);
    return (
      <Input
        name={name}
        label={label}
        min={type === "number" ? 1 : null}
        id={id}
        type={type}
        error={
          errors[name]
            ? errors[name]
            : xxx /*  ? errors[name] : errors.orderItems */
        }
        // error={errors[name] || errors.orderItems[id ? id : 0][name] || null}
        value={data[name] ? data[name] : data.orderItems[id ? id : 0][name]}
        onChange={this.handleChange}
      />
    );
  };
  renderButton = (label) => {
    return (
      <button className='btn btn-primary' disabled={() => this.validate()}>
        {label}
      </button>
    );
  };
}
export default Form;
