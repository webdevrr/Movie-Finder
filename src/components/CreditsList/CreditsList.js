import React from "react";

import CreditsListItem from "../CreditsListItem/CreditsListItem";

import "./CreditsList.css";

const CreditsList = ({ credits }) => {
  return (
    <div className="credits-list">
      <h1 className="cast">Cast:</h1>
      {credits.length !== 0 ? (
        <ul className="list">
          {credits.map(credit => (
            <CreditsListItem cast={credit} key={credit.uuid} />
          ))}
        </ul>
      ) : (
        <h2>Cast list not found</h2>
      )}
    </div>
  );
};

export default CreditsList;
