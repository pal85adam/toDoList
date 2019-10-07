const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

//@route GET api/auth
router.get("/", auth, async (request, response) => {
  try {
    const selectedUser = await User.findById(request.userid).select(
      "-password"
    );
    response.json({
      user: selectedUser
    });
  } catch (err) {
    response.status(500).json({ errors: [{ msg: err }] });
  }
});

//@route POST api/auth
router.post(
  "/",
  [
    check("email", "Please enter a valid email!")
      .not()
      .isEmpty(),
    check("password", "Please enter a password!")
      .not()
      .isEmpty()
  ],
  async (request, response) => {
    //checking if the user has provided credetials
    const checkResult = validationResult(request);
    if (!checkResult.isEmpty()) {
      return response.status(400).json({ errors: checkResult.array() });
    }

    //preparing provided credentials
    const { email, password } = request.body;
    try {
      let selectedUser = await User.findOne()
        .where("email")
        .in(email)
        .exec();
      if (!selectedUser) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Invalid username!" }] });
      }

      let isCorrectPassword = await bcrypt.compare(
        password,
        selectedUser.password
      );

      if (!isCorrectPassword) {
        return response
          .status(400)
          .json({ errors: [{ msg: "Invalid password!" }] });
      }

      const payload = { userid: selectedUser.id };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: config.get("jwtTimeout") },
        (err, token) => {
          if (err) throw err;
          response.send({ token });
        }
      );
    } catch (err) {
      response.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
