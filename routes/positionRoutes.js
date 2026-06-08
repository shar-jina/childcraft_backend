const express = require("express");
const router = express.Router();
const {
  getPositions,
  createPosition,
  deletePosition,
} = require("../controllers/positionController");
const { protectAdmin } = require("../middlewares/auth");

router.route("/")
  .get(getPositions)
  .post(protectAdmin, createPosition);

router.route("/:id")
  .delete(protectAdmin, deletePosition);

module.exports = router;
