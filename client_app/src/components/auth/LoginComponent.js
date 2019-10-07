import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/loginActions";

const LoginComponent = ({ loginUser, isAuthed }) => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = loginFormData;
  // console.log(loginFormData);
  const formChangeHandler = e => {
    // console.log("formChangeHandler");
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  };
  const formSubmitHandler = async e => {
    // console.log("formSubmitHandler");
    e.preventDefault();
    loginUser(email, password);
    //setAlert("Form submitted", "success");
    //console.log(loginFormData, "Form submitted ");
  };

  if (isAuthed) {
    return <Redirect to="/tasks" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <form className="form" onSubmit={e => formSubmitHandler(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => formChangeHandler(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => formChangeHandler(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

LoginComponent.propType = {
  setAlert: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({ isAuthed: state.users.isAuthed });

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginComponent);
