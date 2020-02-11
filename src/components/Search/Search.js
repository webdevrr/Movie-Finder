import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../Logo/Logo";

import "./Search.css";

const Search = () => {
  let history = useHistory();

  const [search, setSearch] = useState(
    "Search for movies, TV series, or people"
  );
  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (search === "") {
      history.push(`/search/ /1`);
    } else {
      history.push(`/search/${search.split(" ").join("-")}/1`);
    }
  };
  const handleOnFocus = () => {
    setSearch("");
  };
  const handleOnBlur = () => {
    setSearch("Search for movies, TV series, or people");
  };
  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        {/* <Logo /> */}
        <input
          autoComplete="off"
          value={search}
          type="text"
          name="search"
          onChange={handleChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <button type="submit">
          <b>Search</b>
        </button>
      </form>
    </>
  );
};

export default Search;
