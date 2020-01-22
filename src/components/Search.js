import React, { useState } from "react";
import api from "../api";

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
        console.log(response.data);

        const responseData = response.data.results;
        const maxPages = response.data.total_pages;

        //eslint-disable-next-line
        function filterPoster(mov) {
          if (mov.poster_path) {
            return mov;
          }
        }
        //filter movies that doesn't contain  poster
        const afterFilter = responseData.filter(filterPoster);

        getMovies(afterFilter, search, maxPages);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={search}
          type="text"
          name="search"
          onChange={handleChange}
        />
        <button type="submit">search</button>
      </form>
    </div>
  );
};

export default Search;
