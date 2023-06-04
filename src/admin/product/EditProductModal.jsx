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
import { editProduct } from "../../redux/slices/managerProductSlice";
import { useEffect } from "react";

const EditProductModal = (props) => {
  const { modal, toggle, setModal, data } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.currentUser);

  const [dataEditProduct, setDataEditProduct] = useState({
    productName: "",
    description: "",
    productPrice: 0,
    category: "",
    imgUrl: "",
    quantity: 0,
    designer: "",
    brandName: "",
  });

  useEffect(() => {
    setDataEditProduct(data);
  }, [data]);

  const handleEditData = async () => {
    const dataEdit = {
      id: data?.id,
      data: dataEditProduct,
      token: user?.accessToken,
    };
    try {
      const res = await dispatch(editProduct(dataEdit)).unwrap();
      if (res?.status === "ok") {
        setModal(false);
        toast.success("Chỉnh sửa sản phẩm thành công!");
      }
    } catch (error) {
      setModal(false);
      toast.error("Có lỗi khi xảy ra!");
    }
  };

  const handleData = (e) => {
    setDataEditProduct((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Chỉnh sửa sản phẩm:</ModalHeader>
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
                  value={dataEditProduct.productName}
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
                  value={dataEditProduct.imgUrl}
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
                  value={dataEditProduct.quantity}
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
                  value={dataEditProduct.productPrice}
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
                  value={dataEditProduct.description}
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
                  value={dataEditProduct.category}
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
                  value={dataEditProduct.designer}
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
                  value={dataEditProduct.brandName}
                  onChange={handleData}
                  name="brandName"
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditData}>
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

export default EditProductModal;
