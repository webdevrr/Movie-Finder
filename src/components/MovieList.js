import React from "react";
import MovieItem from "./MovieListItem";
import "./MovieList.css";

const MovieList = ({ movies, clickedMovie }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => {
        return (
          <MovieItem key={movie.id} movie={movie} clickedMovie={clickedMovie} />
        );
      })}
    </div>
  );
};

export default MovieList;
