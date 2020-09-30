import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import productService from "../services/productService";
import { toast } from "react-toastify";
class CreateProduct extends Form {
  state = {
    data: {
      description: "",
      img: "",
      price: undefined,
    },

    errors: {
      description: "",
      price: "",
    },
  };
  counter = 1;

  /* Joi Schema */

  schema = {
    description: Joi.string().required().label("description"),
    img: Joi.string().label("image").allow(""),
    price: Joi.number().min(0.1).required().label("price"),
  };

  /* "handleErrChange" will invoke inside the "handleChange" function in 'form.jsx' */
  // "handleErrChange" rearranges the 'error' object of the state, due to changes.
  handleErrChnge = (errors, input, errorMessage) => {
    errorMessage
      ? (errors[input.name] = errorMessage)
      : delete errors[input.name];
  };

  /* "handleErrRndr" will invoke inside the "renderInput" function in 'form.jsx' */
  // "handleErrRndr" returns the relevant error message in order to match its relevant input.
  handleErrRndr = (errors, name) => errors[name];
  doSubmit = async () => {
    const data = { ...this.state.data };
    await productService.createProduct(data);
    this.setState({ data });
    this.props.history.replace("/products");
    toast("The Product Has Been Listed Successfuly");
  };

  renderTable = () => {
    return (
      <table className='table table-sm col-12 col-md-8 mx-auto table-bordered table-warning table-striped border-2'>
        <caption className='d-none'>Create New Product</caption>
        <thead className='text-dark bg-warning'>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Price</th>
            <th scope='col'>Image</th>
          </tr>
        </thead>
        <tbody className='text-dark'>
          <tr>
            <td>{this.renderInput("description", "Description")}</td>
            <td>{this.renderInput("price", "Price", undefined, "number")}</td>
            <td>{this.renderInput("img", "Image", undefined, "file")}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  render() {
    return (
      <div className='container-fluid mt-2'>
        <div className='row'>
          <div className='col-10 text-center heading mx-auto my-5'>
            <h1 className='display-3'>New Product</h1>
          </div>
        </div>
        <form noValidate autoComplete='off' onSubmit={this.handleSubmit}>
          <div className='row-fluid'>{this.renderTable()}</div>
          <div className='row mt-5'>
            <div className='col-10 col-md-8 col-lg-4 mx-auto'>
              <span>{this.renderButton("Submit")}</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateProduct;
