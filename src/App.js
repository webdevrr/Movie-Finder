import React from "react";

import MovieItemMovieOrTv from "./components/MovieItemMovieOrTV";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import "./App.css";
import MovieItemPerson from "./components/MovieItemPerson";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <div className="app-search">
              <Search />
              <h2>Search for movies, TV series or people</h2>
            </div>
          )}
        />
        <Route exact path="/person/:id" render={() => <MovieItemPerson />} />
        <Route exact path="/:type/:id" render={() => <MovieItemMovieOrTv />} />

        <Route
          exact
          path="/search/:query/:page"
          render={routeProps => (
            <>
              <Search />
              <MovieList {...routeProps} />
            </>
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
