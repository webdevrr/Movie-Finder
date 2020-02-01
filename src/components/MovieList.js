import React, { memo } from "react";
import MovieItem from "./MovieListItem";
import EndOfResulst from "./EndOfResulst";
import "./MovieList.css";

const MovieList = memo(({ movies, max, page }) => {
  return (
    <div className="movie-list">
      <ul className="movie-list-list">
        {movies.length === 0 ? (
          <h2>Not found</h2>
        ) : (
          movies.map(movie => {
            return (
              <MovieItem key={`${movie.id}${movie.vote_count}`} movie={movie} />
            );
          })
        )}
      </ul>
      {max !== 0 && page !== 2 ? <EndOfResulst page={page} max={max} /> : null}
    </div>
  );
});

export default MovieList;
