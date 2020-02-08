import React from "react";

import { Route, Switch } from "react-router-dom";

import NotFound from "./components/NotFound/NotFound";
import MovieList from "./components/MovieList/MovieList";
import Search from "./components/Search/Search";
import Person from "./components/Person/Person";
import Movie from "./components/Movie/Movie";
import Footer from "./components/Footer/Footer";

import "./App.css";

const App = () => {
  return (
    <>
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
          <Route exact path="/person/:id" component={Person} />
          <Route exact path="/:type/:id" component={Movie} />
          <Route
            exact
            path="/search/:query/:page"
            render={() => (
              <>
                <Search />
                <MovieList />
              </>
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
