import React, { useEffect } from "react";
import "./MovieItem.css";

const MovieItem = ({ clicked }) => {
  useEffect(
    () => {
      console.log(clicked);
    },
    //eslint-disable-next-line
    []
  );
  return <div>lol</div>;
};

export default MovieItem;
