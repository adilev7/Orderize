import React from "react";
import Joi from "joi-browser";

import http from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";

import Form from "./common/form";
import { Redirect } from "react-router-dom";

class AdminSignUp extends Form {
  state = {
    data: {
      name: "",
      password: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
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
    const data = { ...this.state.data, admin: true };

    try {
      await http.post(`${apiUrl}/users`, data);
      await userService.login(data.email, data.password);
      window.location = "/orders";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({
          errors: {
            ...this.state.errors,
            email: "Email is already registered",
          },
        });
      }
    }
  }

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to='/' />;
    }

    return (
      <div className='container'>
        <h2>"Admin registration form"</h2>
        <div className='row'>
          <div className='col-12'>
            <p>Open an administrative account</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <form onSubmit={this.handleSubmit} noValidate autoComplete='off'>
              {this.renderInput("email", "Email", undefined, "Email", "email")}
              {this.renderInput("password", "Password", undefined, "Password")}
              {this.renderInput("name", "Name", undefined, "Name")}
              {this.renderButton("Next")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSignUp;
