import React from "react";
import CreditsListItem from "./CreditsListItem";
import "./CreditsList.css";

const CreditsList = ({ credits }) => {
  const { cast } = credits;

  return (
    <>
      <h1 className="cast">Cast:</h1>
      <ul className="credits-list">
        {cast.map(credit => (
          <CreditsListItem cast={credit} key={credit.id} />
        ))}
      </ul>
    </>
  );
};

export default CreditsList;
