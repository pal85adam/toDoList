import React, { useState } from "react";
import Calender from "react-calendar";

const TasksComponent = () => {
  const [date, setDate] = useState(new Date());
  console.log(date);
  return (
    <div>
      <p className="lead">
        <i className="fas fa-tasks"></i> Your tasks!
      </p>
      <Calender
        onChange={date => {
          setDate(date);
        }}
      />
    </div>
  );
};

export default TasksComponent;
