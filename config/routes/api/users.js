const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../../models/User");

//@route POST api/users
//Creating new use
router.post(
  "/",
  //Useing express_validator and with the use of check function we can check
  //if the use has provided the valid and required information.
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email!").isEmail(),
    check("password", "Please enter a password with 6 or more chars!").isLength(
      { min: 6 }
    )
  ],
  async (request, response) => {
    //Useing express_validator and with the use of validationResult function
    //we can test the checked informations
    const checkResult = validationResult(request);
    if (!checkResult.isEmpty()) {
      return response.status(400).json({ errors: checkResult.array() });
    }

    const { name, email, password } = request.body;

    try {
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      let newUser = User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      newUser.password = await bcrypt.hash(password, salt);

      const selectedUser = await User.findOne()
        .where("email")
        .in(email)
        .exec();

      if (selectedUser) {
        return response
          .status(400)
          .json({ errors: [{ msg: "User already exist!" }] });
      }

      await newUser.save();

      const payload = { userid: newUser.id };
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
      console.log(err.message);
      response.status(500).send("Server error!");
    }
  }
);

module.exports = router;
