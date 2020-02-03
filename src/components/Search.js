import React, { useState } from "react";
import "./Search.css";
import { fetchMovies } from "../redux/actions";
import { useDispatch } from "react-redux";
const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(fetchMovies(search));
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
