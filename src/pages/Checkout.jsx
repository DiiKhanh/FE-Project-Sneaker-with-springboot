import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const checkOut = () => {
    // Send order data to server (x)
    if (cartItems.length === 0) return;
    else {
      toast.success("Đặt hàng thành công");
      dispatch(clearCart());
      // dispatch(addOrder(createOrder(cartItems)));
      // setTestID(testID + 1);
      // checkOutLink.current.click();
      // setTimeout(() => navigate("/checkout"), 2000);
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
                  Đơn giá: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Phí: <br />
                    Miễn phí giao hàng
                  </span>
                  <span>$0</span>
                </h6>

                <h4>
                  Thành tiền: <span>${totalAmount}</span>
                </h4>
                <button className="buy__btn auth__btn w-100" onClick={checkOut}>
                  Đặt hàng
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
