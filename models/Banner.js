const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
      unique: true,
      min: [0, "Index cannot be less than 0"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
