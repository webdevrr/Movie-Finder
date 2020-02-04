import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "uuid";
import poster from "../assets/poster.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CreditsList from "./CreditsList";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import api from "../api";
import "./MovieItemMovieOrTV.css";

const MovieItemMovieOrTV = () => {
  const star = <FontAwesomeIcon color="yellow" icon={faStar} size="2x" />;
  let { id, type } = useParams();
  const [data, setData] = useState({});
  const [credits, setCredits] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let getMovieOrTV = `/3/${type}/${id}?api_key=${process.env.REACT_APP_APIKEY}`;
  let getCredits = `/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`;

  useEffect(
    () => {
      axios.all([api.get(getMovieOrTV), api.get(getCredits)]).then(
        axios.spread((data, credits) => {
          let cred = credits.data.cast;
          const c = cred.map(c => ({ ...c, uuid: uuid() }));
          setData(data.data);
          setCredits(c);
          setIsLoading(false);
        })
      );
    },
    //eslint-disable-next-line
    [id]
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

  return (
    <>
      {isLoading ? (
        <Spinner
          variant="warning"
          className="movie-item-loader "
          animation="border"
        />
      ) : (
        <>
          <div className="movie-item">
            <div className="image">
              <img
                src={`${
                  poster_path
                    ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                    : poster
                }`}
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
      )}
    </>
  );
};

export default MovieItemMovieOrTV;
