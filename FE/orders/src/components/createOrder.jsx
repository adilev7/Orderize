import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import orderService from "../services/orderService";
import { toast } from "react-toastify";
import OrderItem from "./orderItem";
class CreateOrder extends Form {
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
  counter = 1;

  orderItemsSchema = {
    id: Joi.number(),
    description: Joi.string().min(2).max(30).label("description"),
    quantity: Joi.number().min(1).label("quantity"),
  };

  schema = {
    custName: Joi.string().min(2).max(30).required().label("custName"),
    orderItems: Joi.array()
      .label("orderItems")
      .required()
      .items(this.orderItemsSchema),
  };

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

  handleErrRndr = (errors, name, id) => {
    if (name !== "custName") {
      let i = errors.orderItems.find((item) =>
        item.hasOwnProperty(`${name}<${id}>`)
      );
      return i !== undefined ? i[`${name}<${id}>`] : null;
    } else {
      return errors[name];
    }
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    await orderService.createOrder(data);
    toast("The Order Has Been Listed Successfuly");
    await this.setState({ data });
    this.props.history.replace("/orders");
  };

  duplicateItem = () => {
    let { orderItems } = this.state.data;
    let item = { id: this.counter, description: "", quantity: 1 };
    this.counter++;
    orderItems.push(item);
    this.setState({ data: { orderItems } });
    // console.log("duplicate888counter: ", this.counter);
    // console.log(orderItems);
  };

  deleteItem = (id) => {
    let { orderItems } = this.state.data;
    // console.log("B4 filter" + JSON.stringify(orderItems));
    orderItems = orderItems.filter((item) => item.id !== id);
    // console.log("AFTER" + JSON.stringify(orderItems));
    this.setState({ data: { orderItems } });
  };

  render() {
    console.log("state8888888888888" + JSON.stringify(this.state));
    return (
      <div className='container-fluid mt-2'>
        <div className='row'>
          <div className='col-10 text-center heading mx-auto my-5'>
            <h1 className='display-3'>Create A New Order</h1>
          </div>
        </div>
        <form noValidate autoComplete='off' onSubmit={this.handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-8 mx-auto'>
              {this.renderInput("custName", "Customer Name")}
            </div>
          </div>
          {this.state.data.orderItems.map((item) => {
            return (
              <OrderItem deleteBtn={item.id} key={item.id} thisParent={this} />
            );
          })}

          {/* {this.orderItemArr.map((orderItem) => orderItem)} */}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default CreateOrder;
