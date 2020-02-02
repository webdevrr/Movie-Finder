import React, { useState, useRef } from "react";
import uuid from "uuid";
import api from "./api";
import NotFound from "./components/NotFound";
import MovieItem from "./components/MovieItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import "./App.css";

const App = () => {
  let movieApp = useRef(null);
  const [fetchedMovies, setFetchedMovies] = useState([]);
  function filterPoster(mov) {
    if (mov.poster_path) {
      return mov;
    }
  }
  const getMovies = async query => {
    movieApp.style.top = "0";
    setFetchedMovies([]);
    let res = await api.get(
      `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`
    );
    const max = res.data.total_pages;
    let current = res.data.page;

    for (current; current <= max; current++) {
      let res2 = await api.get(
        `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&page=${current}`
      );
      const responseData = res2.data.results;
      const afterFilter = responseData.filter(filterPoster);
      const addedUuid = afterFilter.map(v => ({ ...v, uuid: uuid() }));
      setFetchedMovies(prevState => [...prevState, ...addedUuid]);
    }
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div
                ref={element => {
                  movieApp = element;
                }}
                className="app-search"
              >
                <Search getMovies={getMovies} />
                {fetchedMovies.length === 0 ? (
                  <h2>Search for movies or TV series</h2>
                ) : (
                  <MovieList movies={fetchedMovies} />
                )}
              </div>
            )}
          />
          <Route
            exact
            path="/search/:query/:page"
            render={() => <MovieList movies={fetchedMovies} />}
          />
          <Route exact path="/:type/:id" render={() => <MovieItem />} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
