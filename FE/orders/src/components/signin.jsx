import React from "react";
import Joi from "joi-browser";
import userService from "../services/userService";

import Form from "./common/form";
// import PageHeader from "./common/pageHeader";
import { Redirect } from "react-router-dom";

class Signin extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  handleErrChnge = (errors, input, errorMessage) => {
    errorMessage
      ? (errors[input.name] = errorMessage)
      : delete errors[input.name];
  };

  handleErrRndr = (errors, name) => {
    return errors[name];
  };

  async doSubmit() {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ errors: { email: error.response.data } });
      }
    }
  }

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to='/' />;
    }

    return (
      <div className='container'>
        <h2>"Sign in to Real App"</h2>
        <div className='row'>
          <div className='col-12'>
            <p>Hope on sailor, we've got you covered!</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <form onSubmit={this.handleSubmit} noValidate autoComplete='off'>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign In")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
