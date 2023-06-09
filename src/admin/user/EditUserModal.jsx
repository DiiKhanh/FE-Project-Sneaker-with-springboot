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
import axios from "axios";
import { editUser } from "../../redux/slices/UserSlice";

const EditUserModal = (props) => {
  const { modal, toggle, setModal, data, id } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.currentUser);

  const [dataEditUser, setDataEditUser] = useState({
    email: "",
    address: "",
    phone: null,
  });
  useEffect(() => {
    setDataEditUser(data);
  }, [data]);
  const handleEditData = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/user/${id}`,
        dataEditUser,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      if (res?.status === 200) {
        dispatch(editUser(res.data));
        setModal(false);
        toast.success("Chỉnh sửa người dùng thành công!");
      }
    } catch (error) {
      setModal(false);
      toast.error("Có lỗi khi xảy ra!");
    }
  };

  const handleData = (e) => {
    setDataEditUser((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>
          Chỉnh sửa thông tin người dùng:
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label sm={2}>Email:</Label>
              <Col sm={10}>
                <Input
                  placeholder="Email"
                  type="email"
                  required
                  name="email"
                  value={dataEditUser.email}
                  onChange={handleData}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Địa chỉ:</Label>
              <Col sm={10}>
                <Input
                  placeholder="Địa chỉ"
                  type="text"
                  required
                  name="address"
                  value={dataEditUser.address}
                  onChange={handleData}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Số điện thoại:</Label>
              <Col sm={10}>
                <Input
                  type="number"
                  required
                  value={dataEditUser.phone}
                  onChange={handleData}
                  name="phone"
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleEditData()}>
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

export default EditUserModal;
