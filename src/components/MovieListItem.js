import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import "./MovieListItem.css";

const MovieListItem = ({ movie }) => {
  const { poster_path, title, original_name, id, media_type } = movie;
  const [isImageLoading, setIsImageLoading] = useState(true);
  const renderTitle = () => {
    if (!title) {
      return original_name;
    } else {
      return title;
    }
  };
  const handleOnLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <li className="movie-list-item">
      <h2 className="movie-list-title">{renderTitle()}</h2>
      <Link to={`/${media_type}/${id}`}>
        <div
          style={{
            display: isImageLoading ? "block" : "none"
          }}
          className="movie-list-item-spinner-container"
        >
          <Spinner
            className="movie-list-item-spinner"
            animation="border"
            variant="warning"
          />
        </div>
        <img
          style={{ display: isImageLoading ? "none" : "initial" }}
          onLoad={() => {
            handleOnLoad();
          }}
          className="movie-list-image"
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt={title}
        />
      </Link>
    </li>
  );
};

export default MovieListItem;
