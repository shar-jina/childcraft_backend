const mongoose = require("mongoose");

const bookOutlineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
    classes: {
      type: String,
      trim: true,
      default: "",
    },
    gradient: {
      type: String,
      default: "from-blue-600 to-indigo-700",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookOutline", bookOutlineSchema);
