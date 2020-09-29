import React from "react";
const OrderItem = ({ thisParent, deleteBtn: counter }) => {
  return (
    <React.Fragment>
      <tr key={counter}>
        <td className='td'>{counter + 1}</td>
        <td className='description'>
          {thisParent.renderInput("description", "Description", counter)}
        </td>
        <td className='td2'>
          {thisParent.renderInput("quantity", "Quantity", counter, "number")}
        </td>
        <td className='td2'>{`$${Number(
          (Math.random() * 151).toFixed(2)
        )}`}</td>
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
