import React, { useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactPaginate from "react-paginate";
const Shop = () => {
  const [productsData, setProductsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageProduct = async (page) => {
    const res = await axios.get(
      `http://localhost:8080/api/product/shop-products?page=${page}`
    );
    setProductsData(res.data.data);
    setTotalPages(res.data.total_pages);
  };

  useEffect(() => {
    pageProduct(0);
  }, []);
  const handlePageChange = (e) => {
    pageProduct(e.selected);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    const searchedValue = products.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setProductsData(searchedValue);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select>
                  <option value="none">Lọc theo: </option>
                  <option value="prcie">Giá</option>
                  <option value="style">Phong cách</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select>
                  <option value="none">Sắp xếp:</option>
                  <option value="ascending">Tăng dần</option>
                  <option value="descending">Giảm dần</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Tìm kiếm tên sản phẩm ..."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {productsData?.length === 0 ? (
              <h1 className="text-center fs-4">
                Không tìm thấy sản phẩm! Có lỗi đã xảy ra vui lòng tải lại trang
              </h1>
            ) : (
              <>
                <ProductsList data={productsData} />
                <div className="paginate-shop">
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
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    activeClassName="active"
                  />
                </div>
              </>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
