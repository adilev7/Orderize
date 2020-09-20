import React, { Component } from "react";
/* import PageHeader from "./common/pageHeader"; */
import orderService from "../services/orderService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Orders extends Component {
  state = {
    orders: [],
  };
  async componentDidMount() {
    //Get orders from DB and store in orders
    const { data } = await orderService.getAllOrders();
    if (data.length) {
      this.setState({ orders: data });
    }
    // TOAST - listed orders
    if (this.state.orders.length) {
      return toast(
        `There are currently ${this.state.orders.length} orders listed.`
      );
    }
    toast("No orders have been listed...");
  }

  render() {
    const { orders } = this.state;

    return (
      <div>
        {/* <PageHeader titleText="My Orders Page" /> */}
        <div className='container text-center text-md-left'>
          <div className='row mt-5'>
            <div className='col-10 ml-md-5 mx-auto'>
              <h4 className='mb-5 mt-3 heading'>
                {this.state.orders.length
                  ? `There are currently ${this.state.orders.length} orders listed.`
                  : "Loading Orders..."}
              </h4>
              <Link to='/create-order'>
                <button className='btn btn-primary'>
                  <i className='fas fa-plus-circle'></i> Create new order
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='table-responsive my-5'>
            <table className='table col-10  mx-auto table-bordered table-warning border-2'>
              <caption className='d-none'>list of orders</caption>
              <thead className='text-dark'>
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Customer</th>
                  <th scope='col'>Number of Products</th>
                  <th scope='col'>Total Price</th>
                  <th scope='col'>Order Date</th>
                </tr>
              </thead>
              <tbody className='text-dark bg-light'>
                {orders.length > 0 &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <Link to='/order'>{order._id}</Link>
                      </td>
                      <td>
                        <Link to='/customer'>{order.custName}</Link>
                      </td>
                      <td className='text-center'>{order.orderItems.length}</td>
                      <td>{`${Number((Math.random() * 151).toFixed(2))}$`}</td>
                      <td>{order.createdAt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
