import React, { memo, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import MovieItem from "./MovieListItem";
import { fetchMovies } from "../redux/actions";

import "./MovieList.css";

const MovieList = memo(({ match }) => {
  let history = useHistory();

  const query = match.params.query;
  const page = parseInt(match.params.page);

  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const maxPages = useSelector(state => state.movies.maxPages);

  useEffect(
    () => {
      dispatch(fetchMovies(query, page));
    },
    //eslint-disable-next-line
    [page, query]
  );

  const handleClick = arg => {
    if (arg === "next") {
      history.push(`/search/${query}/${page + 1}`);
      window.scrollTo(0, 0);
    } else if (arg === "prev") {
      history.push(`/search/${query}/${page - 1}`);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  return (
    <div className="movie-list">
      <ul className="movie-list-list">
        {movies.map(movie => (
          <MovieItem movie={movie} key={movie.uuid} />
        ))}
      </ul>
      <Pagination>
        {page === 1 ? null : (
          <Pagination.Prev
            onClick={() => {
              handleClick("prev");
            }}
          />
        )}
        <Pagination.Item className="counter">{`${page} / ${maxPages}`}</Pagination.Item>
        {page !== maxPages ? (
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
