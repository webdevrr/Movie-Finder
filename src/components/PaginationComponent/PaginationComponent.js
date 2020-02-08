import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./PaginationCompnent.css";

const PaginationCompnent = ({ page, maxPages, handleClick }) => {
  return (
    <Pagination style={{ display: maxPages ? "flex" : "none" }}>
      {page === 1 ? null : (
        <Pagination.Prev
          onClick={() => {
            handleClick("prev");
          }}
        />
      )}
      <Pagination.Item className="counter">{`${page} / ${maxPages}`}</Pagination.Item>
      {page !== maxPages ? (
        <Pagination.Next
          onClick={() => {
            handleClick("next");
          }}
        />
      ) : null}
    </Pagination>
  );
};

export default PaginationCompnent;
