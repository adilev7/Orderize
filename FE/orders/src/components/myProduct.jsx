import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import productService from "../services/productService";
import userService from "../services/userService";

class MyProduct extends Component {
  state = {
    data: {
      description: "",
      price: undefined,
      inStorage: undefined,
    },
  };
  counter = 1;

  componentDidMount = async () => {
    const data = await productService
      .getProduct(this.props.match.params.id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.props.history.replace("/notFound");
        console.error(error.response);
      });

    if (data) {
      this.setState({ data: data[0] });
    }
  };

  dltProduct = async () => {
    let data = { ...this.state.data };
    if (window.confirm("ARE YOU SURE?")) {
      await productService.deleteProduct(data._id);
      await this.props.history.replace("/products");
      toast(`${this.state.data.description} has been successfuly deleted`);
    }
  };

  render() {
    const currentUser = userService.getCurrentUser();
    const { data } = this.state;
    const lastPage = this.props.location.state.from;
    return (
      <div className='container mt-5'>
        <div className='row mt-5'>
          <div className='card link-warning shadow col-12 col-md-6 mx-auto my-5'>
            <h5 className='card-header text-center'>{`${data._id}`}</h5>
            <div className='card-body col-12'>
              <ul className='list-group list-group-flush mx-auto'>
                <li className='list-group-item text-info h5'>
                  Description:{" "}
                  <span className='h5 text-dark ml-3'>{data.description}</span>
                </li>
                <li className='list-group-item col-12 text-info h4'>
                  Price:
                  <span className='h5 text-dark ml-3'>{`$${data.price}`}</span>
                </li>
                <li className='list-group-item col-12 text-info h4'>
                  In Storage:
                  <span className='h5 text-dark ml-3'>{`${data.inStorage} Units`}</span>
                </li>
                {}
              </ul>
            </div>
            <div className='container'>
              {currentUser.admin && (
                <div className='row'>
                  <Link
                    to={`/edit-product/${data._id}`}
                    className='col-6 text-primary text-left'>
                    <i className='fas fa-edit mr-1'></i> Edit
                  </Link>
                  <div
                    className='col-6 delete text-danger text-right'
                    onClick={this.dltProduct}>
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
          <div className="col-12 col-md-6 mx-auto p-0">
            <Link
              to={lastPage}
              className='col-4 btn btn-warning text-white mt-4'>
              <i className='fas fa-arrow-left mr-1'></i> Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProduct;
