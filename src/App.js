import React, { useState } from "react";

import uuid from "uuid";
import api from "./api";
import NotFound from "./components/NotFound";
import MovieItem from "./components/MovieItem";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import "./App.css";

const App = () => {
  const [fetchedMovies, setFetchedMovies] = useState([]);

  const getMovies = query => {
    setFetchedMovies([]);
    api
      .get(
        `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`
      )
      .then(response => {
        const max = response.data.total_pages;

        let current = response.data.page;
        function filterPoster(mov) {
          if (mov.poster_path) {
            return mov;
          }
        }

        for (current; current <= max; current++) {
          api
            .get(
              `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&page=${current}`
            )
            .then(response => {
              const responseData = response.data.results;
              const afterFilter = responseData.filter(filterPoster);
              const addedUuid = afterFilter.map(v => ({ ...v, uuid: uuid() }));
              setFetchedMovies(prevState => [...prevState, ...addedUuid]);
            });
        }
      });
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
                {fetchedMovies.length === 0 ? (
                  <h2>Search for movies or TV series</h2>
                ) : (
                  <MovieList movies={fetchedMovies} />
                )}
              </>
            )}
          />
          <Route exact path="/:type/:id" render={() => <MovieItem />} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
