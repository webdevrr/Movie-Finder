import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import uuid from "uuid";

import CreditsListItem from "../CreditsListItem/CreditsListItem";
import api from "../../api";

import "./CreditsList.css";

const CreditsList = () => {
  const [creditsFull, setCreditsFull] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isFull, setIsFull] = useState(false);

  let { id, type } = useParams();
  const getCredits = `/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}`;
  useEffect(
    () => {
      api.get(getCredits).then(response => {
        let cred = response.data.cast;
        const cast = cred.map(c => ({ ...c, uuid: uuid() }));
        const range = cast.slice(0, 10);
        setCreditsFull(cast);
        setCredits(range);
      });
    },
    //eslint-disable-next-line
    []
  );
  const handleClick = () => {
    setCredits(creditsFull);
    setIsFull(true);
  };

  const renderMore = () => {
    if (credits.length < 10 || isFull === true) {
      return null;
    } else {
      return (
        <p onClick={handleClick} className="more">
          show full...
        </p>
      );
    }
  };
  return (
    <div className="credits-list">
      {credits.length !== 0 ? (
        <ul className="list">
          {credits.map(credit => (
            <CreditsListItem cast={credit} key={credit.uuid} />
          ))}
        </ul>
      ) : (
        <h2>Cast list not found</h2>
      )}
      {renderMore()}
    </div>
  );
};

export default CreditsList;
