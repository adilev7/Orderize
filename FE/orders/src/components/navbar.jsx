import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className='navbar navbar-expand-md navbar-dark sticky-top py-0'>
        <Link className='navbar-brand my-0 mr-5' to='/'>
          ORDERIZE
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarsExample04'
          aria-controls='navbarsExample04'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarsExample04'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item mr-4'>
              <NavLink className='nav-link nl' to='/' exact={true}>
                Home
              </NavLink>
            </li>
            <li className='nav-item mr-4'>
              <NavLink className='nav-link nl' to='/about'>
                About
              </NavLink>
            </li>
            <li className='nav-item mr-4'>
              <NavLink className='nav-link nl' to='/orders'>
                Orders
              </NavLink>
            </li>
            <li className='nav-item mr-4'>
              <NavLink className='nav-link nl' to='/products'>
                Products
              </NavLink>
            </li>
          </ul>
          <ul className='navbar-nav ml-auto mr-4'>
            {user ? (
              <li className='nav-item dropdown'>
                <span
                  className='nav-link dropdown-toggle'
                  id='dropdown04'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  <i className='fas fa-user'></i>
                </span>
                <span
                  className='dropdown-menu dropdown-menu-right bg-dark'
                  aria-labelledby='dropdown04'>
                  <NavLink
                    className='dropdown-item text-warning bg-dark'
                    to='/logout'>
                    <i className='fas fa-sign-out-alt mr-1'></i> Log Out
                  </NavLink>
                  <NavLink
                    className='dropdown-item text-warning bg-dark'
                    to='/'>
                    <i className='fas fa-cog mr-1'></i> Settings
                  </NavLink>
                </span>
              </li>
            ) : (
              <React.Fragment>
                <li className='nav-item mr-0 ml-auto'>
                  <NavLink className='nav-link' to='/signin'>
                    <i className='fas fa-sign-in-alt mr-1'></i> Log In
                  </NavLink>
                </li>
                <li className='nav-item mr-0 ml-auto'>
                  <NavLink className='nav-link' to='/signup'>
                    <i className='fas fa-user-plus mr-1'></i> Sign Up
                  </NavLink>
                </li>
                <li className='nav-item mr-0 ml-auto'>
                  <NavLink className='nav-link' to='/signup'>
                    <i className='fas fa-user-plus mr-1'></i> Admin
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
