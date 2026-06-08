const Offer = require("../models/Offer");

// @desc    Get the active offers for frontend homepage
// @route   GET /api/offer/active
// @access  Public
const getActiveOffer = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    console.error("Error fetching active offers:", error);
    res.status(500).json({ message: "Server error fetching active offers" });
  }
};

// @desc    Get all offers (for admin panel list)
// @route   GET /api/offer
// @access  Private (Admin Only)
const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find({}).sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    console.error("Error fetching all offers:", error);
    res.status(500).json({ message: "Server error fetching offers" });
  }
};

// @desc    Create a new offer
// @route   POST /api/offer
// @access  Private (Admin Only)
const createOffer = async (req, res) => {
  const { tag, title, description, buttonText, buttonLink, isActive } = req.body;

  try {
    const newOffer = new Offer({
      tag,
      title,
      description,
      buttonText,
      buttonLink,
      isActive: !!isActive,
    });

    const savedOffer = await newOffer.save();

    res.status(201).json(savedOffer);
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(400).json({ message: error.message || "Failed to create offer" });
  }
};

// @desc    Update an offer
// @route   PUT /api/offer/:id
// @access  Private (Admin Only)
const updateOffer = async (req, res) => {
  const { tag, title, description, buttonText, buttonLink, isActive } = req.body;

  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    offer.tag = tag !== undefined ? tag : offer.tag;
    offer.title = title !== undefined ? title : offer.title;
    offer.description = description !== undefined ? description : offer.description;
    offer.buttonText = buttonText !== undefined ? buttonText : offer.buttonText;
    offer.buttonLink = buttonLink !== undefined ? buttonLink : offer.buttonLink;
    offer.isActive = isActive !== undefined ? !!isActive : offer.isActive;

    const updatedOffer = await offer.save();

    res.json(updatedOffer);
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(400).json({ message: error.message || "Failed to update offer" });
  }
};

// @desc    Delete an offer
// @route   DELETE /api/offer/:id
// @access  Private (Admin Only)
const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    await offer.deleteOne();
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({ message: "Server error deleting offer" });
  }
};

// @desc    Toggle offer activation status
// @route   PATCH /api/offer/:id/activate
// @access  Private (Admin Only)
const activateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    offer.isActive = true;
    const updatedOffer = await offer.save();

    res.json({ message: `Offer '${updatedOffer.title}' is now active`, offer: updatedOffer });
  } catch (error) {
    console.error("Error activating offer:", error);
    res.status(500).json({ message: "Server error activating offer" });
  }
};

// @desc    Deactivate current active offer (hides the banner)
// @route   PATCH /api/offer/:id/deactivate
// @access  Private (Admin Only)
const deactivateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    offer.isActive = false;
    const updatedOffer = await offer.save();

    res.json({ message: "Offer banner deactivated", offer: updatedOffer });
  } catch (error) {
    console.error("Error deactivating offer:", error);
    res.status(500).json({ message: "Server error deactivating offer" });
  }
};

module.exports = {
  getActiveOffer,
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  activateOffer,
  deactivateOffer,
};
