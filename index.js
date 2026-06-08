const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const offerRoutes = require("./routes/offerRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const bookRoutes = require("./routes/bookRoutes");
const positionRoutes = require("./routes/positionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/offer", offerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/positions", positionRoutes);

app.get("/", (req, res) => {
  res.send("Childcraft Backend Running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});