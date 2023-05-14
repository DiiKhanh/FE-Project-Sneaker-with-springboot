import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
// import products from "../assets/data/products";
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
import ProductsListTest from "../components/UI/ProductsListTest";
const ProductDetailsTest = () => {
  // const cartItems = useSelector((state) => state.addProduct?.cartItems);
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const { id } = useParams();
  const [reviews, setReviews] = useState([
    { rating: 4.6, text: "sản phẩm đẹp", user: "Khánh" },
  ]);
  const [item, setItem] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get("http://localhost:8080/api/product/all");
      setItem(res.data.data);
    };
    fetchProduct();
  }, []);
  // const reviews = {
  //   rating: 4.6,
  //   text: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  // };

  const product =
    // products.find((item) => item.id === Number(id)) ||
    item.find((item) => item.id === Number(id));
  // const reviews = "reviews";
  // const { grid_picture_url, name, retail_price_cents, category } = product;
  // const { imgUrl, productName, productPrice, category } = product;
  const relatedProducts = item.filter(
    (item) => item.category === item.category
  );
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        productName: product.name || product.productName,
        price: product.retail_price_cents || product.price,
        imgUrl: product.grid_picture_url || product.image,
      })
    );
    toast.success("Product added successfully");
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
    toast.success("Review submitted");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  const [selectIdx, setSelectIdx] = useState(-1);

  return (
    <Helmet title={name || product?.productName}>
      <CommonSection title={name || product?.productName} />
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={product?.imgUrl}
                className="product__detail-img"
                alt="product"
              />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{name || product?.productName}</h2>
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
                    ${product?.productPrice}
                  </span>
                  <span>Thể loại: {product?.category.toUpperCase()}</span>
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

                {/*  */}

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
                  {/* <p>{reviews.text}</p> */}
                  <p>
                    Nike Air Jordan 1 với lịch sử hơn 30 năm luôn được nhìn nhận
                    như một trong những dòng sản phẩm thành công nhất của Nike.
                    Nike Jordan 1 luôn bán hết một cách nhanh chóng ngay từ khi
                    ra mắt đến nay, luôn là sản phẩm được các tín đồ thời trang
                    chú ý hàng đầu. Air Jordan được đặt dựa theo ngôi sao bóng
                    rổ lừng danh Michael Jordan - huyền thoại của NBA. Có bao
                    giờ bạn tự hỏi rằng tại sao Jordan 1 lại có sức hút như vậy?
                    Tại sao Jordan 1 luôn sold out rất nhanh và có giá resell
                    cao ngất ngưởng? Ngày nay, Nike Jordan không chỉ có những
                    đôi giày bóng rổ, nhắc đến giày sneakers cổ cao cá tính
                    người ta vẫn sẽ nhớ ngay đến Nike Air Jordan 1.
                  </p>
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
            <ProductsListTest data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetailsTest;
