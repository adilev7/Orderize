import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import orderService from "../services/orderService";
import { toast } from "react-toastify";
import OrderItem from "./orderItem";
class CreateOrder extends Form {
  state = {
    data: {
      custName: "Yosi",
      orderItems: [
        {
          description: "hi",
          quantity: 1,
        },
      ],
    },

    errors: {},
  };

  orderItemsSchema = {
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

  doSubmit = async () => {
    const data = { ...this.state.data };
    await orderService.createOrder(data);
    toast("The Order Has Been Listed Successfuly");
    await this.setState({ data });
    this.props.history.replace("/orders");
  };

  duplicateItem = () => {
    console.log("77777777777777");
    let { data } = this.state;
    let { orderItems } = this.state.data;
    let item = { description: "", quantity: 1 };
    orderItems.push(item);
    // this.setState({ orderItems: [...orderItems, item] });
    this.setState({ data });
    console.log(orderItems);
  };

  deleteItem = (id) => {
    let { orderItemArr } = this.state;
    orderItemArr = orderItemArr.filter((orderItem) => orderItem.id !== id);
    this.setState({ orderItemArr });
  };

  render() {
    let counter = 0;
    console.log("9999999999999");
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
            console.log("0000000000", counter);
            let show = counter !== 0;
            return (
              <OrderItem
                thisParent={this}
                key={counter++}
                deleteBtn={show} /* {counter === 0 ? false : true} */
              />
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
