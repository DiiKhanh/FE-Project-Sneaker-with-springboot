import { motion } from "framer-motion";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col } from "reactstrap";
import { cartActions } from "../../redux/slices/cartSlice";
import "../../styles/product-card.css";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  // add to cart {dang dung tinh~ chua co add vo api}
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.name || item.productName,
        price: item.retail_price_cents || item.price,
        imgUrl: item.grid_picture_url || item.image,
      })
    );
    toast.success("Đã thêm vào giỏ hàng thành công!");
  };
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.grid_picture_url || item.image}
            alt="item"
          />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.name || item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">
            ${item.retail_price_cents || item.price}
          </span>

          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
            onClick={addToCart}
          >
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
