import React from "react";
import "./Modal.css";

const Modal = ({ img, showModal, hideModal }) => {
  return (
    <div
      onClick={hideModal}
      className="modal"
      style={{ display: showModal ? "block" : "none" }}
    >
      <span className="close">&times;</span>
      <img className="modal-content" src={img} alt="" />
    </div>
  );
};

export default Modal;
