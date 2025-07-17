const mongoose = require("mongoose");
const { string } = require("zod");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  imgUrl:{
    type: String,
    default:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-gray-placeholder-vector-illustration-378729425.jpg'
  }
});

module.exports = mongoose.model("User", userSchema);
