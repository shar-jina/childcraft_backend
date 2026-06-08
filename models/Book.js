const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Book image path or URL is required"],
    },
    category: {
      type: String,
      required: [true, "Category/Syllabus is required"],
      trim: true,
    },
    std: {
      type: String,
      required: [true, "Standard/Class is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
