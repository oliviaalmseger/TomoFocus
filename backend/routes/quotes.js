const express = require("express");
const Quote = require("../models/Quote");
const router = express.Router();

router.get("/random", async (req, res) => { // GET 
  try {
    const quotes = await Quote.find();
    if (quotes.length === 0) {
      return res.status(404).json({ message: "No quotes found" });
    }
    const randomQuote =
      quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quote" });
  }
});

module.exports = router;
