import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavComponent from "./components/layout/NavComponent";
import DashComponent from "./components/layout/DashComponent";
import TasksComponent from "./components/TasksComponent";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import FrameComponent from "./components/layout/FrameComponent";

import { Provider } from "react-redux";
import store from "./store";
import AlertsComponent from "./components/layout/AlertsComponent";
import { loadUser } from "./actions/loginActions";
import setAxiosConfigs from "./utils/setAxiosConfig";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

if (localStorage.tdtoken) {
  setAxiosConfigs(localStorage.tdtoken);
}

const App = () => {
  useEffect(() => {
    // console.log("hi there >>>>");
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavComponent />
        <Route exact path="/" component={DashComponent} />
        <FrameComponent>
          <AlertsComponent />
          <Switch>
            <Route exact path="/register" component={RegisterComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/tasks" component={TasksComponent} />
          </Switch>
        </FrameComponent>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
