import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const navComponent = () => {
  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-check-double"></i> ToDo
          </Link>
        </h1>
        <ul>
          <li>
            <Link to="/tasks">Your tasks</Link>
          </li>
          <li>
            <a href="#" title="Logout">
              <i className="fas fa-sign-out-alt"></i>
              <span className="hide-sm">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default navComponent;
