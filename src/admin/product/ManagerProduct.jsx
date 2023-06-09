import React, { useEffect, useState } from "react";
import { Container, Row, Table, Button } from "reactstrap";
import "./ManagerProduct.css";
import ExportCSV from "../../utils/ExportCSV";
import Loading from "../../components/UI/Loading";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete, MdAddCircleOutline } from "react-icons/md";
import { BiImport } from "react-icons/bi";
import { motion } from "framer-motion";
import AddProductModal from "./AddProductModal";
import { useDispatch, useSelector } from "react-redux";
import {
  dataProductsPage,
  fetchAllProduct,
} from "../../redux/slices/managerProductSlice";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import InfiniteScroll from "react-infinite-scroll-component";
const ManagerProduct = () => {
  // redux toolkit
  const isError = useSelector((state) => state.managerProduct?.isError);
  const isLoading = useSelector((state) => state.managerProduct?.isLoading);
  const dataProducts = useSelector((state) => state.managerProduct?.products);
  const error = useSelector((state) => state.managerProduct?.error);
  const dispatch = useDispatch();
  // const { productsPage, totalPages } = useSelector(
  //   (state) => state.managerProduct
  // );

  // modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // function call api
  // const pageProduct = async (page) => {
  //   const res = await axios.get(
  //     `http://localhost:8080/api/product/all-products?page=${page}`
  //   );
  //   dispatch(dataProductsPage(res.data));
  // };
  const fetchAllProducts = () => {
    dispatch(fetchAllProduct());
  };
  useEffect(() => {
    fetchAllProducts();
    // pageProduct(0);
  }, [dispatch]);

  //
  // const handlePageChange = async (e) => {
  //   await pageProduct(e.selected);
  // };

  return (
    <section className="manager-section">
      <Container>
        <div className="mt-3 manager">
          <div className="manager-user">
            <div>
              <i class="ri-product-hunt-line"></i>
            </div>
            <h4>Quản lý sản phẩm</h4>
          </div>
          <div className="search-user">
            <div className="search-box">
              <input type="text" placeholder="Tìm kiếm tên sản phẩm" />
              <i className="ri-search-line"></i>
            </div>

            <div className="btn-file-product">
              <Button className="add-btn-product" color="info">
                <BiImport />
                <h6>Import</h6>
              </Button>
              <ExportCSV csvData={dataProducts} fileName={"all-products"} />
              <Button
                color="success"
                className="add-btn-product"
                onClick={() => setModal(true)}
              >
                <MdAddCircleOutline />
                <h6>Thêm sản phẩm</h6>
              </Button>
            </div>
          </div>
        </div>
        <Row>
          <div className="mt-5">
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <>
                <h6>Something went wrong</h6>
                <h6>{error}</h6>
              </>
            ) : (
              <>
                <InfiniteScroll height={600} dataLength={dataProducts?.length}>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataProducts?.map((data, idx) => (
                        <Tr data={data} key={`key-${idx}`} idx={idx} />
                      ))}
                    </tbody>
                  </Table>
                </InfiniteScroll>
              </>
            )}
          </div>
        </Row>
        {/* modal add product */}
        <AddProductModal modal={modal} toggle={toggle} setModal={setModal} />
      </Container>
    </section>
  );
};

// tung dong
const Tr = ({ data, idx }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => setModalDelete(!modalDelete);
  return (
    <>
      <tr>
        <td>{data?.id}</td>
        <td>
          <img src={data?.imgUrl} alt="product-img" />
        </td>
        <td>{data?.productName}</td>
        <td>
          {data?.productPrice.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </td>
        <td>{data?.quantity}</td>
        <td>
          <motion.div whileTap={{ scale: 1.2 }} onClick={() => setModal(true)}>
            <Button color="warning">
              <RiEdit2Fill />
            </Button>
          </motion.div>
        </td>
        <td>
          <motion.div
            whileTap={{ scale: 1.2 }}
            onClick={() => setModalDelete(true)}
          >
            <Button color="danger">
              <MdDelete />
            </Button>
          </motion.div>
        </td>
      </tr>
      <EditProductModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        data={data}
      />
      <DeleteProductModal
        modal={modalDelete}
        setModal={setModalDelete}
        toggle={toggleDelete}
        text={`sản phẩm ${data?.productName}`}
        data={data}
      />
    </>
  );
};

export default ManagerProduct;
