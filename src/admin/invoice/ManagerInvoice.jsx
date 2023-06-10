import React from "react";
import { Container, Row, Table } from "reactstrap";
import "../user/UserDashboard.css";
import ReactPaginate from "react-paginate";
import { FaFileInvoiceDollar } from "react-icons/fa";

const ManagerInvoice = () => {
  const data = [
    {
      idOrder: "khbauso81231",
      status: "Chưa thanh toán",
      ship: "Chưa Giao",
    },
    {
      idOrder: "ofjioh103",
      status: "Đã thanh toán",
      ship: "Đã Giao",
    },
    {
      idOrder: "pohsaihfui82",
      status: "Đã thanh toán",
      ship: "Chưa Giao",
    },
    {
      idOrder: "i9012jooiofa",
      status: "Chưa thanh toán",
      ship: "Giao hàng thất bại",
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
              <Table hover className="table bordered">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Mã hóa đơn</th>
                    <th>Tình trạng thanh toán</th>
                    <th>Tình trạng giao hàng</th>
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
  return (
    <>
      <tr>
        <td>{idx + 1}</td>
        <td>{data?.idOrder}</td>
        <td>{data?.status}</td>
        <td>{data?.ship}</td>
      </tr>
    </>
  );
};

export default ManagerInvoice;
