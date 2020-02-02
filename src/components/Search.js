import React, { useState } from "react";
import "./Search.css";
const Search = ({ getMovies }) => {
  const [search, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    getMovies(search);
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
