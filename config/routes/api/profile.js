const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth");
const Profile = require("../../../models/Profile");

//@route GET api/profile/me
router.get("/me", auth, async (request, response) => {
  try {
    const profile = await Profile.findOne({ user: request.userid }).populate(
      "user"
    );
    if (!profile) {
      return response
        .status(400)
        .json({ msg: "There is no profile for this user!" });
    }
    response.json({ profile });
  } catch (err) {
    console.log("What is wrong,, " + err);
    response.status(500).send("Server Error!");
  }
});

//@route POST api/profile
//Create or Update a user profile
router.post(
  "/",
  [auth],
  [
    check("linkedin", "LinkedIn is required!")
      .not()
      .isEmpty()
  ],
  async (request, response) => {
    const checkResult = validationResult(request);
    if (!checkResult.isEmpty()) {
      return response.status(400).json({ errors: checkResult.array() });
    }

    const { facebook, twitter, linkedin } = request.body;

    let newProfileRecord = {
      user: request.userid,
      social: {
        facebook: facebook,
        twitter: twitter,
        linkedin: linkedin
      }
    };
    try {
      const selectedProfile = await Profile.findOne()
        .where("user")
        .in(request.userid)
        .exec();
      console.log(selectedProfile);
      if (selectedProfile) {
        await Profile.findOneAndUpdate(
          { user: request.userid },
          { $set: newProfileRecord },
          { new: true }
        );
        return response.send("Updated!");
      } else {
        const newProfile = new Profile(newProfileRecord);
        await newProfile.save();
        return response.send("Created!");
      }
    } catch (err) {
      console.log("Whats wrong,,,  " + err.message);
      response.status(500).send("Server error!");
    }
  }
);

//@route DELETE api/profile
//Create or DELETE a user profile
router.delete("/", [auth], async (request, response) => {
  try {
    Profile.findOneAndDelete({ user: request.userid });
    User.findOneAndDelete({ _id: request.userid });
    return response.send("User deleted!");
  } catch (err) {
    console.log(err);
    response.status(500).send("Server Error!");
  }
});

module.exports = router;
