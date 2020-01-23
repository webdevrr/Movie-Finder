import React, { useState, useEffect } from "react";

import MovieItem from "./components/MovieItem";
import debounce from "lodash.debounce";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieList from "./components/MovieList";

import Search from "./components/Search";
import "./App.css";
import api from "./api";

const App = () => {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState(null);
  const [max, setMax] = useState(null);
  const [page, setPage] = useState(2);
  const [clicked, setClicked] = useState(null);
  //infinite scroll settup
  useEffect(() => {
    if (max >= page) {
      window.onscroll = debounce(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop + 5 >=
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
              //filter movies that doesn't contain  postr
              const afterFilter = responseData.filter(filterPoster);

              setMovies([...movies, ...afterFilter]);
            });
        }
      }, 100);
    } else {
      window.onscroll = null;
    }
    //eslint - disable - next - line;
  }, [movies, query, page, max]);
  const clickedMovie = obj => {
    setClicked(obj);
  };
  const getMovies = movie => {
    const { afterFilter, search, maxPages } = movie;
    setMovies(afterFilter);
    setQuery(search);
    setMax(maxPages);
    setPage(2);
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <>
                <Search getMovies={getMovies} />
                {movies === null ? (
                  <h2>Search for movies or TV series</h2>
                ) : (
                  <MovieList movies={movies} clickedMovie={clickedMovie} />
                )}
              </>
            )}
          />

          <Route
            exact
            path="/movie/:title"
            render={() => <MovieItem clicked={clicked} />}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
