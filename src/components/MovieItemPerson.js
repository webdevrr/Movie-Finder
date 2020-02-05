import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import avatar from "../assets/avatar.png";
import api from "../api";

import "./MovieItemPerson.css";

const MovieItemPerson = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();
  let getPerson = `/3/person/${id}?api_key=${process.env.REACT_APP_APIKEY}`;
  const { profile_path } = data;
  useEffect(
    () => {
      api.get(getPerson).then(res => {
        setData(res.data);
        setIsLoading(false);
      });
    },
    //eslint-disable-next-line
    []
  );

  return (
    <>
      {isLoading ? (
        <Spinner
          variant="warning"
          className="movie-item-loader "
          animation="border"
        />
      ) : (
        <div className="movie-item-person">
          <div className="image">
            {profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300/${profile_path}`}
                alt=""
              />
            ) : (
              <img src={avatar} alt="" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieItemPerson;
