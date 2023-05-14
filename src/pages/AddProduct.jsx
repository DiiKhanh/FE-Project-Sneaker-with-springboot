import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/add-product.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import "../styles/cart.css";
// import { addProduct } from "../redux/slices/ProductSlice";
import { addItem, deleteItem, editItem } from "../redux/slices/addProductSlice";
import axios from "axios";
import {
  fetchAllProduct,
  deleteProduct,
  updateProduct,
} from "../redux/slices/ProductSlice";
import ModalPopup from "../components/UI/ModalPopup";
import { Button } from "reactstrap";
import { getAllProductTest } from "../redux/slices/ProductSlice";
// import Loading from "../components/UI/Loading";
// import * as apis from "../api";
const AddProduct = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterDesc, setEnterDesc] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState("");
  const [enterQuantity, setEnterQuantity] = useState("");
  const [enterBrand, setEnterBrand] = useState("");
  const [enterDesigner, setEnterDesigner] = useState("");
  // const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [changeMode, setChangeMode] = useState("");
  const [editMode, setEditMode] = useState(null);

  const user = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.addProduct?.cartItems);
  const cartItems = useSelector((state) => state.product?.cartItems);
  const testItems = useSelector((state) => state.product?.testItems);
  const clickEdit = (data) => {
    setEditMode(data);
  };
  useEffect(() => {
    setEnterCategory(editMode?.category || "");
    setEnterDesc(editMode?.description || "");
    setEnterPrice(editMode?.productPrice || "");
    setEnterProductImg(editMode?.imgUrl || "");
    setEnterTitle(editMode?.productName || "");
    setEnterQuantity(editMode?.quantity || "");
    setEnterBrand(editMode?.brandName || "");
    setEnterDesigner(editMode?.designer || "");
  }, [editMode]);

  const getAll = async () => {
    const res = await axios.get("http://localhost:8080/api/product/all");
    // console.log(res.data.data);
    dispatch(getAllProductTest(res.data.data));
  };

  useEffect(() => {
    getAll();
  }, [testItems]);

  useEffect(() => {
    cartItems.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
    // Saving cart info onto local storage as user adds items
    // console.log(cartItems);
    localStorage.setItem("itemsAdded-test", JSON.stringify(cartItems));
  }, [cartItems]);
  const addProduct = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      // setLoading(false);
      const data = {
        productName: enterTitle,
        description: enterDesc,
        productPrice: enterPrice,
        category: enterCategory,
        imgUrl: enterProductImg,
        quantity: enterQuantity,
        designer: enterDesigner,
        brandName: enterBrand,
      };
      const response = await axios.post(
        "http://localhost:8080/api/product/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      // dispatch(addItem(data));
      const res = await dispatch(fetchAllProduct()).unwrap();
      toast.success("Thêm sản phẩm thành công!");
      setEnterCategory("");
      setEnterDesc("");
      setEnterPrice("");
      setEnterProductImg("");
      setEnterTitle("");
      setEnterQuantity("");
      setEnterBrand("");
      setEnterDesigner("");
      setEnterDesc("");
    } catch (error) {
      // setLoading(false);
      toast.error("Sản phẩm chưa được thêm!");
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      // setLoading(false);
      const data = {
        ...editMode,
        productName: enterTitle,
        description: enterDesc,
        productPrice: enterPrice,
        category: enterCategory,
        imgUrl: enterProductImg,
        quantity: enterQuantity,
        designer: enterDesigner,
        brandName: enterBrand,
      };
      const dataEdit = {
        id: editMode.id,
        token: user.accessToken,
        data,
      };
      const res = await dispatch(updateProduct(dataEdit)).unwrap();
      toast.success("Chỉnh sửa sản phẩm thành công!");
      setEditMode(null);
    } catch (error) {
      // setLoading(false);
      toast.error("Chỉnh sửa thất bại!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          {editMode === null ? (
            <Col lg="6">
              <h4 className="mb-5 mt-5">Thêm sản phẩm mới</h4>
              <Form className="add__product" onSubmit={addProduct}>
                <FormGroup className="form__group">
                  <span>Tên sản phẩm</span>
                  <input
                    type="text"
                    placeholder=""
                    value={enterTitle}
                    onChange={(e) => setEnterTitle(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Mô tả sản phẩm</span>
                  <input
                    type="text"
                    placeholder="Mô tả........."
                    value={enterDesc}
                    onChange={(e) => setEnterDesc(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Giá bán</span>
                  <input
                    type="number"
                    placeholder="2.000.000"
                    value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Loại danh mục</span>
                  <input
                    className="w-100 p-2"
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Hình ảnh sản phẩm</span>
                  <input
                    type="text"
                    onChange={(e) => setEnterProductImg(e.target.value)}
                    value={enterProductImg}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Số lượng sản phẩm</span>
                  <input
                    type="number"
                    onChange={(e) => setEnterQuantity(e.target.value)}
                    value={enterQuantity}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Người thiết kế</span>
                  <input
                    type="text"
                    onChange={(e) => setEnterDesigner(e.target.value)}
                    value={enterDesigner}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Thương hiệu</span>
                  <input
                    type="text"
                    onChange={(e) => setEnterBrand(e.target.value)}
                    value={enterBrand}
                    required
                  />
                </FormGroup>
                <button className="buy__btn" type="submit">
                  Thêm sản phẩm
                </button>
              </Form>
            </Col>
          ) : (
            // edit mode
            <Col lg="6">
              <h4 className="mb-5 mt-5">Chỉnh sửa sản phẩm</h4>
              <Form className="add__product" onSubmit={editProduct}>
                <FormGroup className="form__group">
                  <span>Tên sản phẩm</span>
                  <input
                    type="text"
                    placeholder=""
                    value={enterTitle}
                    onChange={(e) => setEnterTitle(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Mô tả sản phẩm</span>
                  <input
                    type="text"
                    placeholder="Mô tả........."
                    value={enterDesc}
                    onChange={(e) => setEnterDesc(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Giá bán</span>
                  <input
                    type="number"
                    placeholder="2.000.000"
                    value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Loại danh mục</span>
                  <input
                    className="w-100 p-2"
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Hình ảnh sản phẩm</span>
                  <input
                    type="text"
                    onChange={(e) => setEnterProductImg(e.target.value)}
                    value={enterProductImg}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Số lượng sản phẩm</span>
                  <input
                    type="number"
                    onChange={(e) => setEnterQuantity(e.target.value)}
                    value={enterQuantity}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Người thiết kế</span>
                  <input
                    type="text"
                    onChange={(e) => setEnterDesigner(e.target.value)}
                    value={enterDesigner}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <span>Thương hiệu</span>
                  <input
                    type="text"
                    onChange={(e) => setEnterBrand(e.target.value)}
                    value={enterBrand}
                    required
                  />
                </FormGroup>

                <button className="buy__btn" type="submit">
                  Chỉnh sửa
                </button>
              </Form>
            </Col>
          )}
          <Col lg="6">
            {testItems.length === 0 ? (
              <h2 className="fs-4 text-center mt-5">
                Chưa có sản phầm nào được thêm
              </h2>
            ) : (
              <div className="mt-5">
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>SL</th>
                      <th>Xóa</th>
                      <th>Sửa</th>
                    </tr>
                  </thead>

                  <tbody>
                    {testItems.map((item, idx) => (
                      <Tr key={idx} item={item} clickEdit={clickEdit} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Tr = ({ item, clickEdit }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const user = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const deleteProducts = async () => {
    const data = {
      id: item.id,
      token: user.accessToken,
    };
    const res = await dispatch(deleteProduct(data)).unwrap();
    toast.success("Xóa sản phẩm thành công!");
    setModal(!modal);
  };

  const editProduct = (e) => {
    e.preventDefault();
    setEdit((prev) => !prev);
    try {
      if (edit) {
        clickEdit(item);
      } else {
        clickEdit(null);
      }
    } catch (error) {
      toast.error("Không thể chỉnh sửa!");
    }
  };

  return (
    <tr className={`${!edit ? "active-edit" : ""}`}>
      <td>
        <img src={item.imgUrl} alt="product" />
      </td>
      <td>{item.productName}</td>
      <td>
        {item.productPrice.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </td>
      <td>{item.quantity}</td>
      <td>
        {/* <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProducts}
          className="ri-delete-bin-line"
        ></motion.i> */}
        <Button
          color="danger"
          onClick={toggle}
          className="ri-delete-bin-line"
        ></Button>
        {modal && (
          <ModalPopup
            delete={deleteProducts}
            toggle={toggle}
            modal={modal}
            text="sản phẩm"
          />
        )}
      </td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          className="ri-edit-2-line"
          onClick={editProduct}
        ></motion.i>
      </td>
    </tr>
  );
};

export default AddProduct;
