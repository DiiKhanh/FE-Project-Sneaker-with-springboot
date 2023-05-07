import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signUp } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { DatePicker } from "reactstrap-date-picker";
import Loading from "../components/UI/Loading";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  // const [dataForm, setDataForm] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   address: "",
  //   phone: null,
  //   gender: "",
  // });
  const [birth, setBirth] = useState(new Date().toISOString());
  const [fmtValue, setFmtValue] = useState(undefined);
  const handleChange = (value, formattedValue) => {
    setBirth(value);
    setFmtValue(formattedValue);
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // on change
  // const handleInputChange = (e) => {
  //   setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  // };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username,
      email,
      password,
      phone,
      address,
      gender,
      birth: fmtValue,
    };
    const res = await dispatch(signUp(data)).unwrap();
    if (!res?.status) {
      toast.success("Đăng ký tài khoản thành công!");
      setLoading(false);

      navigate("/login");
    } else {
      toast.error("Có lỗi khi đăng ký!");
      setLoading(false);
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              // <Col lg="12" className="text-center">
              //   <h5 className="fw-bold">Đang tải trang...</h5>
              // </Col>
              <Loading />
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-4 mb-4">Đăng ký</h3>
                <Form className="auth__form" onSubmit={handleSignup}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Nhập username"
                      // value={dataForm.username}
                      // onChange={handleInputChange}
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Nhập email"
                      // value={dataForm.email}
                      // onChange={handleInputChange}
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      // value={dataForm.password}
                      // onChange={handleInputChange}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="number"
                      placeholder="Nhập số điện thoại"
                      // value={dataForm.phone}
                      // onChange={handleInputChange}
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Nhập Địa chỉ"
                      // value={dataForm.address}
                      // onChange={handleInputChange}
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="gender-label">Giới tính</label>
                    <div className="gender">
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          // value="Nam"
                          // onChange={handleInputChange}
                          value="Nam"
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label>Nam</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          value="Nữ"
                          // onChange={handleInputChange}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label>Nữ</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          // value="Nam"
                          // onChange={handleInputChange}
                          value="Khác"
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label>Khác</label>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="datepick">
                      <label>Ngày sinh</label>

                      <DatePicker
                        placeholder="MM/DD/YYYY"
                        value={birth}
                        onChange={(v, f) => handleChange(v, f)}
                      />
                    </div>
                  </FormGroup>
                  <button type="submit" className="buy__btn auth__btn">
                    Tạo tài khoản
                  </button>
                  <p>
                    Bạn đã có tài khoản?{" "}
                    <Link to="/login">Đăng nhập ngay!</Link>
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

export default Signup;
