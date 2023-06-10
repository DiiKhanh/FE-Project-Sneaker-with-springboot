import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import avt from "../assets/images/user-icon.png";
import logo from "../assets/images/eco-logo.png";
import "./AdminNav.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Đăng xuất thành công!");
  };
  const handleProfile = () => {
    navigate("/user-menu/profile");
  };
  const toggleProfile = () => {
    profileRef.current.classList.toggle("show__profile");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
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
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    <img
                      src={user ? avt : avt}
                      alt="avt"
                      style={{
                        objectFit: "cover",
                        height: "30px",
                        width: "30px",
                        marginRight: "10px",
                      }}
                    />
                    {user?.username}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu">
                    <DropdownItem onClick={handleProfile}>
                      Tài khoản của tôi
                    </DropdownItem>

                    <DropdownItem onClick={handleLogout}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
