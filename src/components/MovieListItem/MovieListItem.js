import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import poster from "../../assets/poster.png";

import "./MovieListItem.css";

const MovieListItem = ({ movie }) => {
  const {
    poster_path,
    title,
    original_name,
    id,
    media_type,
    name,
    profile_path
  } = movie;
  const [isImageLoading, setIsImageLoading] = useState(true);

  const renderTitle = () => {
    if (name) {
      return name;
    } else if (!original_name) {
      return title;
    } else {
      return original_name;
    }
  };
  const renderImage = () => {
    if (profile_path) {
      return `https://image.tmdb.org/t/p/w300/${profile_path}`;
    } else if (poster_path) {
      return `https://image.tmdb.org/t/p/w300/${poster_path}`;
    } else {
      return poster;
    }
  };
  const handleOnLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <li className="movie-list-item">
      <h2 className="title">{renderTitle()}</h2>
      <Link to={`/${media_type}/${id}`}>
        <div
          style={{
            display: isImageLoading ? "block" : "none"
          }}
          className="spinner-container"
        >
          <Spinner className="spinner" animation="border" variant="warning" />
        </div>
        <img
          style={{ display: isImageLoading ? "none" : "initial" }}
          onLoad={handleOnLoad}
          className="image"
          src={renderImage()}
          alt={title}
        />
      </Link>
    </li>
  );
};

export default MovieListItem;
