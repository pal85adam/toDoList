const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Tasks = require("../../../models/Tasks");
//@route POST api/tasks
router.post(
  "/",
  [auth],
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("date", "Date is required")
      .not()
      .isEmpty()
  ],
  async (request, response) => {
    const testResult = validationResult(request);
    if (!testResult.isEmpty()) {
      return response.status(400).json({ errors: testResult.array() });
    }
    const { title, text, date } = request.body;

    try {
      const newTasks = new Tasks({
        user: request.userid,
        title: title,
        text: text,
        date: date
      });
      await newTasks.save();
      response.send("Task created");
    } catch (err) {
      console.log(err.message);
      response.status(500).send("Server Error");
    }
  }
);

const getTasks = async (request, response) => {
  try {
    console.log(request.params, request.userid);
    const year = request.params.year;
    const month = request.params.month;
    const day = request.params.day;
    let queryTasks = {
      user: request.userid,
      $expr: { $eq: [{ $year: "$date" }, parseInt(year)] }
    };
    console.log("year", queryTasks);

    if (month) {
      queryTasks = {
        user: request.userid,
        $and: [
          { $expr: { $eq: [{ $year: "$date" }, parseInt(year)] } },
          { $expr: { $eq: [{ $month: "$date" }, parseInt(month)] } }
        ]
      };
    }
    console.log("month", queryTasks);

    if (day) {
      queryTasks = {
        user: request.userid,
        $and: [
          { $expr: { $eq: [{ $year: "$date" }, parseInt(year)] } },
          { $expr: { $eq: [{ $month: "$date" }, parseInt(month)] } },
          { $expr: { $eq: [{ $dayOfMonth: "$date" }, parseInt(day)] } }
        ]
      };
    }
    console.log("day", queryTasks);
    const selectedTasks = await Tasks.find(queryTasks);
    if (selectedTasks.length == 0)
      return response.json({ msg: "There are no tasks!" });
    return response.json(selectedTasks);
  } catch (err) {
    console.log(err.message);
    response.status(500).send("Server error!");
  }
};

//@route GET api/tasks/:year
router.get("/:year", auth, async (request, response) => {
  await getTasks(request, response);
});

//@route GET api/tasks/:year/:month
router.get("/:year/:month", auth, async (request, response) => {
  await getTasks(request, response);
});

//@route GET api/tasks/:year/:month/:day
router.get("/:year/:month/:day", auth, async (request, response) => {
  await getTasks(request, response);
});

//@route GET api/tasks/:id
router.get("/:id", auth, async (request, response) => {
  try {
    const selectedTask = await Tasks.findOne({
      user: request.userid,
      _id: request.params.id
    });

    if (!selectedTask) {
      return response.status(404).json({ msg: "Task is not foud!" });
    }

    return response.json(selectedTask);
  } catch (err) {
    console.log(err.message);
    response.status(500).send("Server error!");
  }
});

//@route PUT api/tasks/:id
router.put(
  "/:id",
  auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("date", "Date is required")
      .not()
      .isEmpty()
  ],
  async (request, response) => {
    const testResult = validationResult(request);
    if (!testResult.isEmpty()) {
      return response.status(400).json({ errors: testResult.array() });
    }
    const { title, text, date } = request.body;
    try {
      const selectedTask = await Tasks.findOne({
        user: request.userid,
        _id: request.params.id
      });

      if (!selectedTask) {
        return response.status(404).json({ msg: "Task is not foud!" });
      }
      selectedTask.title = title;
      selectedTask.text = text;
      selectedTask.date = date;
      await selectedTask.save();
      return response.json({ msg: "Task was updated" });
    } catch (err) {
      console.log(err.message);
      response.status(500).send("Server error!");
    }
  }
);

//@route DELETE api/tasks/:id
router.delete("/:id", auth, async (request, response) => {
  try {
    const selectedTask = await Tasks.findOne({
      user: request.userid,
      _id: request.params.id
    });

    if (!selectedTask) {
      return response.status(404).json({ msg: "Task is not foud!" });
    }

    await selectedTask.remove();
    return json({ msg: "Task was removed!" });
  } catch (err) {
    console.log(err.message);
    response.status(500).send("Server error!");
  }
});

module.exports = router;
