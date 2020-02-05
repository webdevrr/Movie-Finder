import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

import avatar from "../assets/avatar.png";

import "./CreditsListItem.css";

const CreditsListItem = ({ cast }) => {
  const { character, name, profile_path } = cast;
  const [isImageLoading, setIsImageLoading] = useState(true);
  const handleOnLoad = () => {
    setIsImageLoading(false);
  };
  return (
    <li className="credits-list-item">
      <div
        style={{
          display: isImageLoading ? "block" : "none"
        }}
        className="spinner-container"
      >
        <Spinner className="spinner" animation="border" variant="warning" />
      </div>
      <Link to={`/person/${cast.id}`}>
        <img
          style={{ display: isImageLoading ? "none" : "initial" }}
          onLoad={() => {
            handleOnLoad();
          }}
          className="image"
          src={`${
            profile_path
              ? `https://image.tmdb.org/t/p/w200/${profile_path}`
              : avatar
          }`}
          alt={name}
        />
      </Link>
      <div className="name-character">
        <b>
          <p className="character">{character}</p>
        </b>
        <p className="name">{name}</p>
      </div>
    </li>
  );
};

export default CreditsListItem;
