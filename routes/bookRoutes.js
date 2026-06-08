const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { protectAdmin } = require("../middlewares/auth");

router.route("/")
  .get(getBooks)
  .post(protectAdmin, createBook);

router.route("/:id")
  .get(getBookById)
  .put(protectAdmin, updateBook)
  .delete(protectAdmin, deleteBook);

module.exports = router;
