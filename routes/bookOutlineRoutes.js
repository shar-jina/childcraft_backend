const express = require("express");
const router = express.Router();
const {
  getBookOutlines,
  getBookOutlineById,
  createBookOutline,
  updateBookOutline,
  deleteBookOutline,
} = require("../controllers/bookOutlineController");
const { protectAdmin } = require("../middlewares/auth");

router.route("/")
  .get(getBookOutlines)
  .post(protectAdmin, createBookOutline);

router.route("/:id")
  .get(getBookOutlineById)
  .put(protectAdmin, updateBookOutline)
  .delete(protectAdmin, deleteBookOutline);

module.exports = router;
