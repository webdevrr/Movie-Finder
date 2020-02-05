import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import MovieItem from "./MovieListItem";
import { fetchMovies } from "../redux/actions";
import PaginationComponent from "./PaginationComponent";
import "./MovieList.css";

const MovieList = memo(() => {
  let history = useHistory();
  let { query, page } = useParams();
  const pageInt = parseInt(page);
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const maxPages = useSelector(state => state.movies.maxPages);
  const isFetching = useSelector(state => state.movies.isFetching);

  useEffect(
    () => {
      dispatch(fetchMovies(query, page));
    },
    //eslint-disable-next-line
    [page, query]
  );

  const handleClick = arg => {
    if (arg === "next") {
      history.push(`/search/${query}/${pageInt + 1}`);
      window.scrollTo(0, 0);
    } else if (arg === "prev") {
      history.push(`/search/${query}/${pageInt - 1}`);
    }
  };

  return (
    <>
      {isFetching ? (
        <div>
          <Spinner
            className="movie-list spinner"
            animation="border"
            variant="warning"
          />
        </div>
      ) : (
        <div className="movie-list">
          {movies.length === 0 ? (
            <h2>Results not found</h2>
          ) : (
            <>
              <ul className="movie-list-list">
                {movies.map(movie => (
                  <MovieItem movie={movie} key={movie.uuid} />
                ))}
              </ul>
              <PaginationComponent
                page={pageInt}
                maxPages={maxPages}
                handleClick={handleClick}
              />
            </>
          )}
        </div>
      )}
    </>
  );
});

export default MovieList;
