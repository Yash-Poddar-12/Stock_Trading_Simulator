const express = require("express");
const axios = require("axios");
const router = express.Router();

// Hardcoded fallback data for default stocks
const fallbackData = {
  "AAPL": { symbol: "AAPL", price: 223.75, change: 3.02, changePercent: "1.3682%" },
  "GOOGL": { symbol: "GOOGL", price: 170.56, change: 2.88, changePercent: "1.7176%" },
  "AMZN": { symbol: "AMZN", price: 205.71, change: 2.45, changePercent: "1.2054%" },
  "MSFT": { symbol: "MSFT", price: 395.16, change: 2.08, changePercent: "0.5292%" },
  "TSLA": { symbol: "TSLA", price: 288.14, change: 9.75, changePercent: "3.5023%" }
};

// GET /api/stocks/search?symbol=AAPL
router.get("/search", async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) {
      return res.status(400).json({ msg: "Please provide a stock symbol" });
    }

    const apiKey = process.env.ALPHA_VANTAGE_KEY;
    const cacheKey = symbol.toUpperCase();
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${cacheKey}&apikey=${apiKey}`;
    const response = await axios.get(url);

    // If rate limit is exceeded, use fallback data if available
    if (response.data.Information) {
      if (fallbackData[cacheKey]) {
        return res.json(fallbackData[cacheKey]);
      } else {
        return res.status(429).json({ msg: response.data.Information.replace(apiKey, "********") });
      }
    }

    const data = response.data["Global Quote"];
    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({ msg: "Stock data not found" });
    }

    // Format the API data
    const stockData = {
      symbol: data["01. symbol"],
      price: parseFloat(data["05. price"]),
      change: parseFloat(data["09. change"]),
      changePercent: data["10. change percent"]
    };

    res.json(stockData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
