import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className='container container-404 my-5 pr-0 pb-3'>
      <div className='row-fluid'>
        <div className='col-12'>
          <h1 className='display-2 h1-404 col-12'>We're Sorry...</h1>
          <p className='p-404 col-12 col-md-8 mx-auto my-5 text-justify'>
            We've searched EVERYWHERE but we still could'nt find what you were
            looking for
          </p>
          <div className='mt-5 col-12'>
            <Link className='btn-404 btn btn-outline-warning btn-light' to='/'>
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
