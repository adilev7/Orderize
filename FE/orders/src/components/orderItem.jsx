import React from "react";
const OrderItem = ({ thisParent, deleteBtn: counter }) => {
  return (
    <div className='row align-items-center justify-content-center my-2'>
      <div className='col-1 p-0'>
        {counter ? (
          <button
            className='text-center btn btn-danger rounded-circle d-block ml-auto'
            onClick={(e) => thisParent.deleteItem(e, counter)}>
            <i className='fas fa-times mx-auto text-white'></i>
          </button>
        ) : null}
      </div>
      <div className='col-10 col-lg-7'>
        <div className='orderItem shadow-sm'>
          <div className='row'>
            <span className='col-9 col-md-10 mx-auto mr-0'>
              {thisParent.renderInput("description", "Description", counter)}
            </span>
            <span className='col-3 col-md-2 text-center ml-0 mx-auto'>
              {thisParent.renderInput(
                "quantity",
                "Quantity",
                counter,
                "number"
              )}
            </span>
          </div>
        </div>
      </div>
      <div className='col-1 p-0'>
        <button
          className='text-center btn btn-warning rounded-circle d-block mr-auto'
          onClick={(e) => thisParent.duplicateItem(e)}>
          <i className='fas fa-plus mx-auto text-white'></i>
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
