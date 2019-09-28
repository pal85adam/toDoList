const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: { type: String, required: true },
  text: { type: String },
  date: { type: Date, default: Date.now, required: true }
});

module.exports = tasks = mongoose.model("tasks", TasksSchema);
