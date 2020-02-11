import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";

const Modal = ({ img, showModal, hideModal, changeImageInModal }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const handleOnLoad = () => {
    setIsImageLoading(false);
  };
  const handleOnClick = (arg, img) => {
    changeImageInModal(arg, img);
  };
  const chevronLeft = (
    <FontAwesomeIcon
      onClick={() => handleOnClick("prev", img)}
      className="left"
      size="2x"
      color="yellow"
      icon={faChevronLeft}
    />
  );
  const chevronRight = (
    <FontAwesomeIcon
      onClick={() => handleOnClick("next", img)}
      className="right"
      size="2x"
      color="yellow"
      icon={faChevronRight}
    />
  );

  return (
    <div className="modal" style={{ display: showModal ? "flex" : "none" }}>
      <span onClick={hideModal} className="close">
        &times;
      </span>
      <Spinner
        style={{
          display: isImageLoading ? "flex" : "none"
        }}
        className="spinner"
        animation="border"
        variant="warning"
      />
      {chevronLeft}
      <img
        onLoad={handleOnLoad}
        className="modal-content"
        src={`https://image.tmdb.org/t/p/original/${img}`}
        alt=""
      />
      {chevronRight}
    </div>
  );
};

export default Modal;
