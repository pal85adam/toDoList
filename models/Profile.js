const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true,
    index: true
  },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String }
  }
});

module.exports = profile = mongoose.model("profile", ProfileSchema);
