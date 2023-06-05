import React, { memo } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import "../UI/SelectQuantity.css";
const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="quantity-select">
      <button
        className="btn-quantity"
        onClick={() => handleChangeQuantity("minus")}
      >
        <BiMinus />
      </button>
      <input
        type="text"
        className="btn-quantity input-quantity"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <button
        className="btn-quantity"
        onClick={() => handleChangeQuantity("plus")}
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default memo(SelectQuantity);
