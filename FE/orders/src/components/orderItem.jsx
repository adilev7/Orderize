import React from "react";
const OrderItem = ({ thisParent, deleteBtn: counter, price }) => {
  return (
    <React.Fragment>
      <tr key={counter}>
        <td className='td'>{counter + 1}</td>
        <td className='description'>
          {thisParent.renderSearch(
            "description",
            counter,
            "Type Product Name...",
            "The product you are searching for does not exist",
            "form-control"
          )}
        </td>
        <td className='td2'>
          {thisParent.renderInput(
            "quantity",
            "Quantity",
            counter,
            undefined,
            "number"
          )}
        </td>
        <td className='td2'>
          <span className='px-2 text-left h-25 bg-white input-group-text'>{`$${
            price || 0
          }`}</span>
        </td>
        {counter ? (
          <td className='p-0 m-0 td'>
            <button
              className='text-center btn btn-danger d-block my-auto mx-auto w-100 py-3'
              onClick={(e) => thisParent.deleteItem(e, counter)}>
              <i className='fas fa-times mx-auto text-white'></i>
            </button>
          </td>
        ) : (
          <td className='p-0 m-0 td'>
            <button
              className='text-center btn btn-warning d-block my-auto mx-auto w-100 py-3'
              onClick={(e) => thisParent.duplicateItem(e)}
              disabled={thisParent.validate()}>
              <i className='fas fa-plus mx-auto text-white'></i>
            </button>
          </td>
        )}
      </tr>
    </React.Fragment>
  );
};

export default OrderItem;
