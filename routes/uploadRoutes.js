const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage } = require("../controllers/uploadController");
const { protectAdmin } = require("../middlewares/auth");

// Set up multer memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  },
});

// Middleware wrapper to catch Multer errors gracefully
const uploadSingleImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.post("/", protectAdmin, uploadSingleImage, uploadImage);

module.exports = router;
