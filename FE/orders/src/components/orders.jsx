import React, { Component } from "react";
import orderService from "../services/orderService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Orders extends Component {
  state = {
    orders: [],
    filterOrders: [],
  };

  async componentDidMount() {
    //Get orders from DB and store in orders array
    const { data: orders } = await orderService.getAllOrders();
    orders
      ? this.setState({ orders, filterOrders: orders.reverse() })
      : toast("No orders have been listed...");
  }

  handleChange = (e) => {
    let filterOrders = [...this.state.filterOrders];
    const { orders } = this.state;
    const inputValue = e.currentTarget.value.trim().toLowerCase();
    const inputLength = inputValue.length;
    filterOrders = orders.filter(
      (item) =>
        item.custName.toLowerCase().slice(0, inputLength) === inputValue ||
        item._id.toLowerCase().slice(0, inputLength) === inputValue
    );
    this.setState({ filterOrders });
  };

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
    const { filterOrders, orders } = this.state;
    return (
      <div>
        <div className='container'>
          <div className='row ml-md-3'>
            <div className='col-12 mt-4'>
              <h4 className='heading text-secondary'>
                {orders.length
                  ? `There are currently ${orders.length} orders listed.`
                  : "Loading Orders..."}
              </h4>
            </div>
          </div>
          <div className='row mt-5 ml-md-3'>
            <div className='input-group col-12 col-md-7 text-center'>
              <div class='input-group-prepend'>
                <span class='input-group-text bg-white' id='basic-addon1'>
                  <i className='fas fa-search text-secondary'></i>
                </span>
              </div>
              <input
                type='text'
                className='form-control text-secondary border-left-0'
                placeholder='Search by Customer or No. '
                onChange={this.handleChange}
              />
            </div>
            <div className='col-12 col-md-3 mt-4 mt-md-0 mr-md-4 ml-md-auto text-md-right text-left'>
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
                {filterOrders.length > 0 &&
                  filterOrders.map((order) => (
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
                            <Link
                              className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                              to={`/orders/${order._id}`}>
                              <i className='fas fa-clipboard text-secondary mr-2'></i>
                              View Order
                            </Link>
                            <Link
                              className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                              to={`/edit-order/${order._id}`}>
                              <i className='fas fa-pen text-primary mr-2'></i>{" "}
                              Edit Order
                            </Link>
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
                      <td>{`$${order.totalPrice}`}</td>
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
