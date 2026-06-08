const express = require("express");
const router = express.Router();
const {
  getActiveOffer,
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  activateOffer,
  deactivateOffer,
} = require("../controllers/offerController");
const { protectAdmin } = require("../middlewares/auth");

// Public endpoints
router.get("/active", getActiveOffer);

// Admin-only endpoints
router.get("/", protectAdmin, getAllOffers);
router.post("/", protectAdmin, createOffer);
router.put("/:id", protectAdmin, updateOffer);
router.delete("/:id", protectAdmin, deleteOffer);
router.patch("/:id/activate", protectAdmin, activateOffer);
router.patch("/:id/deactivate", protectAdmin, deactivateOffer);

module.exports = router;
