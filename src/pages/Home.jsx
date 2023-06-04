import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { Container, Col, Row } from "reactstrap";
import Services from "../services/Services";
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";
import Slideshow from "../components/UI/Slideshow";
import Brand from "../components/UI/Brand";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as api from "../api";
import { logOutAuth } from "../redux/slices/authSlice";
import { TypeAnimation } from "react-type-animation";
import { fetchAllProduct } from "../redux/slices/managerProductSlice";

const Home = () => {
  const products = useSelector((state) => state.managerProduct?.products);

  const trendingProducts = useSelector(
    (state) => state.managerProduct?.trendingProducts
  );
  const bestSalesProducts = useSelector(
    (state) => state.managerProduct?.bestSalesProducts
  );
  const popularProducts = useSelector(
    (state) => state.managerProduct?.popularProducts
  );
  const dispatch = useDispatch();

  const fetchAllProducts = () => {
    dispatch(fetchAllProduct());
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const year = new Date().getFullYear();

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <TypeAnimation
                  sequence={[`Sản phẩm nổi bật trong năm ${year}`, 1000]}
                  wrapper="p"
                  cursor={true}
                  repeat={Infinity}
                  className="hero__subtitle"
                />
                <TypeAnimation
                  sequence={["Giày tốt hơn, cho phong cách tốt nhất", 1000]}
                  wrapper="h2"
                  cursor={true}
                  speed={60}
                  repeat={Infinity}
                />
                <p>
                  Shop Sneaker là một trong những thương hiệu bán lẻ uy tín các
                  sản phầm giày chính hãng tại Việt Nam. Được thành lập vào năm
                  2023, Shop Sneaker mang sứ mệnh đưa người trẻ yêu sneaker đến
                  gần hơn với thế giới, cũng như lan tỏa đam mê giày đến với
                  cộng đồng. Bên cạnh tiêu chí vì khách hàng, chúng tôi luôn cố
                  gắng mang đến sự đa dạng về sản phẩm và thương hiệu. Cũng như
                  cải thiện chất lượng dịch vụ để mang lại sự an tâm, tin cậy
                  dành cho Quý khách hàng
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">MUA NGAY</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <Slideshow width={65} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* service */}
      <Services />
      {/* brand */}
      <Brand />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Sản phẩm nổi bật</h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Sản phẩm bán chạy</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-3">Ưu đãi có hạn</h4>
                <h3 className="text-white fs-5 mb-2">Giày chất lượng</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Cửa hàng</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter__img">
              <div className="counter-img">
                <Slideshow width={25} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Phổ biến trong danh mục</h2>
            </Col>
            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
      {/* <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Sản phẩm mới nhất</h2>
            </Col>
            <ProductsList data={cartItems} />
          </Row>
        </Container>
      </section> */}
    </Helmet>
  );
};

export default Home;
