const Banner = require("../models/Banner");

// @desc    Get all banner images
// @route   GET /api/banner
// @access  Public
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ index: 1 });
    res.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ message: "Server error fetching banners" });
  }
};

// @desc    Update a banner image by index (Legacy support)
// @route   PUT /api/banner/:index
// @access  Private (Admin Only)
const updateBannerByIndex = async (req, res) => {
  const index = parseInt(req.params.index, 10);
  const { imageUrl } = req.body;

  if (isNaN(index) || index < 0) {
    return res.status(400).json({ message: "Invalid index. Must be greater than or equal to 0" });
  }

  if (!imageUrl) {
    return res.status(400).json({ message: "Please provide imageUrl" });
  }

  try {
    let banner = await Banner.findOne({ index });

    if (!banner) {
      banner = new Banner({ index, imageUrl });
    } else {
      banner.imageUrl = imageUrl;
    }

    await banner.save();
    res.json({ message: `Banner slot ${index} updated successfully`, banner });
  } catch (error) {
    console.error(`Error updating banner ${index}:`, error);
    res.status(500).json({ message: "Server error updating banner" });
  }
};

// @desc    Create a new banner image
// @route   POST /api/banner
// @access  Private (Admin Only)
const createBanner = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: "Please provide imageUrl" });
  }

  try {
    // Find highest index
    const lastBanner = await Banner.findOne({}).sort({ index: -1 });
    const nextIndex = lastBanner ? lastBanner.index + 1 : 0;

    const banner = new Banner({
      index: nextIndex,
      imageUrl,
    });

    await banner.save();
    res.status(201).json({ message: "Banner created successfully", banner });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({ message: "Server error creating banner" });
  }
};

// @desc    Update a banner image by ID
// @route   PUT /api/banner/id/:id
// @access  Private (Admin Only)
const updateBannerById = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: "Please provide imageUrl" });
  }

  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    banner.imageUrl = imageUrl;
    await banner.save();

    res.json({ message: "Banner updated successfully", banner });
  } catch (error) {
    console.error(`Error updating banner ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error updating banner" });
  }
};

// @desc    Delete a banner image by ID (maintaining minimum of 5 banners)
// @route   DELETE /api/banner/:id
// @access  Private (Admin Only)
const deleteBanner = async (req, res) => {
  try {
    const bannerCount = await Banner.countDocuments();
    if (bannerCount <= 5) {
      return res.status(400).json({ message: "Cannot delete banner. A minimum of 5 banners is required." });
    }

    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await banner.deleteOne();
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error(`Error deleting banner ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error deleting banner" });
  }
};

module.exports = {
  getBanners,
  updateBannerByIndex,
  createBanner,
  updateBannerById,
  deleteBanner,
};
