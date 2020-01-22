import React from "react";
import MovieItem from "./MovieItem";

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map(movie => {
        return <MovieItem key={movie.id} movie={movie} />;
      })}
    </div>
  );
};

export default MovieList;
