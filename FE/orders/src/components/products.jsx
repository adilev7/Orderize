import React, { Component } from "react";
import productService from "../services/productService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Products extends Component {
  state = {
    products: [],
    filterProducts: [],
  };

  async componentDidMount() {
    //Get products from DB and store in products array
    const { data: products } = await productService.getAllProducts();
    products
      ? this.setState({ products, filterProducts: products.reverse() })
      : toast("No products available...");
  }

  handleChange = (e) => {
    let filterProducts = [...this.state.filterProducts];
    const { products } = this.state;
    const inputValue = e.currentTarget.value.trim().toLowerCase();
    const inputLength = inputValue.length;
    filterProducts = products.filter(
      (item) =>
        item.description.toLowerCase().slice(0, inputLength) === inputValue ||
        item._id.toLowerCase().slice(0, inputLength) === inputValue
    );
    this.setState({ filterProducts });
  };

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
    const { filterProducts, products } = this.state;
    console.log(products);
    return (
      <div>
        <div className='container'>
          <div className='row ml-md-3'>
            <div className='col-12 mt-4'>
              <h4 className='heading text-secondary'>
                {products.length
                  ? `There are currently ${products.length} products listed.`
                  : "Loading Products..."}
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
                placeholder='Search by Description or SN. '
                onChange={this.handleChange}
              />
            </div>
            <div className='col-12 col-md-3 mt-4 mt-md-0 mr-md-4 ml-md-auto text-md-right text-left'>
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
                {filterProducts.length > 0 &&
                  filterProducts.map((product) => (
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
