import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import About from "./components/about";
import Orders from "./components/orders";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MyOrder from "./components/myOrder";
import NotFound from "./components/notFound";
import EditOrder from "./components/editOrder";
import CreateOrder from "./components/createOrder";
import Products from "./components/products";
import CreateProduct from "./components/createProduct";
import EditProduct from "./components/editProduct";
import MyProduct from "./components/myProduct";
import ProtectedRoute from "./components/common/protectedRoute";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import userService from "./services/userService";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className='d-flex flex-column footer'>
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className='container-fluid flex-fill mb-5 min-vh-100'>
          <Switch>
            {/* Orders */}
            <ProtectedRoute path='/' exact component={Orders} />
            <ProtectedRoute path='/orders' exact component={Orders} />
            <Route path='/orders/starred' exact component={Orders} />
            <ProtectedRoute
              path='/create-order'
              component={CreateOrder}
              admin={true}
            />
            <ProtectedRoute
              path='/edit-order/:id'
              component={EditOrder}
              admin={true}
            />
            <ProtectedRoute path='/orders/:id' component={MyOrder} />

            {/* Products */}
            <ProtectedRoute path='/products' exact component={Products} />
            <ProtectedRoute
              path='/create-product'
              component={CreateProduct}
              admin={true}
            />
            <ProtectedRoute
              path='/edit-product/:id'
              component={EditProduct}
              admin={true}
            />
            <ProtectedRoute path='/products/:id' component={MyProduct} />

            {/* USER */}
            <Route path='/signup' component={Signup} />
            <Route path='/signin' component={Signin} />
            <ProtectedRoute path='/logout' component={Logout} />
            <ProtectedRoute
              path='/create-user'
              component={Signup}
              admin={true}
            />

            <Route path='/about' component={About} />
            <Route path='*' component={NotFound} />
          </Switch>
        </main>
        <div className='my-5'></div>
        <footer className='font-small bg-dark w-100'>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
