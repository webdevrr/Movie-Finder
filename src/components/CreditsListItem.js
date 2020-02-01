import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import Spinner from "react-bootstrap/Spinner";

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
      <div className="name-character">
        <p className="name">{name}</p>
        <p className="character">{character}</p>
      </div>
    </li>
  );
};

export default CreditsListItem;
