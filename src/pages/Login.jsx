import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import Loading from "../components/UI/Loading";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const hanleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    const res = await dispatch(signIn(data)).unwrap();
    if (!res?.status) {
      toast.success("Đăng nhập thành công!");
      navigate("/home");
    } else {
      toast.error("Có lỗi khi đăng nhập! Kiểm tra lại");
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              // <Col lg="12" className="text-center">
              //   <h5 className="fw-bold">Đang tải trang....</h5>
              // </Col>
              <Loading />
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-4 mb-4">Đăng nhập</h3>
                <Form className="auth__form" onSubmit={hanleLogin}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Nhập username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <button type="submit" className="buy__btn auth__btn">
                    Đăng Nhập
                  </button>
                  <p>
                    Chưa có tài khoản? <Link to="/signup">Tạo tài khoản</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
