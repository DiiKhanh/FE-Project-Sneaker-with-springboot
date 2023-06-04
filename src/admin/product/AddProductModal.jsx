import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../redux/slices/managerProductSlice";

const AddProductModal = (props) => {
  const { modal, toggle, setModal } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.currentUser);

  const [dataAddProduct, setDataNewProduct] = useState({
    productName: "",
    description: "",
    productPrice: 0,
    category: "",
    imgUrl: "",
    quantity: 0,
    designer: "",
    brandName: "",
  });

  const handleAddProduct = async () => {
    const data = {
      data: dataAddProduct,
      token: user?.accessToken,
    };
    try {
      const res = await dispatch(addNewProduct(data)).unwrap();
      if (res?.status === "ok") {
        setModal(false);
        toast.success("Thêm sản phẩm mới thành công!");
      }
    } catch (error) {
      setModal(false);
      toast.error("Có lỗi khi xảy ra!");
    } finally {
      setDataNewProduct({
        productName: "",
        description: "",
        productPrice: 0,
        category: "",
        imgUrl: "",
        quantity: 0,
        designer: "",
        brandName: "",
      });
    }
  };

  const handleData = (e) => {
    setDataNewProduct((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Thêm mới sản phẩm:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label sm={2}>Tên sản phẩm:</Label>
              <Col sm={10}>
                <Input
                  placeholder="Nhập tên sản phẩm"
                  type="text"
                  required
                  name="productName"
                  value={dataAddProduct.productName}
                  onChange={handleData}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Hình ảnh sản phẩm:</Label>
              <Col sm={10}>
                <Input
                  placeholder="Đường dẫn hình ảnh sản phẩm"
                  type="text"
                  required
                  name="imgUrl"
                  value={dataAddProduct.imgUrl}
                  onChange={handleData}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Số lượng:</Label>
              <Col sm={10}>
                <Input
                  type="number"
                  required
                  value={dataAddProduct.quantity}
                  onChange={handleData}
                  name="quantity"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Giá bán:</Label>
              <Col sm={10}>
                <Input
                  required
                  type="number"
                  value={dataAddProduct.productPrice}
                  onChange={handleData}
                  name="productPrice"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Mô tả sản phẩm:</Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  required
                  value={dataAddProduct.description}
                  onChange={handleData}
                  name="description"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Doanh mục:</Label>
              <Col sm={10}>
                <Input
                  placeholder="Nhập doanh mục sản phẩm"
                  type="text"
                  required
                  value={dataAddProduct.category}
                  onChange={handleData}
                  name="category"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Nhà thiết kế:</Label>
              <Col sm={10}>
                <Input
                  placeholder="Nhập tên nhà thiết kế sản phẩm"
                  type="text"
                  required
                  value={dataAddProduct.designer}
                  onChange={handleData}
                  name="designer"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Thương hiệu:</Label>
              <Col sm={10}>
                <Input
                  placeholder="Nhập tên thương hiệu sản phẩm"
                  type="text"
                  required
                  value={dataAddProduct.brandName}
                  onChange={handleData}
                  name="brandName"
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddProduct}>
            Lưu thay đổi
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddProductModal;
