import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";
import "./MovieItem.css";

const MovieItem = () => {
  const [data, setData] = useState({});
  let { poster_path } = data;
  console.log(poster_path);

  let location = useLocation();
  const typeAndId = location.pathname.split("/");
  const type = typeAndId[1];
  const id = typeAndId[2];
  useEffect(
    () => {
      api
        .get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_APIKEY}`
        )
        .then(response => {
          setData(response.data);
        });
    },
    //eslint-disable-next-line
    []
  );

  return (
    <div>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
      </div>
    </div>
  );
};

export default MovieItem;
