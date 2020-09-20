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
import CreateOrder from "./components/createOrder";

function App() {
  return (
    <div className='d-flex flex-column footer'>
      <ToastContainer />
      <header>
        <Navbar />
      </header>
      <main className='container-fluid flex-fill mb-5'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/orders' component={Orders} />
          <Route path='/create-order' component={CreateOrder} />
          <Route path='/about' component={About} />
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
