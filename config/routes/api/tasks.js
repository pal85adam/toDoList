const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");
//@route GET api/tasks
router.get(
  "/",
  [auth, [check("title", "Title is required")]],
  async (request, response) => {
    const testResult = validationResult(request);
    if (!testResult.isEmpty()) {
      return response.status(400).json({ errors: testResult.array() });
    }
    const { title, text, date } = request.body;

    try {
      const selectedUserTasks = await Tasks.findOne()
        .where("user")
        .in(request.userid)
        .exec();
      console.log(selectedUserTasks);
      if (selectedProfile) {
        // need to change this code so i can add tasks for the same user

        return response.send("Updated!");
      } else {
        const newTasks = new Tasks({
          user: request.userid,
          usertasks: [{ title: title, text: text, date: date }]
        });
        await newTasks.save();
        response.send("Task created");
      }
    } catch (err) {
      console.log(err);
      response.status(500).send("Server Error");
    }
  }
);

module.exports = router;
