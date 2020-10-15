import React, { Component } from "react";
import orderService from "../services/orderService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../services/userService";
import starredService from "../services/starredService";

class Orders extends Component {
  state = {
    orders: [],
    filterOrders: [],
  };

  async componentDidMount() {
    const currentUser = userService.getCurrentUser();
    // const { pathname } = this.props.location;
    let { data: orders } = await orderService.getAllOrders();
    let { data: starred } = await starredService.getStarredByUser(
      currentUser._id
    );
    starred = starred[0];

    // for (let order of orders) {
    // if (order._id === starred.orders?.map((orderId) => orderId)) {
    //   order.starred = true;
    // }
    orders.map((order) => {
      let cc = starred?.orders.map((orderId) => {
        if (orderId === order._id) {
          order.starred = true;
          console.log(order);
        }
        return null;
      });
      return cc;
    });

    orders
      ? this.setState({ orders, filterOrders: orders.reverse() })
      : toast("No orders have been listed...");

    // if (pathname === "/orders/starred") {
    //   let filterOrders = [...this.state.filterOrders];
    //   filterOrders = filterOrders.filter((item) => item.starred);
    //   this.setState({ filterOrders });
    // }
  }

  handleChange = async (e, orderId) => {
    let filterOrders = [...this.state.filterOrders];
    const { orders } = this.state;

    if (e.currentTarget.localName === "input") {
      const inputValue = e.currentTarget.value.trim().toLowerCase();
      const inputLength = inputValue.length;
      filterOrders = orders.filter(
        (item) =>
          item.custName.toLowerCase().slice(0, inputLength) === inputValue ||
          item._id.toLowerCase().slice(0, inputLength) === inputValue
      );
    }

    if (
      e.currentTarget.innerText === "Mark As Important" ||
      e.currentTarget.innerText === "Mark As Unimportant"
    ) {
      const order = filterOrders.find((item) => item._id === orderId);

      order.important = !order.important;

      orderService.editOrder(order);
    }

    if (
      e.currentTarget.textContent === "Star" ||
      e.currentTarget.textContent === "Unstar"
    ) {
      const { _id: user } = userService.getCurrentUser();
      let { data: starred } = await starredService.getStarredByUser(user);
      starred = starred[0];
      let orderInState = this.findInState(filterOrders, orderId);
      let orders;
      if (!starred) {
        orderInState.starred = true;
        starredService.createStarred({ user, orders: [orderId] });
        if (!filterOrders.length) {
          filterOrders[0] = 0;
        }
        this.setState({ filterOrders });
        return;
      }

      const starredOrderId = this.findInStarred(starred, orderId);

      if (starred && !starred.orders.length) {
        orderInState.starred = true;
        orders = [orderId];
      }

      if (!starredOrderId) {
        orderInState.starred = true;
        orders = [...starred.orders, orderId];
      }

      if (starredOrderId && starredOrderId === orderInState._id) {
        orderInState.starred = !orderInState.starred;
        orders = starred?.orders.filter((id) => id !== orderId);
      }

      starredService.editStarred({
        _id: starred._id,
        user,
        orders,
      });

      if (!filterOrders.length) {
        filterOrders[0] = 0;
      }
      this.setState({ filterOrders });
    }
  };

  findInState = (filterOrders, orderId) => {
    return filterOrders.find((order) => order._id === orderId && order);
  };

  findInStarred = (starred, orderId) => {
    return starred?.orders.find((id) => id === orderId && id);
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
    // const { pathname } = this.props.location;
    const currentUser = userService.getCurrentUser();
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
              <div className='input-group-prepend'>
                <span className='input-group-text bg-white' id='basic-addon1'>
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
              {currentUser?.admin && (
                <Link to='/create-order'>
                  <button className='btn btn-primary'>
                    <i className='fas fa-plus-circle'></i> Create new order
                  </button>
                </Link>
              )}
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
                {filterOrders[0] === 0 ? (
                  <tr>
                    <td
                      className='h5 font-weight-normal text-secondary text-center'
                      colSpan='5'>
                      No orders match your search...
                    </td>
                  </tr>
                ) : (
                  filterOrders.map((order) => (
                    <tr
                      key={order._id}
                      className={order.important ? "table-danger" : null}>
                      <td className='p-0'>
                        <div className='btn-group'>
                          <button
                            type='button'
                            className={`btn btn-light mr-3 ml-0 rounded h-100 py-3 my-0 dropdown-toggle-split ${
                              order.important && "bg-red"
                            }`}
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'>
                            <i
                              className={`fas fa-ellipsis-v ${
                                order.starred && "text-warning"
                              }`}></i>
                          </button>
                          <div className='dropdown-menu p-0 bg-light'>
                            <Link
                              className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                              to={`/orders/${order._id}`}>
                              <i className='fas fa-clipboard text-secondary mr-2'></i>
                              View Order
                            </Link>
                            {currentUser.admin && order.important && (
                              <button
                                className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                                onClick={(e) =>
                                  this.handleChange(e, order._id)
                                }>
                                <i className='fas fa-exclamation-circle text-danger mr-2'></i>
                                Mark As Unimportant
                              </button>
                            )}
                            {currentUser.admin && !order.important && (
                              <button
                                className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                                onClick={(e) =>
                                  this.handleChange(e, order._id)
                                }>
                                <i className='fas fa-exclamation-circle text-secondary mr-2'></i>
                                Mark As Important
                              </button>
                            )}
                            {order.starred ? (
                              <button
                                className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                                onClick={(e) =>
                                  this.handleChange(e, order._id)
                                }>
                                <i className='fas fa-star text-warning mr-2'></i>
                                Unstar
                              </button>
                            ) : (
                              <button
                                className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                                onClick={(e) =>
                                  this.handleChange(e, order._id)
                                }>
                                <i className='far fa-star text-warning mr-2'></i>
                                Star
                              </button>
                            )}

                            {currentUser?.admin && (
                              <React.Fragment>
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
                              </React.Fragment>
                            )}
                          </div>
                        </div>
                        <span>{order._id}</span>
                      </td>
                      <td>{order.custName}</td>
                      <td className='text-center'>
                        {order.orderItems?.length}
                      </td>
                      <td>{`$${order.totalPrice}`}</td>
                      <td>{order.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
