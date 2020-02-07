import React from "react";
import "./Modal.css";

const Modal = ({ img, showModal, toggleModal }) => {
  return (
    <div className="modal" style={{ display: showModal ? "block" : "none" }}>
      <span onClick={toggleModal} className="close">
        &times;
      </span>
      <img className="modal-content" src={img} alt="" />
    </div>
  );
};

export default Modal;
