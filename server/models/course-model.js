const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const courseSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    requirec: true,
  },
  price: {
    type: Number,
    requirec: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, // primary key
    ref: "User",
  },
  students: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);
