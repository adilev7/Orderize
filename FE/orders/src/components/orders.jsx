import React, { Component } from "react";
/* import PageHeader from "./common/pageHeader"; */
import orderService from "../services/orderService";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

class Orders extends Component {
  state = {
    orders: [],
  };

  async componentDidMount() {
    //Get orders from DB and store in orders array
    const { data } = await orderService.getAllOrders();
    data
      ? this.setState({ orders: data })
      : toast("No orders have been listed...");
  }

  dltOrder = async (orderId) => {
    let orders = [...this.state.orders];
    if (window.confirm("ARE YOU SURE?")) {
      await orderService.deleteOrder(orderId);
      orders = orders.filter((item) => item._id !== orderId);
      toast(`Order ${orderId} has been successfuly deleted`);
    }
    this.setState({ orders });
  };

  render() {
    const { orders } = this.state;
    return (
      <div>
        <div className='container text-center text-md-left'>
          <div className='row mt-5'>
            <div className='col-10 ml-md-5 mx-auto'>
              <h4 className='mb-5 mt-3 heading'>
                {orders.length
                  ? `There are currently ${orders.length} orders listed.`
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
                      <td className='p-0'>
                        <div className='btn-group'>
                          <button
                            type='button'
                            className='btn btn-light mr-3 ml-0 rounded h-100 py-3 my-0 dropdown-toggle-split'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'>
                            <i className='fas fa-ellipsis-v'></i>
                          </button>
                          <div className='dropdown-menu p-0 bg-light'>
                            <NavLink
                              className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                              to={`/orders/${order._id}`}>
                              <i className='fas fa-clipboard text-secondary mr-2'></i>
                              View Order
                            </NavLink>
                            <NavLink
                              className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                              to='/'>
                              <i className='fas fa-pen text-primary mr-2'></i>{" "}
                              Edit Order
                            </NavLink>
                            <div className='dropdown-divider p-0 m-0'></div>
                            <button
                              className='dropdown-item bg-light text-dark pl-3 p-1'
                              onClick={() => {
                                this.dltOrder(order._id);
                              }}>
                              <i className='fas fa-trash text-danger mr-2'></i>{" "}
                              Delete Order
                            </button>
                          </div>
                        </div>
                        <span>{order._id}</span>
                      </td>
                      <td>{order.custName}</td>
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
