import React from "react";
import CreditsListItem from "./CreditsListItem";
import "./CreditsList.css";

const CreditsList = ({ credits }) => {
  const { cast } = credits;

  return (
    <div className="credits-list">
      <h1 className="cast">Cast:</h1>
      <ul className="list">
        {cast.map(credit => (
          <CreditsListItem cast={credit} key={credit.id} />
        ))}
      </ul>
    </div>
  );
};

export default CreditsList;
