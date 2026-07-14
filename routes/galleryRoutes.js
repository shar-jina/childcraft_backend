const express = require("express");
const router = express.Router();
const {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");
const { protectAdmin } = require("../middlewares/auth");

router.get("/", getGalleryItems);
router.post("/", protectAdmin, createGalleryItem);
router.put("/:id", protectAdmin, updateGalleryItem);
router.delete("/:id", protectAdmin, deleteGalleryItem);

module.exports = router;
