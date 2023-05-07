import React from "react";
import { Container, Row, Form, FormGroup } from "reactstrap";
import { motion } from "framer-motion";
import { BsPen } from "react-icons/bs";
import Helmet from "../Helmet/Helmet";
import "./ProfileUser.css";
import { useSelector } from "react-redux";
const ProfileUser = () => {
  const user = useSelector((state) => state.auth?.currentUser);
  return (
    <Helmet title="Profile">
      <Container>
        <Row>
          <div>
            <div className="profile-text">
              <h6>Hồ Sơ Của Tôi</h6>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <Form className="profile__form">
              <FormGroup className="form__group profile__group">
                <span>Tên </span>
                <p>{user?.username}</p>
              </FormGroup>
              <FormGroup className="form__group profile__group">
                <span>Email </span>
                <p>{user?.email}</p>
                <span className="profile-change">Thay đổi</span>
              </FormGroup>
              <FormGroup className="form__group profile__group">
                <span>Địa chỉ</span>
                <p>{user?.address}</p>
                <span className="profile-change">Thay đổi</span>
              </FormGroup>
              <FormGroup className="form__group profile__group">
                <span>Số điện thoại </span>
                <p>{user?.phone}</p>
                <span className="profile-change">Thay đổi</span>
              </FormGroup>
              <FormGroup className="form__group profile__group">
                <span>Giới tính</span>
                <p>{user?.gender}</p>
              </FormGroup>
              <FormGroup className="form__group profile__group">
                <span>Ngày sinh</span>
                <p>{user?.birth}</p>
              </FormGroup>
            </Form>
            <motion.div whileTap={{ scale: 1.1 }} className="profile__edit">
              <div className="profile__edit-text">Sửa hồ sơ</div>
              <div className="profile__edit-icon">
                <BsPen></BsPen>
              </div>
            </motion.div>
          </div>
        </Row>
      </Container>
    </Helmet>
  );
};

export default ProfileUser;
