const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
