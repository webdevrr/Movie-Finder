import React from "react";
import { useHistory } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  let history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div className="logo">
      <h1 onClick={handleClick}>Movie Finder</h1>
    </div>
  );
};

export default Logo;
