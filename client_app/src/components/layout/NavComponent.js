import React, { Fragment } from "react";
import { Link ,Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { doLogout } from "../../actions/loginActions";
import PropTypes from "prop-types";

const navComponent = ({ isAuthed, doLogout }) => {
  const currentLocation = window.location.pathname;
  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-check-double"></i> ToDo
          </Link>
        </h1>
        {isAuthed && (
          <ul>
            <li>
              <Link to="/tasks">Your tasks</Link>
            </li>
            <li>
              <a href="#" title="Logout" onClick={e => doLogout()}>
                <i className="fas fa-sign-out-alt"></i>
                <span className="hide-sm">Logout</span>
              </a>
            </li>
          </ul>
        )}

        {!isAuthed &&
          currentLocation !== "login" &&
          currentLocation !== "register" && <Redirect to="/login" />}
      </nav>
    </Fragment>
  );
};

navComponent.propType = {
  isAuthed: PropTypes.bool.isRequired,
  doLogout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ isAuthed: state.users.isAuthed });

export default connect(
  mapStateToProps,
  { doLogout }
)(navComponent);
