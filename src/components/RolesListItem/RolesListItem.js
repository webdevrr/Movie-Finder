import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import poster from "../../assets/poster.png";
import "./RolesListItem.css";

const RolesListItem = ({ role }) => {
  const { character, original_title, id, media_type, poster_path, name } = role;
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleOnLoad = () => {
    setIsImageLoading(false);
  };
  return (
    <li className="roles-list-item">
      <div
        style={{
          display: isImageLoading ? "block" : "none"
        }}
        className="spinner-container"
      >
        <Spinner className="spinner" animation="border" variant="warning" />
      </div>
      <Link to={`/${media_type}/${id}`}>
        <img
          style={{ display: isImageLoading ? "none" : "initial" }}
          onLoad={handleOnLoad}
          className="image"
          src={`${
            poster_path
              ? `https://image.tmdb.org/t/p/w200/${poster_path}`
              : poster
          }`}
          alt={original_title}
        />
      </Link>
      <div className="desc">
        <Link to={`/${media_type}/${id}`}>
          <p> {original_title ? original_title : name}</p>
        </Link>
        &nbsp;
        <p> as {character}</p>
      </div>
    </li>
  );
};

export default RolesListItem;
