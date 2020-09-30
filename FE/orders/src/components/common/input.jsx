import React from "react";
const Input = ({ name, label, error, ...rest }) => {
  console.log("INPUT ERR:  ", error);
  return (
    <div className='form-group'>
      {name === "custName" && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        name={name}
        className={`${rest.type === "file" ? "form-control-file" : "form-control"}`}
        autoComplete='off'
      />
      {error && <span className='text-danger'>{error}</span>}
    </div>
  );
};

export default Input;
