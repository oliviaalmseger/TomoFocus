const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ MongoDB connected!")).catch((err) => console.error("MongoDB error:", err));

app.get("/", (req, res) => { // Test-route. Funkar servern? 
  res.send("🚀 TomoFocus backend is running");
});

const PORT = 5000;// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
