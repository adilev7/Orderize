import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import orderService from "../services/orderService";
import productService from "../services/productService";
import userService from "../services/userService";

class MyOrder extends Component {
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
      totalPrice: 0,
    },

    errors: {
      custName: "",
      orderItems: [],
    },
    products: [],
  };
  counter = 1;

  componentDidMount = async () => {
    const data = await orderService
      .getOrder(this.props.match.params.id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.props.history.replace("/notFound");
        console.error(error.response);
      });

    if (data) {
      this.setState({ data: data[0] });
      const { data: dbdata } = await productService.getAllProducts();
      const products = dbdata.filter((dbItem) =>
        this.state.data.orderItems.find(
          (item) => item.description === dbItem.description
        )
      );
      this.setState({ products });
    }
  };

  dltOrder = async () => {
    let data = { ...this.state.data };
    if (window.confirm("ARE YOU SURE?")) {
      await orderService.deleteOrder(data._id);
      await this.props.history.replace("/orders");
      toast(`Order number ${this.state.data._id} has been successfuly deleted`);
    }
  };

  render() {
    const currentUser = userService.getCurrentUser();
    const { data, products } = this.state;
    return (
      <div className='container-fluid mt-5'>
        <div className='row'>
          <div className='card link-warning shadow mx-auto'>
            <h3 className='card-header text-secondary text-center'>{`${data._id}`}</h3>
            <div className='card-body'>
              <ul className='list-group list-group-flush mx-auto text-center'>
                <li className='list-group-item text-info h4'>
                  Client:
                  <span className='h3 text-dark ml-2'>{data.custName}</span>
                </li>
                <li className='list-group-item'>
                  <table className='table-sm table-responsive table-bordered table-warning col-12 p-0'>
                    <thead className='text-dark'>
                      <tr>
                        <th scope='col'>No.</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Unit Price</th>
                        <th scope='col'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.orderItems.map((item) => {
                        const product = products.find(
                          (product) => product.description === item.description
                        );
                        return (
                          <tr key={this.counter++}>
                            <td>
                              <Link
                                title='View Product Details'
                                to={{
                                  pathname: `/products/${product?._id}`,
                                  state: {
                                    from: this.props.location.pathname,
                                  },
                                }}
                                className='text-info'>
                                {product?._id}
                              </Link>
                            </td>
                            <td>
                              <Link
                                title='View Product Details'
                                // to={`/products/${product?._id}`}
                                to={{
                                  pathname: `/products/${product?._id}`,
                                  state: {
                                    from: this.props.location.pathname,
                                  },
                                }}
                                className='text-info'>
                                {item.description}
                              </Link>
                            </td>
                            <td>{item.quantity}</td>
                            <td>{`$${product?.price}`}</td>
                            <td>{`$${(product?.price * item.quantity).toFixed(
                              2
                            )}`}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </li>
                <li className='list-group-item text-center text-info h4'>
                  Order Total:{" "}
                  <span className='h3 text-dark'>{`$${data.totalPrice}`}</span>
                </li>
                {}
              </ul>
            </div>
            <div className='container'>
              {currentUser.admin && (
                <div className='row'>
                  <Link
                    to={`/edit-order/${data._id}`}
                    className='col-6 text-primary text-left'>
                    <i className='fas fa-edit mr-1'></i> Edit
                  </Link>
                  <div
                    className='col-6 delete text-danger text-right'
                    onClick={this.dltOrder}>
                    <i className='fas fa-trash mr-1'></i> Delete
                  </div>
                </div>
              )}
              <div className='col-12 text-center bg-light text-secondary mt-2 mx-auto'>
                Created At {data.createdAt}
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-10 col-lg-8 mx-auto mt-5 p-0'>
            <Link
              to='/orders'
              className='w-25 ml-lg-5 btn btn-warning text-white'>
              <i className='fas fa-arrow-left mr-1'></i> Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MyOrder;
