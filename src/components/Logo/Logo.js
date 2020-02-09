import React from "react";
import logo from "../../assets/movie-logo.png";
import { useHistory } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  let history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div className="logo">
      <img onClick={handleClick} src={logo} alt="" />
    </div>
  );
};

export default Logo;
