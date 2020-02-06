import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

import avatar from "../../assets/avatar.png";
import api from "../../api";
import RolesList from "../RolesList/RolesList";

import "./Person.css";

const Person = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();
  let getPerson = `/3/person/${id}?api_key=${process.env.REACT_APP_APIKEY}`;
  const { profile_path, birthday, biography, name } = data;
  const age = moment(birthday, "YYYY-MM-DD")
    .fromNow()
    .split(" ")[0];

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
        <Spinner variant="warning" className="loader " animation="border" />
      ) : (
        <>
          <div className="person">
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
            <div className="desc">
              <h1>{name}</h1>
              <p>{biography}</p>
              {age === "Invalid" ? null : (
                <p>
                  Birthday: {birthday} ({age} years)
                </p>
              )}
            </div>
          </div>
          <RolesList id={id} />
        </>
      )}
    </>
  );
};

export default Person;
