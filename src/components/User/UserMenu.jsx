import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineWorkHistory } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import "./UserMenu.css";
import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "profile",
    display: "Tài khoản của tôi",
    icon: AiOutlineUser,
  },
  {
    path: "password",
    display: "Đổi mật khẩu",
    icon: RiLockPasswordLine,
  },
  {
    path: "purchased",
    display: "Lịch sử mua hàng",
    icon: MdOutlineWorkHistory,
  },
  {
    path: "notify",
    display: "Thông báo",
    icon: IoNotificationsOutline,
  },
];

const UserMenu = () => {
  const user = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Đăng xuất thành công!");
  };
  return (
    <div>
      <div className="user-information_container">
        <div className="navbar">
          <div className="navbar_user">
            <div className="navbar_user_avt">
              <BiUserCircle />
            </div>
            <div className="navbar_user_nickname">
              <div className="navbar_user_nickname_name">{user?.username}</div>
              <div className="navbar_user_nickname_fix">
                <div className="navbar_user_nickname_fix_text">Sửa hồ sơ</div>
                <div className="navbar_user_nickname_fix_icon">
                  <BsPen></BsPen>
                </div>
              </div>
            </div>
          </div>

          <div className="navbar_select">
            {nav__links.map((item, index) => (
              <li className="nav__item-user" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active" : ""
                  }
                >
                  <item.icon className="mx-3"></item.icon>
                  {item.display}
                </NavLink>
              </li>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.2 }}
              className="navbar_btn"
              onClick={handleLogout}
            >
              Đăng xuất
            </motion.button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserMenu;
