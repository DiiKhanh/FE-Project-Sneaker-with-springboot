import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import "../styles/product-card.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const TestProduct = () => {
  const [item, setItem] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/product");
      setItem(res.data[0]);
    };
    fetchProduct();
  }, []);
  console.log(item);
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.imgUrl}
            alt="item"
          />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default TestProduct;
