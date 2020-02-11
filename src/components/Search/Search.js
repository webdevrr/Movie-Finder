import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Search.css";

const Search = () => {
  const mediaMatch = window.matchMedia("(max-width: 767px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
  useEffect(() => {
    const handler = e => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  let history = useHistory();

  const [search, setSearch] = useState(
    "Search for movies, TV series, or people"
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (search === "") {
      history.push(`/search/ /1`);
    } else {
      history.push(`/search/${search.split(" ").join("-")}/1`);
    }
  };
  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };
  const handleOnFocus = () => {
    setSearch("");
  };
  const handleOnBlur = () => {
    setSearch("Search for movies, TV series, or people");
  };

  const handleOnClick = () => {
    history.push("/");
  };
  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <div className="logo" style={{ left: matches ? "5%" : "10%" }}>
          <h1 onClick={handleOnClick}>{matches ? "MF" : "MovieFinder"}</h1>
        </div>
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
