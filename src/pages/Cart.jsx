import React, { useEffect, useRef, useState } from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col, Progress } from "reactstrap";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  cartActions,
  calculateTotal,
  clearCart,
  increase,
  decrease,
  deleteItem,
} from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addOrder } from "../redux/slices/purchasedSlice";

const Cart = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const [isEmpty, setIsEmpty] = useState(true);
  const [testID, setTestID] = useState(4);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkOutBtn = useRef(null);

  useEffect(() => {
    cartItems.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
    dispatch(calculateTotal());

    // Saving cart info onto local storage as user adds items
    // console.log(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalAmount", totalAmount);
    localStorage.setItem("totalQuantity", totalQuantity);
  }, [cartItems]);

  const randomId = () => {
    return (
      Date.now().toString(36) +
      Math.floor(
        Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
      ).toString(36)
    );
  };

  const createOrder = (cartItems) => {
    const total = cartItems.reduce(
      (accumulateValue, item) => accumulateValue + item.price * item.quantity,
      0
    );
    return {
      order_id: randomId(),
      orderItems: cartItems,
      totalAmount: total,
    };
  };

  const checkOut = () => {
    // Send order data to server (x)
    if (cartItems.length === 0) return;
    else {
      toast.success("Chuyển tới trang thanh toán");
      // dispatch(clearCart());
      // dispatch(addOrder(createOrder(cartItems)));
      // setTestID(testID + 1);
      // checkOutLink.current.click();
      setTimeout(() => navigate("/checkout"), 2000);
    }
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        {cartItems.length === 0 ? (
          <></>
        ) : (
          <Container>
            <Progress
              className="my-2"
              value="50"
              animated
              style={{ height: "20px" }}
            >
              <h6>Xác nhận thanh toán</h6>
            </Progress>
          </Container>
        )}
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">
                  Chưa có sản phẩm nào được thêm vào giỏ hàng
                </h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, idx) => (
                      <Tr key={idx} item={item} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Tổng thanh toán
                  <span className="fs-4 fw-bold">
                    {totalAmount
                      ? totalAmount.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                      : 0}
                  </span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                Thuế và vận chuyển sẽ được bao gồm trong thanh toán.
              </p>
              <div>
                <button className="buy__btn w-100">
                  <Link to="/shop">Tiếp tục mua sản phẩm</Link>
                </button>
                <button
                  className={`buy__btn w-100 mt-3 ${isEmpty ? "disabled" : ""}`}
                  onClick={(event) => {
                    checkOut();
                  }}
                  ref={checkOutBtn}
                >
                  {/* Push order to purchased on click */}
                  {isEmpty ? (
                    <span>Thanh toán</span>
                  ) : (
                    <Link to="/checkout">Thanh toán</Link>
                  )}
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(deleteItem(item.id));
  };
  const increaseAmount = () => {
    dispatch(increase(item.id));
  };
  const decreaseAmount = () => {
    dispatch(decrease(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.image} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>
        {item.price?.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </td>
      <td>
        <i className="ri-arrow-up-s-line" onClick={increaseAmount}></i>
        {item.quantity}
        <i className="ri-arrow-down-s-line" onClick={decreaseAmount}></i>
      </td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
