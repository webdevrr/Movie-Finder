import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ image, clickedImage }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleOnLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="image-gallery-item">
      <Spinner
        style={{
          display: isImageLoading ? "block" : "none"
        }}
        className="spinner"
        animation="border"
        variant="warning"
      />
      <img
        onClick={() => clickedImage(image)}
        className="image"
        style={{ display: isImageLoading ? "none" : "initial" }}
        onLoad={handleOnLoad}
        src={`https://image.tmdb.org/t/p/w300/${image}`}
        alt=""
      />
    </div>
  );
};

export default ImageGalleryItem;
