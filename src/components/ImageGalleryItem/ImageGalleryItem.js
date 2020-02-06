import React from "react";

import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ image }) => {
  return (
    <div className="image-gallery-item">
      <img src={`https://image.tmdb.org/t/p/original/${image}`} alt="" />
    </div>
  );
};

export default ImageGalleryItem;
