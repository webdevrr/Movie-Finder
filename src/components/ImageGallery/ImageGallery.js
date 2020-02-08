import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight
} from "@fortawesome/free-solid-svg-icons";

import api from "../../api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";

import "./ImageGallery.css";

const ImageGallery = () => {
  const arrowLeft = (
    <FontAwesomeIcon color="yellow" icon={faArrowAltCircleLeft} />
  );

  const arrowRight = (
    <FontAwesomeIcon color="yellow" icon={faArrowAltCircleRight} />
  );

  const width = window.innerWidth;
  let { type, id } = useParams();
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [right, setRight] = useState(0);
  const [timesClicked, setTimesClicked] = useState(0);
  const [showModal, setModalShow] = useState(false);
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
    const maxClicks = Math.ceil(galleryWidth / width);

    if (arg === "next") {
      if (timesClicked < maxClicks && right + width < galleryWidth) {
        if (timesClicked + 2 === maxClicks) {
          //on last click
          setRight(right + width);
          gsap.to(gallery, 1, { x: -galleryWidth + width, ease: "power2.out" });
          setTimesClicked(timesClicked + 1);
        } else {
          setRight(right + width);
          gsap.to(gallery, 1, { x: -right - width, ease: "power2.out" });
          setTimesClicked(timesClicked + 1);
        }
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

  const openModal = () => {
    setModalShow(true);
  };
  const hideModal = () => {
    setImage(null);
    setModalShow(false);
  };
  const clickedImage = img => {
    setImage(img);
    openModal();
  };
  return (
    <>
      <div
        style={images.length === 0 ? { display: "none" } : null}
        className="image-gallery-wrapper"
      >
        <div className="arrow prev">
          <p
            onClick={() => {
              handleClick("prev");
            }}
          >
            {arrowLeft}
          </p>
        </div>
        <div
          className="image-gallery"
          ref={element => {
            gallery = element;
          }}
        >
          {images.map(image => (
            <ImageGalleryItem
              clickedImage={clickedImage}
              key={image.file_path}
              image={image.file_path}
            />
          ))}
        </div>
        <div className="arrow next">
          <p
            onClick={() => {
              handleClick("next");
            }}
          >
            {arrowRight}
          </p>
        </div>
      </div>
      <Modal
        hideModal={hideModal}
        showModal={showModal}
        img={`https://image.tmdb.org/t/p/original/${image}`}
      />
    </>
  );
};

export default ImageGallery;
