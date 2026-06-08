const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

// Note: Cloudinary SDK automatically configures itself when process.env.CLOUDINARY_URL is set.
// We call config(true) to force it to parse the environment variable.
if (process.env.CLOUDINARY_URL) {
  cloudinary.config(true);
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private (Admin Only)
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Check if Cloudinary is configured
  if (
    !process.env.CLOUDINARY_URL &&
    (!process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET)
  ) {
    return res.status(400).json({
      message:
        "Cloudinary is not configured. Please define CLOUDINARY_URL in your backend .env file.",
    });
  }

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "childcraft_banners",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Cloudinary upload failed", error: error.message });
        }
        res.json({
          message: "Image uploaded successfully",
          url: result.secure_url,
        });
      }
    );

    const readable = new Readable();
    readable.push(req.file.buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  } catch (error) {
    console.error("Upload controller error:", error);
    res.status(500).json({ message: "Server error during image upload" });
  }
};

module.exports = {
  uploadImage,
};
