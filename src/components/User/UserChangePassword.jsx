import React, { useState } from "react";
import { motion } from "framer-motion";
import "./UserChangePassword.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const UserChangePassword = () => {
  const [changePass, setChangePass] = useState({
    currentPass: "",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setChangePass((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const user = useSelector((state) => state.auth?.currentUser);

  const submitChangePass = async () => {
    if (changePass.newPassword !== changePass.password) {
      return toast.error("Yêu cầu mật khẩu mới phải trùng khớp!");
    } else {
      const data = {
        currentPass: changePass.currentPass,
        password: changePass.password,
      };
      try {
        const res = await axios.put(
          `http://localhost:8080/api/user/changePassword/${user?.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        if (res?.status === 200) {
          toast.success("Đổi mật khẩu thành công!");
          setChangePass({ currentPass: "", password: "", newPassword: "" });
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra!");
      }
    }
  };

  return (
    <div>
      <div className="content">
        <div className="content_title">Đổi mật khẩu</div>
        <div className="content_text">
          Để đảm bảo an toàn, vui lòng không chia sẻ mật khẩu cho người dùng
          khác
        </div>

        <table className="content_form">
          <tr className="content_form_item">
            <td className="content_form_item_label">
              <label htmlFor="">Mật khẩu hiện tại</label>
            </td>
            <td className="content_form_item_input">
              <input
                type="text"
                className="content_form_item_input_date"
                value={changePass.currentPass}
                name="currentPass"
                onChange={handleChange}
              />
              <a href="#" className="content_form_item_input_forget">
                Quên mật khẩu?
              </a>
            </td>
          </tr>
          <tr className="content_form_item">
            <td className="content_form_item_label">
              <label htmlFor="">Mật khẩu mới</label>
            </td>
            <td className="content_form_item_input">
              <input
                type="text"
                className="content_form_item_input_date"
                value={changePass.newPassword}
                name="newPassword"
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr className="content_form_item">
            <td className="content_form_item_label">
              <label htmlFor="">Nhập lại mật khẩu</label>
            </td>
            <td className="content_form_item_input">
              <input
                type="text"
                className="content_form_item_input_date"
                value={changePass.password}
                name="password"
                onChange={handleChange}
              />
            </td>
          </tr>
        </table>
      </div>

      <div className="pass-btn">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
          className="buy__btn"
          onClick={submitChangePass}
        >
          Lưu mật khẩu
        </motion.button>
      </div>
    </div>
  );
};

export default UserChangePassword;
