import React, { useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import avt from "../assets/images/user-icon.png";
import logo from "../assets/images/eco-logo.png";
import "./AdminNav.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const admin_nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
    icon: "ri-dashboard-fill",
  },
  {
    display: "Sản phẩm",
    path: "/dashboard/add-product",
    icon: "ri-product-hunt-fill",
  },
  {
    display: "Đơn hàng",
    path: "/dashboard/orders",
    icon: "ri-wallet-2-fill",
  },
  {
    display: "Người dùng",
    path: "/dashboard/users",
    icon: "ri-user-2-fill",
  },
  {
    display: "Quay về trang chủ",
    path: "/",
  },
];

const AdminNav = () => {
  const user = useSelector((state) => state.auth?.currentUser);
  const profileRef = useRef(null);
  const handleLogout = () => {};
  const handleProfile = () => {};
  const toggleProfile = () => {
    profileRef.current.classList.toggle("show__profile");
  };
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              {/* <div className="logo">
                <h2>Shop Sneaker</h2>
              </div> */}
              <div className="search__box">
                <input type="text" placeholder="Tìm kiếm..." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                {/* <img src={avt} alt="avatar" /> */}
                <div className="profile">
                  <div>
                    <motion.img
                      whileTap={{ scale: 1.2 }}
                      src={avt}
                      alt="avt-user"
                      onClick={toggleProfile}
                    />
                    <span className="mx-3 text-white" onClick={toggleProfile}>
                      {user?.username}
                    </span>
                  </div>
                  <div
                    className="profile__actions"
                    ref={profileRef}
                    onClick={toggleProfile}
                  >
                    <div className="login__success">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        onClick={handleProfile}
                      >
                        Tài khoản của tôi
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        onClick={handleProfile}
                      >
                        Cài đặt
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {/* leftside */}
      {/* <div className="leftside-menu">
        <div href="#" className="dashboard__logo">
          <img src={logo} alt="logo brand" />
          <a href="/">Shop Sneaker</a>
        </div>
      </div> */}
      {/* vertical */}
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <div href="#" className="dashboard__logo">
                <img src={logo} alt="logo brand" />
                <a href="/">Shop Sneaker</a>
              </div>
              <ul className="admin__menu-list">
                {admin_nav?.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      <i class={item.icon}></i>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
