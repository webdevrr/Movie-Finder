import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "uuid";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import poster from "../assets/poster.png";
import api from "../api";
import CreditsList from "./CreditsList";

import "./MovieItemMovieOrTV.css";

const MovieItemMovieOrTV = () => {
  const star = <FontAwesomeIcon color="yellow" icon={faStar} size="2x" />;
  let { id, type } = useParams();
  const [data, setData] = useState({});
  const [credits, setCredits] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    poster_path,
    title,
    original_name,
    overview,
    vote_average,
    vote_count,
    genres,
    number_of_episodes,
    number_of_seasons,
    first_air_date,
    release_date,
    last_air_date
  } = data;

  const getMovieOrTV = `/3/${type}/${id}?api_key=${process.env.REACT_APP_APIKEY}`;
  const getCredits = `/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`;

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

  return (
    <>
      {isLoading ? (
        <Spinner variant="warning" className="loader " animation="border" />
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
              <h1>
                {title ? title : original_name}
                {type === "tv"
                  ? ` (${first_air_date.split("-")[0]} - ${
                      last_air_date.split("-")[0]
                    })`
                  : ` (${release_date.split("-")[0]})`}
              </h1>
              <p className="overview">{overview}</p>
              <div className="score">
                {star}
                <p>
                  {vote_average} ({vote_count} votes )
                </p>
              </div>
              {type === "tv" ? (
                <div className="episodes">
                  <p>
                    Number of episodes: {number_of_episodes} (
                    {number_of_seasons} seasons)
                  </p>
                </div>
              ) : (
                <div className="release">
                  <p>Realease date: {release_date}</p>
                </div>
              )}
              <div className="genres">
                {genres
                  ? genres.map(genre => <p key={genre.id}>{genre.name}|</p>)
                  : null}
              </div>
            </div>
          </div>
          <CreditsList credits={credits} />
        </>
      )}
    </>
  );
};

export default MovieItemMovieOrTV;
