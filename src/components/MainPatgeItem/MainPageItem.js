import React from "react";
import { useHistory } from "react-router-dom";

import "./MainPageItem.css";

const MainPageItem = ({ item }) => {
  const { poster_path, vote_average, media_type, id } = item;
  let history = useHistory();

  const handleClick = () => {
    history.push(`/${media_type}/${id}`);
  };
  return (
    <>
      <div className="main-page-item">
        <img
          onClick={handleClick}
          className="image"
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt=""
        />
      </div>
    </>
  );
};

export default MainPageItem;
