import React, { useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../redux/slices/ProductSlice";
const Shop = () => {
  const [productsData, setProductsData] = useState(products);
  // -- api
  // const { products } = useSelector((state) => state.product);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const res = await dispatch(fetchAllProduct()).unwrap();
  //       console.log(res);
  //       console.log(products);

  //       setProductsData(productsData);
  //     } catch (error) {
  //       toast.error("something wrong");
  //     }
  //   };
  //   fetch();
  // }, []);

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
                  <option value="none">Filter By Category</option>
                  <option value="prcie">Price</option>
                  <option value="style">Style</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search ..."
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
              <h1 className="text-center fs-4">No Products are found!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
