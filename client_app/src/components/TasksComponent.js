import React, { useState, useEffect } from "react";
import Calender from "react-calendar";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodayUserTasks } from "../actions/taskActions";

const TasksComponent = ({ getTodayUserTasks, tasks }) => {
  const [date, setDate] = useState(new Date());
  console.log(date);
  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    getTodayUserTasks(year, month, day);
  }, []);

  const resetDateAndTasks = date => {
    setDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    getTodayUserTasks(year, month, day);
  };

  return (
    <div>
      <p className="lead">
        <i className="fas fa-tasks"></i> Your tasks!
      </p>
      <div>
        {/* Calender table */}
        <Calender
          onChange={date => {
            resetDateAndTasks(date);
          }}
        />
        {/** Tasks table */}
        <table className="table">
          <thead>
            <tr>
              <th className="tasks-title">{moment(date).format("MMMM, DD")}</th>
              <th>{moment(date).format("YYYY")}</th>
            </tr>
          </thead>
          <tbody>
            {tasks.dayTasks &&
              tasks.dayTasks.length > 0 &&
              tasks.dayTasks.map(task => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            {tasks.dayTasks && tasks.dayTasks.length === 0 && (
              <tr>
                <td>No tasks for this day!</td>
              </tr>
            )}
          </tbody>
        </table>
        {/**End to tasks-container */}
        <div>
          <p className="lead">Add your next task for this day!</p>
          <form className="form">
            <div className="form-group">
              <input type="text" placeholder="Title" name="title" required />
            </div>
            <div className="form-group">
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Task Description"
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
          </form>
        </div>
        {/*End of form*/}
      </div>
    </div>
  );
};

TasksComponent.propType ={
  tasks: PropTypes.object.isRequired,
  getTodayUserTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ tasks: state.tasks });

export default connect(
  mapStateToProps,
  { getTodayUserTasks }
)(TasksComponent);
