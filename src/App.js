import React from "react";

import { Route, Switch } from "react-router-dom";

import NotFound from "./components/NotFound/NotFound";
import MovieList from "./components/MovieList/MovieList";
import Search from "./components/Search/Search";
import Person from "./components/Person/Person";
import Movie from "./components/Movie/Movie";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";

import "./App.css";

const App = () => {
  return (
    <>
      <div className="App">
        <Search />

        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <>
                <div className="app-search"></div>
                <MainPage />
              </>
            )}
          />
          <Route exact path="/person/:id" component={Person} />
          <Route exact path="/:type/:id" component={Movie} />
          <Route exact path="/search/:query/:page" component={MovieList} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
