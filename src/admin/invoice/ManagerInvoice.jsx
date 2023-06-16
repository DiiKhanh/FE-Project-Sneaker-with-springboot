import React, { useState } from "react";
import {
  Container,
  Row,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../user/UserDashboard.css";
import "./ManagerInvoice.css";
import ReactPaginate from "react-paginate";
import { DatePicker } from "reactstrap-date-picker";
import { FaFileInvoiceDollar } from "react-icons/fa";

const ManagerInvoice = () => {
  const data = [
    {
      idOrder: "#123 Duy Khanh",
      time: "Th4 23, 2023",
      status: "Đang xử lý",
      total: 2000000,
    },
    {
      idOrder: "#231 Nguyen Duong",
      time: "Th5 13, 2023",
      status: "Đang xử lý",
      total: 5000000,
    },
    {
      idOrder: "#643 Ngo Nhi",
      time: "Th6 03, 2023",
      status: "Đang xử lý",
      total: 3600000,
    },
    {
      idOrder: "#165 Ha My",
      time: "Th5 23, 2023",
      status: "Đã hoàn thành",
      total: 7800000,
    },
  ];

  return (
    <section className="manager-section">
      <Container>
        <div className="mt-3 manager">
          <div className="manager-user">
            <div>
              <FaFileInvoiceDollar fontSize={24} />
            </div>
            <h4>Quản lý hóa đơn</h4>
          </div>
          <div className="search-user">
            <div className="search-box">
              <input type="text" placeholder="Tìm kiếm hoá đơn" />
              <i className="ri-search-line"></i>
            </div>
          </div>
        </div>
        <Row>
          <div className="mt-5">
            <>
              <Table hover bordered>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Đơn hàng</th>
                    <th>Ngày</th>
                    <th>Trạng thái</th>
                    <th>Tổng cộng</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, idx) => (
                    <Tr data={item} key={idx} idx={idx} />
                  ))}
                </tbody>
              </Table>
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={3}
                pageRangeDisplayed={5}
                containerClassName="pagination"
                activeClassName="active"
              />
            </>
          </div>
        </Row>
      </Container>
    </section>
  );
};

const Tr = ({ data, idx }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <tr>
        <td>{idx + 1}</td>
        <td>{data?.idOrder}</td>
        <td>{data?.time}</td>
        <td>
          <div>
            <div>
              <Button
                color={`${data?.status === "Đang xử lý" ? "info" : "success"}`}
                onClick={toggle}
              >
                {data?.status}
              </Button>
            </div>
          </div>
        </td>
        <td>
          {data?.total?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </td>
      </tr>
      <ModalInvoice modal={modal} toggle={toggle} />
    </>
  );
};

const ModalInvoice = ({ modal, toggle }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Sửa đơn hàng</ModalHeader>
        <ModalBody>
          <div className="invoice-container">
            <div className="invoice-header">
              <h5>Đặt hàng #123 chi tiết</h5>
              <p>
                Thanh toán qua Trả tiền mặt khi nhận hàng. IP khách hàng:
                113.185.14.148
              </p>
            </div>
            <div className="grid-container">
              <Row lg={12}>
                <Col>
                  <div className="date-grid">
                    <h6>Chung</h6>
                    <Form>
                      <FormGroup>
                        <Label>Ngày tạo</Label>
                        <DatePicker
                          placeholder="MM/DD/YYYY"
                          value={"04/23/2023"}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Trạng thái</Label>
                        <Input name="select" type="select">
                          <option>Đang xử lý</option>
                          <option>Tạm giữ</option>
                          <option>Đã hoàn thành</option>
                          <option>Đã hủy</option>
                          <option>Đã hoàn lại tiền</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label>Khách hàng</Label>
                        <Input
                          type="text"
                          disabled
                          placeholder="duykhanh (#4 - duykhanh@gmail.com)"
                        />
                      </FormGroup>
                    </Form>
                  </div>
                </Col>
                <Col>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <h6>Thanh toán</h6>
                    <div>
                      <p>Duy Khánh</p>
                      <p>KTX Khu A</p>
                      <p>Hồ Chí Minh</p>
                    </div>
                    <div>
                      <p>Địa chỉ email:</p>
                      <a
                        href="#"
                        style={{ textDecoration: "underline", color: "blue" }}
                      >
                        duykhanh@gmail.com
                      </a>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <a
                        href="#"
                        style={{ textDecoration: "underline", color: "blue" }}
                      >
                        0886025625
                      </a>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <h6>Giao nhận</h6>
                    <div>
                      <p>Địa chỉ</p>
                      <p>Linh Trung, Thủ Đức, Hồ Chí Minh</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Chi phí</th>
                  <th>SL</th>
                  <th>Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <img
                      src="https://sneakerdaily.vn/wp-content/uploads/2022/12/bo-suu-tap-mlb-liner.jpg.webp"
                      alt="img-product"
                      style={{
                        objectFit: "cover",
                        height: "100px",
                        width: "100px",
                      }}
                    />
                    <span style={{ marginLeft: "20px" }}>
                      Giày MLB Liner Basic New York Yankees
                    </span>
                  </th>
                  <td>
                    {Number(2000000).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>x1</td>
                  <td>
                    {Number(2000000).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Form>
              <FormGroup>
                <Label>Thêm ghi chú</Label>
                <Input id="exampleText" name="text" type="textarea" />
              </FormGroup>
            </Form>
            <div>
              <h6 style={{ textAlign: "end", marginRight: "50px" }}>
                Tổng cộng:
                <span style={{ marginLeft: "20px" }}>
                  {Number(2000000).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </h6>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Cập nhật
          </Button>
          <Button color="secondary" onClick={toggle}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ManagerInvoice;
