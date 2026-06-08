const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      default: "Limited Time Offer",
    },
    title: {
      type: String,
      required: [true, "Offer title is required"],
    },
    description: {
      type: String,
      required: [true, "Offer description is required"],
    },
    buttonText: {
      type: String,
      default: "Learn More",
    },
    buttonLink: {
      type: String,
      default: "/contact",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
