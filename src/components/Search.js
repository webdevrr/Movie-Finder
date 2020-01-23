import React, { useState } from "react";
import api from "../api";
import "./Search.css";

const Search = ({ getMovies }) => {
  const [search, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    api
      .get(
        `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${search}`
      )
      .then(response => {
        const responseData = response.data.results;
        const maxPages = response.data.total_pages;

        function filterPoster(mov) {
          if (mov.poster_path) {
            return mov;
          }
        }
        //filter movies that doesn't contain  poster
        const afterFilter = responseData.filter(filterPoster);
        getMovies({ afterFilter, search, maxPages });
      });
  };

  return (
    <div>
      <form className="movie-form" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className="movie-input"
          value={search}
          type="text"
          name="search"
          onChange={handleChange}
        />
        <button className="movie-button" type="submit">
          search
        </button>
      </form>
    </div>
  );
};

export default Search;
