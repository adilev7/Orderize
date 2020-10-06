import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Orders from "./components/orders";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import CreateOrder from "./components/createOrder";
import MyOrder from "./components/myOrder";
import NotFound from "./components/notFound";
import EditOrder from "./components/editOrder";
import CreateOrder from "./components/createOrder";
import Products from "./components/products";
import CreateProduct from "./components/createProduct";
import EditProduct from "./components/editProduct";
import MyProduct from "./components/myProduct";
// import Search from "./components/search";

function App() {
  return (
    <div className='d-flex flex-column footer'>
      <ToastContainer />
      <header>
        <Navbar />
      </header>
      <main className='container-fluid flex-fill mb-5 min-vh-100'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/products' exact component={Products} />
          <Route path='/create-product' component={CreateProduct} />
          <Route path='/edit-product/:id' component={EditProduct} />
          <Route path='/products/:id' component={MyProduct} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/create-order' component={CreateOrder} />
          <Route path='/edit-order/:id' component={EditOrder} />
          <Route path='/orders/:id' component={MyOrder} />
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

export default App;
