const express = require("express");
const router = express.Router();
const {
  getBanners,
  updateBannerByIndex,
  createBanner,
  updateBannerById,
  deleteBanner,
} = require("../controllers/bannerController");
const { protectAdmin } = require("../middlewares/auth");

router.get("/", getBanners);
router.put("/:index", protectAdmin, updateBannerByIndex);
router.post("/", protectAdmin, createBanner);
router.put("/id/:id", protectAdmin, updateBannerById);
router.delete("/:id", protectAdmin, deleteBanner);

module.exports = router;
