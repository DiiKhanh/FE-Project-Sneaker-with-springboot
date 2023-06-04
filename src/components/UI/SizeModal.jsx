import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function SizeModal(props) {
  return (
    <div>
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        scrollable={true}
        size="lg"
      >
        <ModalHeader toggle={props.toggle}>Bảng Quy Đổi Kích Cỡ</ModalHeader>
        <ModalBody>
          <div>
            <img
              src="https://down-vn.img.susercontent.com/file/d465089464e061f1df81145385a42a35"
              alt="bang-quy-doi-kich-co"
              style={{ objectFit: "contain" }}
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SizeModal;
