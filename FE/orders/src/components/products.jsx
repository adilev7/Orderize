import React, { Component } from "react";
import productService from "../services/productService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Products extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    //Get products from DB and store in products array
    const { data } = await productService.getAllProducts();
    data
      ? this.setState({ products: data })
      : toast("No products available...");
  }

  dltProduct = async (productId) => {
    let products = [...this.state.products];
    if (window.confirm("ARE YOU SURE?")) {
      await productService.deleteProduct(productId);
      products = products.filter((item) => item._id !== productId);
      toast(`Product ${productId} has been successfuly deleted`);
    }
    this.setState({ products });
  };

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div>
        <div className='container text-center text-md-left'>
          <div className='row mt-5'>
            <div className='col-10 ml-md-5 mx-auto'>
              <h4 className='mb-5 mt-3 heading'>
                {products.length
                  ? `There are currently ${products.length} products listed.`
                  : "Loading Products..."}
              </h4>
              <Link to='/create-product'>
                <button className='btn btn-primary'>
                  <i className='fas fa-plus-circle'></i> Create new product
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='table-responsive my-5'>
            <table className='table col-10  mx-auto table-bordered table-warning border-2'>
              <caption className='d-none'>list of products</caption>
              <thead className='text-dark'>
                <tr>
                  <th scope='col'>SN</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>In Storage</th>
                  <th scope='col'>Date</th>
                </tr>
              </thead>
              <tbody className='text-dark bg-light'>
                {products.length > 0 &&
                  products.map((product) => (
                    <tr key={product._id}>
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
                              to={`/products/${product._id}`}>
                              <i className='fas fa-clipboard text-secondary mr-2'></i>
                              View Product
                            </Link>
                            <Link
                              className='dropdown-item bg-light text-dark pl-3 px-1 py-2'
                              to={`/edit-product/${product._id}`}>
                              <i className='fas fa-pen text-primary mr-2'></i>{" "}
                              Edit Product
                            </Link>
                            <div className='dropdown-divider p-0 m-0'></div>
                            <button
                              className='dropdown-item bg-light text-dark pl-3 p-1'
                              onClick={() => {
                                this.dltProduct(product._id);
                              }}>
                              <i className='fas fa-trash text-danger mr-2'></i>{" "}
                              Delete Product
                            </button>
                          </div>
                        </div>
                        <span>{product._id}</span>
                      </td>
                      <td>{product.description}</td>
                      <td className='text-center'>{`$${product.price}`}</td>
                      <td className='text-center'>{product.inStorage}</td>
                      <td>{product.createdAt}</td>
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

export default Products;
