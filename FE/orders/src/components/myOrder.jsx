import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import orderService from "../services/orderService";
import productService from "../services/productService";

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
    const { data, products } = this.state;
    console.log(this.state.data);
    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='card link-warning shadow col-12 col-md-11 mx-auto'>
            <h3 className='card-header text-secondary text-center'>{`${data._id}`}</h3>
            <div className='card-body col-12'>
              <ul className='list-group list-group-flush mx-auto text-center'>
                <li className='list-group-item text-info h4'>
                  Client:
                  <span className='h3 text-dark ml-2'>{data.custName}</span>
                </li>
                <li className='list-group-item text-info'>
                  <div className='row'>
                    {data.orderItems.map((item) => {
                      const product = products.find(
                        (product) => product.description === item.description
                      );
                      return (
                        <div
                          className='card col-12 col-md-6 col-lg-4 mt-3 bg-light text-dark'
                          key={this.counter++}>
                          <div className='card-header text-center'>
                            <Link
                              title='View Product Details'
                              to={`/products/${product?._id}`}
                              className='text-info font-weight-bold'>
                              {product?._id}
                            </Link>
                          </div>
                          <div className='card-body'>
                            {" "}
                            <ul className='list-group list-group-flush'>
                              <li className='list-group-item'>
                                <span className='text-secondary font-weight-bold'>
                                  Description:{" "}
                                </span>
                                <div className='text-center mt-1'>
                                  <Link
                                    title='View Product Details'
                                    to={`/products/${product?._id}`}
                                    className='text-info h5 font-weight-normal'>
                                    {item.description}
                                  </Link>
                                </div>
                              </li>
                              <li className='list-group-item text-secondary'>
                                <span className='font-weight-bold'>
                                  Quantity:
                                </span>{" "}
                                <span className='text-info ml-3'>
                                  {item.quantity}
                                </span>
                              </li>
                              <li className='list-group-item text-secondary'>
                                <span className='font-weight-bold'>
                                  Unit Price:{" "}
                                </span>
                                <span className='text-info ml-3'>
                                  {`$${product?.price}`}
                                </span>
                              </li>
                              <li className='list-group-item text-secondary'>
                                <span className='font-weight-bold'>
                                  Total:{" "}
                                </span>
                                <span className='text-info ml-3'>
                                  {`$${product?.price * item.quantity}`}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </li>
                <li className='list-group-item col-12 text-center text-info h4'>
                  Total Price:{" "}
                  <span className='h3 text-dark'>{`$${data.totalPrice}`}</span>
                </li>
                {}
              </ul>
            </div>
            <div className='container'>
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
              <div className='col-12 text-center bg-light text-secondary mt-2 mx-auto'>
                Created At {data.createdAt}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyOrder;
