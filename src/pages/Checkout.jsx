import React from "react";
import { Container, Row, Col, Form, FormGroup, Progress } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
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

  const idOrder = randomId();

  const createOrder = (cartItems) => {
    const total = cartItems.reduce(
      (accumulateValue, item) => accumulateValue + item.price * item.quantity,
      0
    );
    return {
      order_id: idOrder,
      orderItems: cartItems,
      totalAmount: total,
      isPaid: false,
    };
  };

  const [formEmail, setFormEmail] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChangeFormEmail = (e) => {
    setFormEmail((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const checkOut = async () => {
    setModal(false);
    const data = {
      to: formEmail.email,
      subject: `XÁC NHẬN ĐƠN ĐẶT HÀNG #${idOrder}`,
      message: `Cảm ơn quý khách hàng đã đặt hàng tại SneakerShop. Sneaker shop rất vui thông báo đơn hàng #${idOrder} của quý khách đang trong quá trình xử lý.Quý khách có thể tra cứu tình trạng đơn hàng THÔNG TIN ĐƠN HÀNG .Địa chỉ giao hàng: #${formEmail.address}, số điện thoại: ${formEmail.phone}, Người nhận hàng: ${formEmail.name}`,
    };
    const res = await axios.post(
      "http://localhost:8080/api/email/send-email",
      data,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    // Send order data to server (x)
    if (cartItems.length === 0) return;
    else {
      toast.success("Đặt hàng thành công");
      dispatch(clearCart());
      dispatch(addOrder(createOrder(cartItems)));
      setTestID(testID + 1);
      setFormEmail({
        email: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
      });
    }
  };

  return (
    <Helmet title="Checkout">
      <section>
        <Container>
          <Progress
            className="my-2"
            value="100"
            animated
            color="info"
            style={{ height: "20px" }}
          >
            <h6>Chờ thanh toán</h6>
          </Progress>
        </Container>
        <Container className="mt-5">
          <Row>
            <Col lg="8">
              <h6 className="fw-bold mb-4">Thông tin hóa đơn</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Nhập tên của bạn"
                    name="name"
                    value={formEmail.name}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    name="email"
                    value={formEmail.email}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="phone"
                    placeholder="Nhập số điện thoại nhận hàng"
                    name="phone"
                    value={formEmail.phone}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ giao hàng"
                    name="address"
                    value={formEmail.address}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Thành phố"
                    name="city"
                    value={formEmail.city}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Mã bưu điện"
                    name="postalCode"
                    value={formEmail.postalCode}
                    onChange={handleChangeFormEmail}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Quốc gia"
                    name="country"
                    value={formEmail.country}
                    onChange={handleChangeFormEmail}
                  />
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
                    formEmail={formEmail}
                    setFormEmail={setFormEmail}
                    setModal={setModal}
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
  const { formEmail, setFormEmail } = props;
  const dispatch = useDispatch();
  const randomId = () => {
    return (
      Date.now().toString(36) +
      Math.floor(
        Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
      ).toString(36)
    );
  };

  const idOrder = randomId();
  const user = useSelector((state) => state.auth?.currentUser);

  const createOrder = (cartItems) => {
    const total = cartItems.reduce(
      (accumulateValue, item) => accumulateValue + item.price * item.quantity,
      0
    );
    return {
      order_id: idOrder,
      orderItems: cartItems,
      totalAmount: total,
      isPaid: true,
    };
  };
  const { cartItems } = useSelector((state) => state.cart);
  const [testID, setTestID] = useState(4);
  const checkOut = async () => {
    const data = {
      to: formEmail.email,
      subject: `XÁC NHẬN ĐƠN ĐẶT HÀNG #${idOrder}`,
      message: `Cảm ơn quý khách hàng đã đặt hàng tại SneakerShop. Sneaker shop rất vui thông báo đơn hàng #${idOrder} của quý khách đang trong quá trình xử lý.Quý khách có thể tra cứu tình trạng đơn hàng. THÔNG TIN ĐƠN HÀNG .Địa chỉ giao hàng: #${formEmail.address}, số điện thoại: ${formEmail.phone}, Người nhận hàng: ${formEmail.name}`,
    };
    const res = await axios.post(
      "http://localhost:8080/api/email/send-email",
      data,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );
    // Send order data to server (x)
    if (cartItems.length === 0) return;
    else {
      dispatch(clearCart());
      dispatch(addOrder(createOrder(cartItems)));
      toast.success("Đặt hàng thành công");
      setTestID(testID + 1);
      setModal(false);
    }
  };
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
              target="_blank"
              onClick={checkOut}
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
