import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="link">
        <p>
          using
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.themoviedb.org/"
          >
            <span> TMDb </span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
