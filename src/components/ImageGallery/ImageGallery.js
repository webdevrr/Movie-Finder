import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";

import api from "../../api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import "./ImageGallery.css";

const ImageGallery = () => {
  const width = window.innerWidth;
  let { type, id } = useParams();
  const [images, setImages] = useState([]);
  const [right, setRight] = useState(0);
  const [timesClicked, setTimesClicked] = useState(0);
  let gallery = useRef(null);

  const getImages = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.REACT_APP_APIKEY}&language=null`;
  useEffect(
    () => {
      api.get(getImages).then(response => {
        const backdrops = response.data.backdrops;
        setImages(backdrops);
      });
    },
    //eslint-disable-next-line
    []
  );

  const handleClick = arg => {
    const galleryWidth = gallery.scrollWidth;
    const maxClicks = Math.round(galleryWidth / width);
    console.log(maxClicks);

    if (arg === "next") {
      if (timesClicked < maxClicks) {
        setRight(right + width);
        gsap.to(gallery, 1, { x: -right - width, ease: "power2.out" });
        setTimesClicked(timesClicked + 1);
      } else {
        return null;
      }
    } else {
      if (timesClicked === 0) {
        return null;
      } else {
        setRight(right - width);
        gsap.to(gallery, 1, { x: -right + width, ease: "power2.out" });
        setTimesClicked(timesClicked - 1);
      }
    }
  };
  return (
    <>
      <div className="image-gallery-wrapper">
        <div
          onClick={() => {
            handleClick("prev");
          }}
          className="arrow prev"
        >
          <p>&lt;</p>
        </div>
        <div
          className="image-gallery"
          ref={element => {
            gallery = element;
          }}
        >
          {images.map(image => (
            <ImageGalleryItem key={image.file_path} image={image.file_path} />
          ))}
        </div>
        <div
          onClick={() => {
            handleClick("next");
          }}
          className="arrow next"
        >
          <p>&gt;</p>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
