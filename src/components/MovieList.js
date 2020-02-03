import React, { useState, memo } from "react";
import MovieItem from "./MovieListItem";
import Pagination from "react-bootstrap/Pagination";
import { useHistory } from "react-router-dom";

import "./MovieList.css";
const MovieList = memo(({ movies, match, getMovies }) => {
  const { page, query } = match.params;
  let history = useHistory();
  const resultsPerPage = 10;
  const [currentMovies, setCurrentMovies] = useState(
    movies.slice(0, resultsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(parseInt(page));

  const handleClick = arg => {
    if (arg === "next") {
      const index1 = currentPage * resultsPerPage;
      const index2 = (currentPage + 1) * resultsPerPage;
      const nextMovies = movies.slice(index1, index2);
      setCurrentMovies(nextMovies);
      setCurrentPage(currentPage + 1);
      history.push(`/search/${query}/${currentPage + 1}`);
      window.scrollTo(0, 0);
    } else if (arg === "prev") {
      const index1 = Math.abs(resultsPerPage - (currentPage - 1) * 10);
      const index2 = (currentPage - 1) * resultsPerPage;
      const prevMovies = movies.slice(index1, index2);
      setCurrentMovies(prevMovies);
      setCurrentPage(currentPage - 1);
      history.push(`/search/${query}/${currentPage - 1}`);
    }
  };
  return (
    <div className="movie-list">
      <ul className="movie-list-list">
        {currentMovies.map(movie => (
          <MovieItem key={`${movie.uuid}`} movie={movie} />
        ))}
      </ul>
      <Pagination>
        {currentPage === 1 ? null : (
          <Pagination.Prev
            onClick={() => {
              handleClick("prev");
            }}
          />
        )}

        <Pagination.Item className="counter">{`${currentPage} / ${Math.ceil(
          movies.length / resultsPerPage
        )}`}</Pagination.Item>
        {currentPage * resultsPerPage < movies.length ? (
          <Pagination.Next
            onClick={() => {
              handleClick("next");
            }}
          />
        ) : null}
      </Pagination>
    </div>
  );
});

export default MovieList;
