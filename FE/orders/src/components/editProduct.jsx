import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import productService from "../services/productService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
class EditProduct extends Form {
  state = {
    data: {
      description: "",
      price: undefined,
      inStorage: undefined,
    },

    errors: {
      description: "",
      price: "",
      inStorage: "",
    },
  };
  counter = 0;

  /* Joi Schema */

  schema = {
    _id: Joi.string(),
    __v: Joi.number(),
    description: Joi.string().required().label("description"),
    price: Joi.number().min(0).required().label("price"),
    inStorage: Joi.number().min(0).required().label("inStorage"),
    createdAt: Joi.string(),
  };

  //Get the specific product data from the DB;
  componentDidMount = async () => {
    let data = await productService
      .getProduct(this.props.match.params.id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.props.history.replace("/notFound");
        console.error(error.response);
      });
    if (data) {
      data = data[0];
      // data.orderItems.map((item) => (item.id = this.counter++));
      console.log("B4:", data);
      this.setState({ data });
      console.log("AFTER:", data);
    }
  };

  /* "handleErrChange" will invoke inside the "handleChange" function in 'form.jsx' */
  // "handleErrChange" rearranges the 'error' object of the state, due to changes.
  handleErrChnge = (errors, input, errorMessage) => {
    if (errorMessage) {
      if (input.name === "custName") {
        errors[input.name] = errorMessage;
      } //else {
      //   errors.orderItems = errors.orderItems.filter(
      //     (item) => !item.hasOwnProperty(`${input.name}<${input.id}>`)
      //   );
      //   errors.orderItems.push({
      //     [`${input.name}<${input.id}>`]: errorMessage,
      //   });
      // }
    } else {
      // errors.hasOwnProperty(input.name) ?
      delete errors[input.name];
      // : (errors.orderItems = errors.orderItems.filter(
      //     (item) => !item.hasOwnProperty(`${input.name}<${input.id}>`)
      //   ));
    }
  };

  /* "handleErrRndr" will invoke inside the "renderInput" function in 'form.jsx' */
  // "handleErrRndr" returns the relevant error message in order to match its relevant input.
  handleErrRndr = (errors, name, id) => {
    // if (name !== "custName") {
    //   let i = errors.orderItems.find((item) =>
    //     item.hasOwnProperty(`${name}<${id}>`)
    //   );
    //   return i ? i[`${name}<${id}>`] : null;
    // } else {
    return errors[name];
    // }
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    this.setState({ data });
    await productService.editProduct(this.state.data);
    this.props.history.replace("/products");
    toast(`${data.description} Has Been Updated Successfuly`);
  };

  // duplicateItem = (e) => {
  //   e.preventDefault();
  //   let data = { ...this.state.data };
  //   let orderItems = [...this.state.data.orderItems];
  //   let item = { id: this.counter, description: "", quantity: 1 };
  //   this.setState({ data: { ...data, orderItems: [...orderItems, item] } });
  //   this.counter++;
  // };

  // deleteItem = (e, id) => {
  //   e.preventDefault();
  //   let data = { ...this.state.data };
  //   let orderItems = [...this.state.data.orderItems];
  //   //Rearrange "orderItems" to be without the deleted item;
  //   orderItems = orderItems.filter((item) => item.id !== id);
  //   this.counter = 0;
  //   //Reset the counter (id) to each item;
  //   orderItems.map((item) => (item.id = this.counter++));
  //   this.setState({ data: { ...data, orderItems } });
  // };

  renderTable = () => {
    return (
      <table className='table table-sm col-12 col-md-8 mx-auto table-bordered table-warning table-striped border-2'>
        <caption className='d-none'>Selected Products</caption>
        <thead className='text-dark bg-warning'>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Price</th>
            <th scope='col'>In Storage</th>
          </tr>
        </thead>
        <tbody className='text-dark'>
          <tr>
            <td className='td2'>
              {this.renderInput("description", "Description")}
            </td>
            <td className='td3'>
              <div className='input-group-prepend'>
                <span className='input-group-text px-1 text-left h-25 w-25 bg-light  border-right-0'>
                  $
                </span>
                {this.renderInput("price", "Price", undefined, "number")}
              </div>
            </td>
            <td className='td3'>
              {this.renderInput("inStorage", "In Storage", undefined, "number")}
            </td>
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
          <div className='row-fluid'>
            <table className='table table-sm col-11 col-md-8 mx-auto table-bordered table-warning table-striped border-2'>
              <caption className='d-none'>Create New Product</caption>
              <thead className='text-dark bg-warning'>
                <tr>
                  <th scope='col'>Description</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>In Storage</th>
                </tr>
              </thead>
              <tbody className='text-dark'>
                <tr>
                  <td className='td2'>
                    {this.renderInput("description", "Description")}
                  </td>
                  <td className='td3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text px-1 text-left h-25 w-25 bg-light  border-right-0'>
                        $
                      </span>
                      {this.renderInput("price", "Price", undefined, "number")}
                    </div>
                  </td>
                  <td className='td3'>
                    {this.renderInput(
                      "inStorage",
                      "In Storage",
                      undefined,
                      "number"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='row mt-5'>
            <div className='col-10 col-md-8 col-lg-4 mx-auto text-center'>
              <Link to='/products' className='btn btn-secondary mx-3'>
                Cancel
              </Link>
              <span className='mx-3'>{this.renderButton("Submit")}</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProduct;
