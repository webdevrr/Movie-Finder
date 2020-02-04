import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import MovieItem from "./components/MovieItem";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import "./App.css";

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
        <Route
          exact
          path="/:type/:id"
          render={routeProps => <MovieItem {...routeProps} />}
        />
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
