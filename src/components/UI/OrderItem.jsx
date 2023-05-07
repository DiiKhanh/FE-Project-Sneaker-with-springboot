import React from "react";

export default function OrderItem({ item }) {
  return (
    <div className="order-item justify-content-between w-100 align-items-center">
      <div>
        <img src={item.image} alt="" />
        <span>{item.productName}</span>
      </div>
      <div className="order-item__price">
        <span>{item.quantity} x </span>$ {item.price}
      </div>
    </div>
  );
}
