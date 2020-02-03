import React, { useState } from "react";
import uuid from "uuid";
import api from "./api";
import NotFound from "./components/NotFound";
import MovieItem from "./components/MovieItem";
import { Route, Switch, useHistory } from "react-router-dom";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import "./App.css";

const App = () => {
  let history = useHistory();
  const [fetchedMovies, setFetchedMovies] = useState([]);

  function filterPoster(mov) {
    if (mov.poster_path) {
      return mov;
    }
  }
  const getMovies = async query => {
    setFetchedMovies([]);
    let res = await api.get(
      `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`
    );
    history.push(`/search/${query.split(" ").join("-")}/1`);
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
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <div className="app-search">
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
          render={routeProps => (
            <div className="app-search">
              <Search getMovies={getMovies} />
              {fetchedMovies.length === 0 ? (
                <h2>Search for movies or TV series</h2>
              ) : (
                <MovieList
                  {...routeProps}
                  getMovies={getMovies}
                  movies={fetchedMovies}
                />
              )}
            </div>
          )}
        />
        <Route
          exact
          path="/:type/:id"
          render={routeProps => <MovieItem {...routeProps} />}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
