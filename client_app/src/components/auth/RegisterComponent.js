import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alertActions";
import { registerUser } from "../../actions/registerActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const RegisterComponent = ({ setAlert, registerUser }) => {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = registerFormData;
  console.log(registerFormData);
  const formChangeHandler = e => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    });
  };
  const formSubmitHandler = e => {
    e.preventDefault();
    if (password === password2) {
      registerUser(name,email,password);
    } else {
      setAlert("Password and Confirm Password are not matched!", "danger");
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user-circle"></i> Create your account
      </p>
      <form className="form" onSubmit={e => formSubmitHandler(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => formChangeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => formChangeHandler(e)}
          />
          <small className="form-text">Please double check your email!</small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => formChangeHandler(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

RegisterComponent.propType = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, registerUser }
)(RegisterComponent);
