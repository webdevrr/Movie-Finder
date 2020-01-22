import React from "react";

const MovieItem = ({ movie }) => {
  const { poster_path, title, original_name } = movie;
  const renderTitle = () => {
    if (!title) {
      return original_name;
    } else {
      return title;
    }
  };
  return (
    <div>
      <h2>{renderTitle()}</h2>
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
    </div>
  );
};

export default MovieItem;
