import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import uuid from "uuid";

import MovieListItem from "../MovieListItem/MovieListItem";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import api from "../../api";

import "./MovieList.css";

const MovieList = memo(() => {
  let history = useHistory();
  let { query, page } = useParams();
  const pageInt = parseInt(page);

  const [movies, setMovies] = useState([]);
  const [maxPages, setMaxPages] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(
    () => {
      setIsFetching(true);
      setMovies([]);
      api
        .get(
          `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&page=${page}`
        )
        .then(res => {
          const responseData = res.data.results;
          const maxPages = res.data.total_pages;
          const addedUuid = responseData.map(v => ({ ...v, uuid: uuid() }));
          setMovies(addedUuid);
          setMaxPages(maxPages);
          setIsFetching(false);
        })
        .catch(err => console.log(err));
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
            <h2 className="no-results">Results not found</h2>
          ) : (
            <>
              <ul className="movie-list list">
                {movies.map(movie => (
                  <MovieListItem movie={movie} key={movie.uuid} />
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
