import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Search.css";

const Search = () => {
  let history = useHistory();

  const [search, setSearch] = useState("");
  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/search/${search.split(" ").join("-")}/1`);
  };

  return (
    <>
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
    </>
  );
};

export default Search;
