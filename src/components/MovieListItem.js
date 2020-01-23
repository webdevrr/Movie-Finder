import React from "react";
import { Link } from "react-router-dom";
import "./MovieListItem.css";

const MovieListItem = ({ movie, clickedMovie }) => {
  const { poster_path, title, original_name } = movie;
  const renderTitle = () => {
    if (!title) {
      return original_name;
    } else {
      return title;
    }
  };
  return (
    <div className="movie-item" onClick={() => clickedMovie(movie)}>
      <h2 className="movie-title">{renderTitle()}</h2>
      <Link to={`/movie/${renderTitle()}`}>
        <img
          className="movie-image"
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
      </Link>
    </div>
  );
};

export default MovieListItem;
