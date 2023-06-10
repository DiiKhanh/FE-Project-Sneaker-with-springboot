import React, { useRef, useState } from "react";
import OrderItem from "./OrderItem";
import { Badge } from "reactstrap";
export default function PurchasedOrderUser({ order }) {
  const seeMoreBtn = useRef(null);
  const itemsContainer = useRef(null);
  const [choice, setChoice] = useState("Xem thêm");
  const toggleSeeMore = () => {
    if (choice === "Xem thêm") {
      setChoice("Ẩn bớt");
    } else setChoice("Xem thêm");
    itemsContainer.current.classList.toggle("active");
  };
  const d = new Date();
  return (
    <li className="order-container w-75 d-flex flex-column">
      <div className="d-flex justify-content-between">
        <h5>Hóa đơn ID: {order.order_id}</h5>
        <h5>Thời gian: {d.toLocaleDateString("en-US")}</h5>
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
          {choice}
        </span>
      )}
      <hr></hr>
      <h5>
        Đơn giá:{" "}
        {order.totalAmount?.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </h5>
      {order?.isPaid ? <h5>Đã thanh toán</h5> : <h5>Chưa thanh toán</h5>}
    </li>
  );
}
