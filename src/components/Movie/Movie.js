import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import poster from "../../assets/poster.png";
import api from "../../api";
import CreditsList from "../CreditsList/CreditsList";
import ImageGallery from "../ImageGallery/ImageGallery";

import "./Movie.css";

const Movie = () => {
  const star = <FontAwesomeIcon color="yellow" icon={faStar} size="2x" />;
  let { id, type } = useParams();
  const [data, setData] = useState({});

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

  useEffect(
    () => {
      api
        .get(getMovieOrTV)
        .then(response => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    },
    //eslint-disable-next-line
    [id]
  );
  const renderDate = () => {
    if (!first_air_date && !last_air_date && !release_date) {
      return null;
    } else if (type === "tv") {
      return ` (${first_air_date.split("-")[0]} - ${
        last_air_date.split("-")[0]
      })`;
    } else {
      return ` (${release_date.split("-")[0]})`;
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner variant="warning" className="loader " animation="border" />
      ) : (
        <>
          <div className="movie">
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
                {renderDate()}
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
                  ? genres.map(genre => (
                      <p key={genre.id}>{genre.name}&nbsp;|</p>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <ImageGallery />
          <CreditsList />
        </>
      )}
    </>
  );
};

export default Movie;
