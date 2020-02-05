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
    if (search === "") {
      history.push(`/search/ /1`);
    } else {
      history.push(`/search/${search.split(" ").join("-")}/1`);
    }
  };

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          value={search}
          type="text"
          name="search"
          onChange={handleChange}
        />
        <button type="submit">search</button>
      </form>
    </>
  );
};

export default Search;
