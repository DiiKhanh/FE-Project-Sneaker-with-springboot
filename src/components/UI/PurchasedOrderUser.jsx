import React, { useRef, useState } from "react";
import OrderItem from "./OrderItem";

export default function PurchasedOrderUser({ order }) {
  const seeMoreBtn = useRef(null);
  const itemsContainer = useRef(null);
  const [choice, setChoice] = useState("more");

  const toggleSeeMore = () => {
    if (choice === "more") {
      setChoice("less");
    } else setChoice("more");
    itemsContainer.current.classList.toggle("active");
  };

  return (
    <li className="order-container w-75 d-flex flex-column">
      <div className="d-flex justify-content-between">
        <h5>Hóa đơn ID: {order.order_id}</h5>
        <h5>Thời gian: 30/4/2023</h5>
      </div>
      <hr></hr>
      <div className="items-container col text-center" ref={itemsContainer}>
        {order.orderItems.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </div>
      {order.orderItems.length === 1 ? (
        <span></span>
      ) : (
        <span
          className="see-more fs-5"
          ref={seeMoreBtn}
          onClick={toggleSeeMore}
        >
          See {choice}
        </span>
      )}
      <hr></hr>
      <h5>Đơn giá: $ {order.totalAmount}</h5>
    </li>
  );
}
