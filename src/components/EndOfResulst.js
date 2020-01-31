import React from "react";

const EndOfResulst = ({ page, max }) => {
  return <>{page > max ? <h3>End of results</h3> : null}</>;
};

export default EndOfResulst;
