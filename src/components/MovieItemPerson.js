import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "./MovieItemPerson.css";
import avatar from "../assets/avatar.png";
import Spinner from "react-bootstrap/Spinner";

const MovieItemPerson = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();
  let getPerson = `/3/person/${id}?api_key=${process.env.REACT_APP_APIKEY}`;

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

  const { profile_path } = data;

  const renderImage = () => {
    if (!profile_path) {
      return <img src={avatar} alt="" />;
    } else {
      return (
        <img src={`https://image.tmdb.org/t/p/w300/${profile_path}`} alt="" />
      );
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
        <div className="movie-item-person">
          <div className="image">{renderImage()}</div>
        </div>
      )}
    </>
  );
};

export default MovieItemPerson;
