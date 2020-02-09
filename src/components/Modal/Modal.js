import React, { useState } from "react";
import "./Modal.css";
import Spinner from "react-bootstrap/Spinner";

const Modal = ({ img, showModal, hideModal }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleOnLoad = () => {
    setIsImageLoading(false);
  };
  return (
    <div
      onClick={hideModal}
      className="modal"
      style={{ display: showModal ? "block" : "none" }}
    >
      <span className="close">&times;</span>
      <Spinner
        style={{
          display: isImageLoading ? "block" : "none"
        }}
        className="spinner"
        animation="border"
        variant="warning"
      />
      <img onLoad={handleOnLoad} className="modal-content" src={img} alt="" />
    </div>
  );
};

export default Modal;
