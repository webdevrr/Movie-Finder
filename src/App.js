import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import "./App.css";
import api from "./api";

const App = () => {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState(null);
  const [max, setMax] = useState(null);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (max >= page) {
      window.onscroll = debounce(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          api
            .get(
              `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&page=${page}`
            )
            .then(response => {
              setPage(page + 1);
              let responseData = response.data.results;
              function filterPoster(mov) {
                if (mov.poster_path) {
                  return mov;
                }
              }
              //filter movies that doesn't contain  poster
              const afterFilter = responseData.filter(filterPoster);

              setMovies([...movies, ...afterFilter]);
            });
        }
      }, 100);
    } else {
      window.onscroll = null;
    }
    //eslint-disable-next-line
  }, [movies, query, page, max]);

  const renderListOrNothing = () => {
    if (movies === null) {
      return <h1>Search for movies or series</h1>;
    } else {
      return <MovieList movies={movies} />;
    }
  };
  const getMovies = (response, query, maxPages) => {
    setMovies(response);
    setQuery(query);
    setMax(maxPages);
    setPage(2);
  };
  return (
    <div className="App">
      <Search getMovies={getMovies} />
      {renderListOrNothing()}
    </div>
  );
};

export default App;
