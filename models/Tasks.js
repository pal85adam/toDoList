const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true,
    index: true
  },
  usertasks: [
    {
      title: { type: String },
      text: { type: String },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = tasks = mongoose.model("tasks", TasksSchema);
