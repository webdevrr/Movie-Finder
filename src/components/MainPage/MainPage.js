import React, { useEffect, useState } from "react";
import api from "../../api";

import MainPageItem from "../MainPatgeItem/MainPageItem";

import "./MainPage.css";

const MainPage = () => {
  const [trending, setTrending] = useState([]);
  const getTrending = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_APIKEY}`;

  useEffect(
    () => {
      api.get(getTrending).then(response => {
        const sixItems = response.data.results.slice(0, 8);
        setTrending(sixItems);
      });
    },
    //eslint-disable-next-line
    []
  );

  return (
    <div className="main-page-wrapper">
      <div className="main-page">
        <h1>Trending this week</h1>
        <div className="flex">
          {trending.map((trend, index) => (
            <MainPageItem key={index} item={trend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
