import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { cartActions } from "../redux/slices/cartSlice";
import size from "../assets/data/sizeArr";
import axios from "axios";
import SizeModal from "../components/UI/SizeModal";
import SelectQuantity from "../components/UI/SelectQuantity";
import { useCallback } from "react";

const ProductDetails = () => {
  const dispatch = useDispatch();

  //
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  //
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const { id } = useParams();
  const [reviews, setReviews] = useState([
    { rating: 4.6, text: "sản phẩm đẹp", user: "Khánh" },
  ]);
  const [item, setItem] = useState({});
  const allProducts = useSelector((state) => state.managerProduct?.products);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:8080/api/product/${id}`);
      setItem(res.data.data);
    };
    fetchProduct();
  }, [id]);

  const { imgUrl, productName, productPrice, category } = item;
  const relatedProducts = allProducts?.filter(
    (data) => data.category === item?.category && data.id !== item?.id
  );
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item?.id,
        productName: item.name || item?.productName,
        price: item.retail_price_cents || item?.productPrice,
        imgUrl: item?.grid_picture_url || item?.imgUrl,
      })
    );
    toast.success("Thêm sản phầm vào giỏ hàng thành công!");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    const reviewObj = {
      user: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    setReviews([...reviews, reviewObj]);
    toast.success("Đánh giá đã được gửi");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [item]);
  const [selectIdx, setSelectIdx] = useState(-1);

  // handle quantity
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section>
        <div style={{ marginLeft: "300px" }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link style={{ color: "blue" }} to="/home">
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link style={{ color: "blue" }} to="/shop">
                Shop
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{item?.productName}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} className="product__detail-img" alt="product" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p className="pd__icons">
                    <FaFacebook />
                    <FaInstagram className="mx-2" />
                    <FiMessageCircle />
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">
                    {item.productPrice?.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <span>Thể loại: {item.category}</span>
                </div>
                <div className="mt-4">
                  <div className="pd">
                    <div className="pd__info">
                      <h5>GIAO HÀNG TOÀN QUỐC</h5>
                      <p>Thanh toán COD</p>
                    </div>
                    <div className="pd__info">
                      <h5>CÓ SẴN TẠI CỬA HÀNG</h5>
                      <p>Giao ngay trong ngày</p>
                    </div>
                    <div className="pd__info">
                      <h5>ĐỔI TRẢ DỄ DÀNG</h5>
                      <p>Khi không vừa size</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="pd__ship">
                    <p>Giao hàng toàn quốc từ HCM:</p>
                    <ul>
                      <li>+35.000đ. Nhận hàng sau 2-4 ngày.</li>
                      <li>Miễn phí cho đơn hàng trên 1.000.000đ</li>
                      <li>
                        Giao gấp trong 1h khu vực HCM, phí +10.000đ (tuỳ khu
                        vực)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="size mt-3">
                  <h6>Size</h6>
                  <div className="size-arr">
                    {size?.map((item, idx) => {
                      return (
                        <>
                          <span
                            key={idx}
                            onClick={() => {
                              if (idx !== selectIdx) {
                                setSelectIdx(idx);
                              } else {
                                setSelectIdx(-1);
                              }
                            }}
                            className={`mx-2 size-grid ${
                              selectIdx === idx ? "size-active" : ""
                            } `}
                          >
                            {item}
                          </span>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="mt-5"
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setModal(true)}
                >
                  Bảng Quy Đổi Kích Cỡ{" >"}{" "}
                </div>
                <SizeModal modal={modal} toggle={toggle} />
                {/*  */}
                <div className="mt-5 select-container">
                  <div>Số lượng</div>
                  <div className="d-flex mx-5 gap-5">
                    <SelectQuantity
                      quantity={quantity}
                      handleQuantity={handleQuantity}
                      handleChangeQuantity={handleChangeQuantity}
                    />
                    <span>{item?.quantity} sản phẩm có sẵn</span>
                  </div>
                  <div></div>
                </div>
                {/*  */}
                <div className="buy-add">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn"
                    onClick={addToCart}
                  >
                    Thêm vào giỏ hàng
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn"
                    style={{ backgroundColor: "#fb6e2e" }}
                    onClick={addToCart}
                  >
                    Mua ngay
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn"
                    style={{ backgroundColor: "#f4acb7" }}
                    onClick={addToCart}
                  >
                    Yêu thích ❤
                  </motion.button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Mô tả
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Đánh giá ({1})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{item?.description}</p>
                </div>
              ) : (
                <div className="product__review">
                  <div className="review__wrapper">
                    <ul>
                      {reviews.map((item, idx) => (
                        <li key={idx} className="rv-info">
                          <a href="#">
                            <img
                              src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                              alt="avt"
                            />
                          </a>
                          <div className="rv-content">
                            <p>{item.user}</p>
                            <span>Đánh giá {item.rating}</span>

                            <p>{item.text}</p>

                            <div className="rv-react">
                              <motion.p whileHover={{ scale: 1.1 }}>
                                Thích
                              </motion.p>
                              <motion.p whileHover={{ scale: 1.1 }}>
                                Trả lời
                              </motion.p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Để lại lời nhắn</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Nhập tên của bạn"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            rows={4}
                            type="text"
                            placeholder="Để lại lời nhắn..."
                            ref={reviewMsg}
                            required
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Xác nhận
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">Có thể bạn thích</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
