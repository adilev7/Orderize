import React from "react";
const Input = ({ name, label, error, ...rest }) => {
  console.log("INPUT ERR:  ", error);
//   let error1 = "";

  /* if (rest.id === Number(error.indx)) {
    error1 = error.err_desc;
  } else {
    error1 = "";
  } */

  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        className='form-control'
        autoComplete='off'
      />
      {error && <span className='text-danger'>{error}</span>}
    </div>
  );
};

export default Input;
