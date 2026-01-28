require("dotenv").config();// Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const quoteRoutes = require("./routes/quotes");

app.use(cors());
app.use(express.json());
app.use("/api/quotes", quoteRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ MongoDB connected!")).catch((err) => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
