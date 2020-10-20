import React from "react";
import Joi from "joi-browser";
import userService from "../services/userService";

import Form from "./common/form";
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
      window.location = "/orders";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ errors: { email: error.response.data } });
      }
    }
  }

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to='/orders' />;
    }

    return (
      <div className='container text-center'>
        <h2 className='heading display-4 mt-5 mb-4'>Sign in to ORDERIZE</h2>
        <div className='row'>
          <div className='col-lg-5 mx-auto'>
            <form onSubmit={this.handleSubmit} noValidate autoComplete='off'>
              <div className='mb-4'>
                {this.renderInput(
                  "email",
                  "Email",
                  undefined,
                  "Email",
                  "email"
                )}
              </div>
              <div className='mb-4'>
                {this.renderInput(
                  "password",
                  "Password",
                  undefined,
                  "Password",
                  "password"
                )}
              </div>

              {this.renderButton("Sign In")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
