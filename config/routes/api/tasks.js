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

//@route GET api/tasks/:id
router.get("/:id", auth, async (request, response) => {
  try {
    const selectedTask = await Tasks.findOne({
      user: request.userid,
      _id: request.params.id
    });
    console.log(selectedTask, request.userid, request.params);
    if (!selectedTask) {
      return response.status(404).json({ msg: "Task is not foud!" });
    }

    return response.json(selectedTask);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return response.status(404).json({ msg: "Task is not foud!" });
    return response.status(500).send("Server error!");
  }
});

//@route GET api/tasks/?year=#&month=#&day=#
router.get("/", auth, async (request, response) => {
  try {
    const year = request.query.year;
    const month = request.query.month;
    const day = request.query.day;
    let queryTasks = {
      user: request.userid
    };
    if (year) {
      queryTasks = {
        user: request.userid,
        $expr: { $eq: [{ $year: "$date" }, parseInt(year)] }
      };
    }

    if (month) {
      queryTasks = {
        user: request.userid,
        $and: [
          { $expr: { $eq: [{ $year: "$date" }, parseInt(year)] } },
          { $expr: { $eq: [{ $month: "$date" }, parseInt(month)] } }
        ]
      };
    }

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

    const selectedTasks = await Tasks.find(queryTasks);
    if (selectedTasks.length == 0)
      return response.json({ msg: "There are no tasks!" });
    return response.json(selectedTasks);
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
