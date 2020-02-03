import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import api from "../api";
import CreditsList from "./CreditsList";
import "./MovieItem.css";

const MovieItem = () => {
  const star = <FontAwesomeIcon color="yellow" icon={faStar} size="2x" />;
  const [data, setData] = useState({});
  const [credits, setCredits] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();
  const typeAndId = location.pathname.split("/");
  const type = typeAndId[1];
  const id = typeAndId[2];
  let {
    poster_path,
    title,
    original_name,
    overview,
    vote_average,
    vote_count,
    genres
  } = data;
  let getMovieOrTV = `/3/${type}/${id}?api_key=${process.env.REACT_APP_APIKEY}`;
  let getCredits = `/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`;

  useEffect(
    () => {
      axios.all([api.get(getMovieOrTV), api.get(getCredits)]).then(
        axios.spread((data, credits) => {
          setData(data.data);
          setCredits(credits.data);
          setIsLoading(false);
        })
      );
    },
    //eslint-disable-next-line
    []
  );

  const renderTitle = () => {
    if (!title) {
      return original_name;
    } else {
      return title;
    }
  };
  const renderGenres = () => {
    if (genres) {
      return genres.map(g => <p key={g.id}>{g.name} |</p>);
    } else {
      return null;
    }
  };
  const renderComponent = () => {
    if (isLoading === true) {
      return (
        <Spinner
          variant="warning"
          className="movie-item-loader "
          animation="border"
        />
      );
    } else {
      return (
        <>
          <div className="movie-item">
            <div className="image">
              <img
                src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                alt=""
              />
            </div>
            <div className="desc">
              <h1>{renderTitle()}</h1>
              <p className="movie-item-overview">{overview}</p>
              <div className="movie-item-score">
                {star}
                <p>
                  {vote_average} ({vote_count} votes )
                </p>
              </div>
              <div className="movie-item-genres"> {renderGenres()}</div>
            </div>
          </div>
          <CreditsList credits={credits} />
        </>
      );
    }
  };
  return renderComponent();
};

export default MovieItem;
