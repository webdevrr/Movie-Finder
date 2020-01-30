import React, { memo } from "react";
import MovieItem from "./MovieListItem";
import "./MovieList.css";

const MovieList = memo(({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => {
        return <MovieItem key={movie.id} movie={movie} />;
      })}
    </div>
  );
});

export default MovieList;
