import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import PurchasedOrder from "../components/UI/PurchasedOrder";
import { calculateTotalSpent, getUserOrder } from "../redux/slices/purchasedSlice";
import "../styles/purchased.css";


export default function Purchased() {
  const dispatch = useDispatch();
  const { orderList, totalSpent, isLoading } = useSelector((state) => state.purchased);
  
  // console.log(orderList);
  useEffect(() => {
    dispatch(calculateTotalSpent());
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
      <CommonSection title="Purchased History" />
      <section>
        <Container>
          <Row>
            <ul id="order-list">
              {orderList.map((order, index) => (
                <PurchasedOrder key={index} order={order} />
              ))}
            </ul>
          </Row>
          <Row>
            <h3 id="total-spent" className="text-center">
              Your total spent: $ {totalSpent}
            </h3>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
