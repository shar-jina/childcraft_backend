const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Position title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Job type is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    requirements: {
      type: [String],
      required: [true, "Requirements list is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Position", positionSchema);
