import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import orderService from "../services/orderService";
import { toast } from "react-toastify";
import OrderItem from "./orderItem";
import { Link } from "react-router-dom";
class EditOrder extends Form {
  state = {
    data: {
      custName: "",
      orderItems: [
        {
          id: 0,
          description: "",
          quantity: 1,
        },
      ],
    },

    errors: {
      custName: "",
      orderItems: [],
    },
  };
  counter = 0;

  /* Joi Schema */
  orderItemsSchema = {
    _id: Joi.string().allow(""),
    id: Joi.number(),
    descSelect: Joi.string().min(2).max(30).label("Description"),
    quantity: Joi.number().min(1).label("Quantity"),
  };

  schema = {
    _id: Joi.string(),
    __v: Joi.number(),
    createdAt: Joi.string(),
    custName: Joi.string().min(2).max(30).required().label("Customer Name"),
    orderItems: Joi.array()
      .label("orderItems")
      .required()
      .items(this.orderItemsSchema),
  };

  //Get the specific order data from the DB;
  componentDidMount = async () => {
    let data = await orderService
      .getOrder(this.props.match.params.id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.props.history.replace("/notFound");
        console.error(error.response);
      });
    if (data) {
      data = data[0];
      data.orderItems.map((item) => (item.id = this.counter++));
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
      } else {
        errors.orderItems = errors.orderItems.filter(
          (item) => !item.hasOwnProperty(`${input.name}<${input.id}>`)
        );
        errors.orderItems.push({
          [`${input.name}<${input.id}>`]: errorMessage,
        });
      }
    } else {
      errors.hasOwnProperty(input.name)
        ? delete errors[input.name]
        : (errors.orderItems = errors.orderItems.filter(
            (item) => !item.hasOwnProperty(`${input.name}<${input.id}>`)
          ));
    }
  };

  /* "handleErrRndr" will invoke inside the "renderInput" function in 'form.jsx' */
  // "handleErrRndr" returns the relevant error message in order to match its relevant input.
  handleErrRndr = (errors, name, id) => {
    if (name !== "custName") {
      let i = errors.orderItems.find((item) =>
        item.hasOwnProperty(`${name}<${id}>`)
      );
      return i ? i[`${name}<${id}>`] : null;
    } else {
      return errors[name];
    }
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    this.setState({ data });
    await orderService.editOrder(this.state.data);
    this.props.history.replace("/orders");
    toast(`Order Number ${data._id} Has Been Updated Successfuly`);
  };

  duplicateItem = (e) => {
    e.preventDefault();
    let data = { ...this.state.data };
    let orderItems = [...this.state.data.orderItems];
    let item = { id: this.counter, description: "", quantity: 1 };
    this.setState({ data: { ...data, orderItems: [...orderItems, item] } });
    this.counter++;
  };

  deleteItem = (e, id) => {
    e.preventDefault();
    let data = { ...this.state.data };
    let orderItems = [...this.state.data.orderItems];
    //Rearrange "orderItems" to be without the deleted item;
    orderItems = orderItems.filter((item) => item.id !== id);
    this.counter = 0;
    //Reset the counter (id) to each item;
    orderItems.map((item) => (item.id = this.counter++));
    this.setState({ data: { ...data, orderItems } });
  };

  renderTable = () => {
    return (
      <table className='table table-sm col-12 col-md-8 mx-auto table-bordered table-warning table-striped border-2'>
        <caption className='d-none'>Selected Products</caption>
        <thead className='text-dark bg-warning'>
          <tr>
            <th scope='col'>No.</th>
            <th scope='col'>Description</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Price</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody className='text-dark'>
          {this.state.data.orderItems.map((item) => (
            <OrderItem deleteBtn={item.id} key={item.id} thisParent={this} />
          ))}
        </tbody>
      </table>
    );
  };

  render() {
    return (
      <div className='container-fluid mt-2'>
        <div className='row'>
          <div className='col-10 text-center heading mx-auto my-5'>
            <h1 className='display-3'>New Order</h1>
          </div>
        </div>
        <form noValidate autoComplete='off' onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-8 mx-auto'>
              {this.renderInput("custName", "Customer Name")}
            </div>
          </div>
          <div className='row-fluid'>
            {this.state.data["custName"].length ? (
              this.renderTable()
            ) : (
              <p className='text-center'>
                <strong>Please provide customer name to continue...</strong>
              </p>
            )}
          </div>
          <div className='row mt-3'>
            <div className='col-10 col-md-8 col-lg-4 mx-auto text-center'>
              <Link to='/orders' className='btn btn-secondary mx-3'>
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

export default EditOrder;