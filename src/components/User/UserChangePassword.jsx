import React from "react";
import { motion } from "framer-motion";
import "./UserChangePassword.css";
const UserChangePassword = () => {
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
              <input type="text" className="content_form_item_input_date" />
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
              <input type="text" className="content_form_item_input_date" />
            </td>
          </tr>

          <tr className="content_form_item">
            <td className="content_form_item_label">
              <label htmlFor="">Nhập lại mật khẩu</label>
            </td>
            <td className="content_form_item_input">
              <input type="text" className="content_form_item_input_date" />
            </td>
          </tr>
        </table>
      </div>

      <div className="pass-btn">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
          className="buy__btn"
        >
          Lưu mật khẩu
        </motion.button>
      </div>
    </div>
  );
};

export default UserChangePassword;
