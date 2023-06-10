import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import PurchasedOrderUser from "../components/UI/PurchasedOrderUser";
import {
  calculateTotalSpent,
  getUserOrder,
} from "../redux/slices/purchasedSlice";
import "../styles/purchased.css";
import { clearCart } from "../redux/slices/cartSlice";

export default function PurchasedUser() {
  const dispatch = useDispatch();
  const { orderList, totalSpent } = useSelector((state) => state.purchased);

  // console.log(orderList);
  useEffect(() => {
    dispatch(calculateTotalSpent());
    dispatch(clearCart());
    localStorage.setItem("orderList", JSON.stringify(orderList));
    localStorage.setItem("totalSpent", totalSpent);
  }, [orderList]);

  // Calling order data from server (x)
  // useEffect(() => {
  //   dispatch(getUserOrder());
  // }, []);

  // if (isLoading) {
  //   return (
  //   <div class="text-center">
  //     <div class="spinner-border" role="status">
  //         <span class="sr-only">Loading...</span>
  //     </div>
  //   </div>
  // )
  // }

  return (
    <Helmet title="Purchased">
      <section>
        <Container>
          <Row>
            <div className="purchased-text">
              <h6>Lịch sử mua hàng</h6>
              <p>Quản lý thông tin các sản phẩm đã mua</p>
            </div>
            <ul id="order-list">
              {orderList.map((order, index) => (
                <PurchasedOrderUser key={index} order={order} />
              ))}
            </ul>
          </Row>
          <Row>
            <h3 id="total-spent" className="text-center">
              Số tiền đã mua:{" "}
              {totalSpent.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </h3>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
