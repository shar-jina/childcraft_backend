const BookOutline = require("../models/BookOutline");

// @desc    Get all book series outlines
// @route   GET /api/book-outlines
// @access  Public
const getBookOutlines = async (req, res) => {
  try {
    const outlines = await BookOutline.find({}).sort({ index: 1, createdAt: 1 });
    res.json(outlines);
  } catch (error) {
    console.error("Error fetching book outlines:", error);
    res.status(500).json({ message: "Server error fetching book outlines" });
  }
};

// @desc    Get a single book series outline by ID
// @route   GET /api/book-outlines/:id
// @access  Public
const getBookOutlineById = async (req, res) => {
  try {
    const outline = await BookOutline.findById(req.params.id);
    if (!outline) {
      return res.status(404).json({ message: "Book outline not found" });
    }
    res.json(outline);
  } catch (error) {
    console.error(`Error fetching book outline ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error fetching book outline" });
  }
};

// @desc    Create a new book series outline
// @route   POST /api/book-outlines
// @access  Private (Admin Only)
const createBookOutline = async (req, res) => {
  const { name, label, classes, gradient, image, index } = req.body;

  // Validation removed as metadata fields are no longer required

  try {
    let finalIndex = index;
    if (finalIndex === undefined || finalIndex === null) {
      const lastItem = await BookOutline.findOne({}).sort({ index: -1 });
      finalIndex = lastItem ? lastItem.index + 1 : 0;
    }

    const outline = new BookOutline({
      name,
      label,
      classes,
      gradient: gradient || "from-blue-600 to-indigo-700",
      image: image || "",
      index: finalIndex,
    });

    await outline.save();
    res.status(201).json({ message: "Book outline created successfully", outline });
  } catch (error) {
    console.error("Error creating book outline:", error);
    res.status(500).json({ message: "Server error creating book outline" });
  }
};

// @desc    Update a book series outline
// @route   PUT /api/book-outlines/:id
// @access  Private (Admin Only)
const updateBookOutline = async (req, res) => {
  const { name, label, classes, gradient, image, index } = req.body;

  try {
    const outline = await BookOutline.findById(req.params.id);
    if (!outline) {
      return res.status(404).json({ message: "Book outline not found" });
    }

    if (name !== undefined) outline.name = name;
    if (label !== undefined) outline.label = label;
    if (classes !== undefined) outline.classes = classes;
    if (gradient !== undefined) outline.gradient = gradient;
    if (image !== undefined) outline.image = image;
    if (index !== undefined) outline.index = index;

    await outline.save();
    res.json({ message: "Book outline updated successfully", outline });
  } catch (error) {
    console.error(`Error updating book outline ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error updating book outline" });
  }
};

// @desc    Delete a book series outline
// @route   DELETE /api/book-outlines/:id
// @access  Private (Admin Only)
const deleteBookOutline = async (req, res) => {
  try {
    const outline = await BookOutline.findById(req.params.id);
    if (!outline) {
      return res.status(404).json({ message: "Book outline not found" });
    }

    await BookOutline.deleteOne({ _id: req.params.id });
    res.json({ message: "Book outline deleted successfully" });
  } catch (error) {
    console.error(`Error deleting book outline ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error deleting book outline" });
  }
};

module.exports = {
  getBookOutlines,
  getBookOutlineById,
  createBookOutline,
  updateBookOutline,
  deleteBookOutline,
};
