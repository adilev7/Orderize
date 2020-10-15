import React from "react";
import Joi from "joi-browser";

import http from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";

import Form from "./common/form";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
// import starredService from "../services/starredService";

class Signup extends Form {
  state = {
    data: {
      password: "",
      email: "",
      admin: false,
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    admin: Joi.boolean().label("Admin"),
  };

  handleErrChnge = (errors, input, errorMessage) => {
    errorMessage
      ? (errors[input.name] = errorMessage)
      : delete errors[input.name];
  };

  handleErrRndr = (errors, name) => {
    return errors[name];
  };

  handleCheck = ({ currentTarget: checkbox }) => {
    const { data } = this.state;
    this.setState({ data: { ...data, admin: checkbox.checked } });
  };

  async doSubmit() {
    const currentUser = userService.getCurrentUser();
    const { history } = this.props;
    const { data } = this.state;
    try {
      await http.post(`${apiUrl}/users`, data);
      currentUser?.admin
        ? toast("User Created Successfuly")
        : toast("You are now registered");

      history.replace("/signin");
    } catch (error) {
      if (error.response && error.response.status === 409) {
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
    const currentUser = userService.getCurrentUser();
    if (currentUser && !currentUser?.admin) {
      return <Redirect to='/orders' />;
    }

    return (
      <div className='container text-center'>
        {currentUser?.admin ? (
          <h2 className='heading display-3 mt-5 mb-4'>Create New User</h2>
        ) : (
          <h2 className='heading display-4 mt-5 mb-4'>Sign up to ORDERIZE</h2>
        )}
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
              {currentUser?.admin && (
                <div className='form-check text-left mb-4'>
                  <input
                    type='checkbox'
                    id='admin'
                    name='admin'
                    className='form-check-input'
                    onChange={this.handleCheck}
                  />
                  <label className='form-check-label mb-4' htmlFor='admin'>
                    Administrator
                  </label>
                </div>
              )}
              {currentUser?.admin
                ? this.renderButton("Create User")
                : this.renderButton("Sign Up")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
