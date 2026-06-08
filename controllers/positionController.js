const Position = require("../models/Position");

// @desc    Get all positions
// @route   GET /api/positions
// @access  Public
const getPositions = async (req, res) => {
  try {
    const positions = await Position.find({}).sort({ createdAt: -1 });
    res.json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ message: "Server error fetching positions" });
  }
};

// @desc    Create a new position
// @route   POST /api/positions
// @access  Private (Admin Only)
const createPosition = async (req, res) => {
  const { title, department, type, description, requirements } = req.body;

  if (!title || !department || !type || !description || !requirements || !Array.isArray(requirements)) {
    return res.status(400).json({ message: "Please provide title, department, type, description, and requirements list" });
  }

  try {
    const position = new Position({
      title,
      department,
      type,
      description,
      requirements,
    });

    await position.save();
    res.status(201).json({ message: "Position created successfully", position });
  } catch (error) {
    console.error("Error creating position:", error);
    res.status(500).json({ message: "Server error creating position" });
  }
};

// @desc    Delete a position by ID
// @route   DELETE /api/positions/:id
// @access  Private (Admin Only)
const deletePosition = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);

    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    await Position.deleteOne({ _id: req.params.id });
    res.json({ message: "Position deleted successfully" });
  } catch (error) {
    console.error(`Error deleting position ${req.params.id}:`, error);
    res.status(500).json({ message: "Server error deleting position" });
  }
};

module.exports = {
  getPositions,
  createPosition,
  deletePosition,
};
