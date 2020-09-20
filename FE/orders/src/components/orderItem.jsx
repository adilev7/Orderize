import React from "react";
const OrderItem = ({ thisParent, deleteBtn }) => {
  return (
    <div className='row align-items-center justify-content-center my-2'>
      <div className='col-1 p-0'>
        {deleteBtn ? (
          <button
            className='text-center btn btn-danger rounded-circle d-block ml-auto'
            onClick={thisParent.deleteItem}>
            <i className='fas fa-times mx-auto text-white'></i>
          </button>
        ) : null}
      </div>
      <div className='col-10 col-lg-7'>
        <div className='orderItem shadow-sm'>
          <div className='row'>
            <span className='col-9 col-md-10 mx-auto mr-0'>
              {thisParent.renderInput("description", "Description")}
            </span>
            <span className='col-3 col-md-2 text-center ml-0 mx-auto'>
              {thisParent.renderInput("quantity", "Quantity", "number")}
            </span>
          </div>
        </div>
      </div>
      <div className='col-1 p-0'>
        <button
          className='text-center btn btn-warning rounded-circle d-block mr-auto'
          onClick={thisParent.duplicateItem}>
          <i className='fas fa-plus mx-auto text-white'></i>
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
