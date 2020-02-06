import React from "react";

import "./ImageGalleryItem.css";
const ImageGalleryItem = ({ image }) => {
  return <img src={`https://image.tmdb.org/t/p/w300/${image}`} alt="" />;
};

export default ImageGalleryItem;
