import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ModalPopup(props) {
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} scrollable={true}>
        <ModalHeader toggle={props.toggle}>Xác nhận xóa</ModalHeader>
        <ModalBody>{`Bạn có muốn xóa ${props.text} này không?`}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.delete}>
            Xóa
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPopup;
