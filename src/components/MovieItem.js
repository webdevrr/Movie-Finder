import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import api from "../api";
import "./MovieItem.css";

const MovieItem = () => {
  const star = <FontAwesomeIcon color="yellow" icon={faStar} size="2x" />;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();
  const typeAndId = location.pathname.split("/");
  const type = typeAndId[1];
  const id = typeAndId[2];

  useEffect(
    () => {
      api
        .get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_APIKEY}`
        )
        .then(response => {
          setData(response.data);
          setIsLoading(false);
        });
    },
    //eslint-disable-next-line
    []
  );

  let {
    poster_path,
    title,
    original_name,
    overview,
    vote_average,
    vote_count,
    genres
  } = data;

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
  const renderCompnent = () => {
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
        <div className="movie-item">
          <div className="movie-item-image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt=""
            />
          </div>
          <div className="movie-item-desc">
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
      );
    }
  };
  return renderCompnent();
};

export default MovieItem;
