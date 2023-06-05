import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { addOrder } from "../redux/slices/purchasedSlice";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Checkout = () => {
  const { cartItems, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );
  const [vnpay, setVnpay] = useState("");
  const [testID, setTestID] = useState(4);
  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();
  const paymentOnline = async (money) => {
    const res = await axios.get(
      `http://localhost:8080/api/payment_online/create_payment/${money}`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    setModal(!modal);
    setVnpay(res.data.data);
  };
  const toggle = () => setModal(!modal);

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
    setModal(false);
    // Send order data to server (x)
    if (cartItems.length === 0) return;
    else {
      toast.success("Đặt hàng thành công");
      dispatch(clearCart());
      dispatch(addOrder(createOrder(cartItems)));
      setTestID(testID + 1);
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="fw-bold mb-4">Thông tin hóa đơn</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Nhập tên của bạn" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="Nhập email của bạn" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="phone"
                    placeholder="Nhập số điện thoại nhận hàng"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Nhập địa chỉ giao hàng" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Thành phố" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Mã bưu điện" />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Quốc gia" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Số lượng: <span>{totalQuantity} sản phẩm</span>
                </h6>
                <h6>
                  Đơn giá:{" "}
                  <span>
                    {totalAmount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </h6>
                <h6>
                  <span>
                    Phí: <br />
                    Miễn phí giao hàng
                  </span>
                  <span>0 đ</span>
                </h6>

                <h4>
                  Thành tiền:{" "}
                  <span>
                    {totalAmount.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </h4>
                <button className="buy__btn auth__btn w-100" onClick={checkOut}>
                  Thanh toán khi nhận hàng
                </button>
                <button
                  className="buy__btn auth__btn w-100"
                  onClick={() => paymentOnline(Number(totalAmount))}
                >
                  Thanh toán VNPay
                </button>
                {modal && (
                  <ModalPopup
                    vnpay={vnpay}
                    toggle={toggle}
                    modal={modal}
                    checkOut={checkOut}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const ModalPopup = (props) => {
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} scrollable={true}>
        <ModalHeader toggle={props.toggle}>
          Xác nhận thanh toán VNPay
        </ModalHeader>
        <ModalBody>{`Bạn sẽ được dẫn đến trang thanh toán VNPay vui lòng xác nhận`}</ModalBody>
        <ModalFooter>
          <Button color="primary">
            <a
              href={props.vnpay}
              target="_self"
              onClick={props.checkOut}
              style={{ color: "#fff" }}
            >
              Xác nhận
            </a>
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Checkout;
