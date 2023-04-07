import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Fragment>
      <div className="error_page">
        <h2>error 404 </h2>
        <p>Page Not Found</p>

        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Error;
