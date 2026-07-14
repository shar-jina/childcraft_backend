const Gallery = require("../models/Gallery");

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find({}).sort({ index: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({ message: "Server error fetching gallery items" });
  }
};

// @desc    Create a new gallery image
// @route   POST /api/gallery
// @access  Private (Admin Only)
const createGalleryItem = async (req, res) => {
  const { imageUrl, title, index } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: "Please provide imageUrl" });
  }

  try {
    let nextIndex = index;
    if (nextIndex === undefined || nextIndex === null) {
      // Find highest index
      const lastItem = await Gallery.findOne({}).sort({ index: -1 });
      nextIndex = lastItem ? lastItem.index + 1 : 0;
    }

    const item = new Gallery({
      imageUrl,
      title: title || "",
      index: nextIndex,
    });

    await item.save();
    res.status(201).json({ message: "Gallery item created successfully", item });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    res.status(500).json({ message: "Server error creating gallery item" });
  }
};

// @desc    Update a gallery image by ID
// @route   PUT /api/gallery/:id
// @access  Private (Admin Only)
const updateGalleryItem = async (req, res) => {
  const { imageUrl, title, index } = req.body;

  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    if (imageUrl !== undefined) item.imageUrl = imageUrl;
    if (title !== undefined) item.title = title;
    if (index !== undefined) item.index = index;

    await item.save();

    res.json({ message: "Gallery item updated successfully", item });
  } catch (error) {
    console.error(`Error updating gallery item ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error updating gallery item" });
  }
};

// @desc    Delete a gallery image by ID
// @route   DELETE /api/gallery/:id
// @access  Private (Admin Only)
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    await item.deleteOne();
    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error(`Error deleting gallery item ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error deleting gallery item" });
  }
};

module.exports = {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
