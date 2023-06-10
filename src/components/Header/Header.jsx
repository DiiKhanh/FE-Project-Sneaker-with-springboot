import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import {
  Container,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "../../redux/slices/authSlice";

const nav__links = [
  {
    path: "home",
    display: "Trang chủ",
  },
  {
    path: "shop",
    display: "Cửa hàng",
  },
  {
    path: "cart",
    display: "Giỏ hàng",
  },
  {
    path: "contact",
    display: "Liên hệ",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const { totalQuantity } = useSelector((state) => state.cart);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList?.add("sticky__header");
      } else {
        headerRef.current?.classList?.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc());
  });

  const menuToggle = () => menuRef.current?.classList?.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const toggleProfile = () => {
    profileRef.current.classList.toggle("show__profile");
  };

  const handleVerify = () => {
    if (currentUser?.roles[0] === "ROLE_ADMIN") {
      navigate("/dashboard");
    } else {
      toast.error("Không có quyền truy cập!");
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Đăng xuất thành công!");
  };
  const handleProfile = () => {
    setTimeout(() => {
      navigate("/user-menu/profile");
    }, 1000);
  };
  const handlePurchased = () => {
    setTimeout(() => {
      navigate("/user-menu/purchased");
    }, 1000);
  };

  //
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            {/* logo */}
            <div className="logo">
              <img src={logo} alt="logoweb" />
              <div>
                <h1>Shop Sneaker</h1>
              </div>
            </div>
            {/* navigation */}
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* icons */}
            <div className="nav__icons">
              {/* <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span> */}
              {/* cart icon */}
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              {currentUser?.username ? (
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    <img
                      src={currentUser ? userIcon : userIcon}
                      alt="avt"
                      style={{
                        objectFit: "cover",
                        height: "30px",
                        width: "30px",
                        marginRight: "10px",
                      }}
                    />
                    {currentUser?.username}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu">
                    <DropdownItem onClick={handleProfile}>
                      Tài khoản của tôi
                    </DropdownItem>
                    <DropdownItem onClick={handlePurchased}>
                      Lịch sử mua hàng
                    </DropdownItem>
                    <DropdownItem onClick={handleVerify}>
                      Trang quản lý
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                      Đăng xuất
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle style={{ background: "#333" }}>
                    Chưa đăng nhập?
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu">
                    <DropdownItem>
                      <Link to="/login" style={{ color: "#333" }}>
                        Đăng Nhập
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/signup" style={{ color: "#333" }}>
                        Đăng ký
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
              {/* mobile */}
              <div className="mobile__menu" onClick={menuToggle}>
                <span>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
            {/* menu icon */}
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
