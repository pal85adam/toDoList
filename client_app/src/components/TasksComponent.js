import React, { useState, useEffect } from "react";
import Calender from "react-calendar";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTodayUserTasks,
  updateOrAddTask,
  getOneTask,
  deleteOneTask
} from "../actions/taskActions";

const TasksComponent = ({
  getTodayUserTasks,
  updateOrAddTask,
  getOneTask,
  deleteOneTask,
  tasks
}) => {
  const [taskCompState, setTaskCompState] = useState({
    date: new Date(),
    taskHours: 0,
    taskMinutes: 0,
    title: "",
    text: ""
  });
  useEffect(() => {
    const year = taskCompState.date.getFullYear();
    const month = taskCompState.date.getMonth() + 1;
    const day = taskCompState.date.getDate();
    getTodayUserTasks(year, month, day);
    // console.log("effect");
  }, [taskCompState.date]);

  let taskMinutes = [];
  for (let i = 0; i <= 60; i++) {
    taskMinutes.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  let taskHours = [];
  for (let i = 0; i <= 24; i++) {
    taskHours.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <p className="lead">
        <i className="fas fa-tasks"></i> Your tasks!
      </p>
      <div>
        {/* Calender table */}
        <Calender
          onChange={date => {
            setTaskCompState({ ...taskCompState, date: date });
          }}
        />
        {/** Tasks table */}
        <table className="table">
          <thead>
            <tr>
              <th className="tasks-title">
                {moment(taskCompState.date).format("MMMM, DD")}
              </th>
              <th>{moment(taskCompState.date).format("YYYY")}</th>
            </tr>
          </thead>
          <tbody>
            {tasks.dayTasks &&
              tasks.dayTasks.length > 0 &&
              tasks.dayTasks.map(task => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={e => {
                        deleteOneTask(task._id);
                      }}
                    >
                      Delete
                    </button>
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
          <form
            className="form"
            onSubmit={e => {
              e.preventDefault();
              let dateToSubmit = new Date(
                Date.UTC(
                  taskCompState.date.getFullYear(),
                  taskCompState.date.getMonth(),
                  taskCompState.date.getDate(),
                  taskCompState.taskHours,
                  taskCompState.taskMinutes,
                  0
                )
              );
              updateOrAddTask(
                taskCompState.title,
                taskCompState.text,
                dateToSubmit
              );
            }}
          >
            <div className="hour-minute form-group">
              <div>
                <span>Hour</span>
                <select
                  name="task_hours"
                  value={taskCompState.taskHours}
                  onChange={e =>
                    setTaskCompState({
                      ...taskCompState,
                      taskHours: e.target.value
                    })
                  }
                >
                  {taskHours}
                </select>
              </div>
              <div>
                <span>Minute</span>
                <select
                  name="task_minutes"
                  value={taskCompState.taskMinutes}
                  onChange={e =>
                    setTaskCompState({
                      ...taskCompState,
                      taskMinutes: e.target.value
                    })
                  }
                >
                  {taskMinutes}
                </select>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Title"
                name="title"
                required
                value={taskCompState.title}
                onChange={e =>
                  setTaskCompState({
                    ...taskCompState,
                    title: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Task Description"
                value={taskCompState.text}
                onChange={e =>
                  setTaskCompState({
                    ...taskCompState,
                    text: e.target.value
                  })
                }
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

TasksComponent.propType = {
  tasks: PropTypes.object.isRequired,
  getTodayUserTasks: PropTypes.func.isRequired,
  updateOrAddTask: PropTypes.func.isRequired,
  getOneTask: PropTypes.func.isRequired,
  deleteOneTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ tasks: state.tasks });

export default connect(
  mapStateToProps,
  { getTodayUserTasks, updateOrAddTask, getOneTask, deleteOneTask }
)(TasksComponent);
