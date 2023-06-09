import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

function BlockUserModal(props) {
  const { data, setModal } = props;
  const user = useSelector((state) => state.auth?.currentUser);
  const dispatch = useDispatch();

  const handleBlockUser = async () => {
    // const dataDelete = {
    //   id: data?.id,
    //   token: user?.accessToken,
    // };
    // try {
    //   const res = await dispatch(deleteProduct(dataDelete)).unwrap();
    //   if (res) {
    //     setModal(false);
    //     toast.success("Xóa sản phẩm thành công!");
    //   }
    // } catch (error) {
    //   setModal(false);
    //   toast.error("Có lỗi khi xảy ra!");
    // }
    setModal(false);
    toast.success("Chặn người dùng thành công!");
  };

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} scrollable={true}>
        <ModalHeader toggle={props.toggle}>
          Xác nhận chặn người dùng
        </ModalHeader>
        <ModalBody>
          {`Bạn có muốn chặn người dùng: `}
          <b>{props?.text}</b>
          {" này không?"}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleBlockUser()}>
            Chặn
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BlockUserModal;
