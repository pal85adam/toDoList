import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = loginFormData;
  console.log(loginFormData);
  const formChangeHandler = e => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  };
  const formSubmitHandler = e => {
    e.preventDefault();

      console.log(loginFormData,"Form submitted ");

  };
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

export default LoginComponent;
