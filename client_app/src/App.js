import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavComponent from "./components/layout/NavComponent";
import DashComponent from "./components/layout/DashComponent";
import TasksComponent from "./components/TasksComponent";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import FrameComponent from "./components/layout/FrameComponent";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavComponent />
        <Route exact path="/" component={DashComponent} />
        <Switch>
          <FrameComponent>
            <Route exact path="/register" component={RegisterComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/tasks" component={TasksComponent} />
          </FrameComponent>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
