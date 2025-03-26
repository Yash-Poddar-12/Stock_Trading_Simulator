const express = require("express");
const axios = require("axios");
const router = express.Router();

// In-memory cache object and cache duration in milliseconds (e.g., 1 minute)
const cache = {};
const CACHE_DURATION = 60 * 1000; // 60 seconds

// GET /api/stocks/search?symbol=AAPL
router.get("/search", async (req, res) => {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            return res.status(400).json({ msg: "Please provide a stock symbol" });
        }

        const cacheKey = symbol.toUpperCase();
        const now = Date.now();
        // Return cached data if available and still valid.
        if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
            return res.json(cache[cacheKey].data);
        }

        // Build URL using the API key from .env
        const apiKey = process.env.ALPHA_VANTAGE_KEY;
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${cacheKey}&apikey=${apiKey}`;

        const response = await axios.get(url);

        // Check if Alpha Vantage returned an informational message (like rate limit exceeded)
        if (response.data.Information) {
            // Mask the API key in the informational message
            const maskedInfo = response.data.Information.replace(apiKey, "********");
            return res.status(429).json({ msg: maskedInfo });
        }

        const data = response.data["Global Quote"];
        if (!data || Object.keys(data).length === 0) {
            return res.status(404).json({ msg: "Stock data not found" });
        }

        // Format the data for ease of use
        const stockData = {
            symbol: data["01. symbol"],
            price: parseFloat(data["05. price"]),
            change: parseFloat(data["09. change"]),
            changePercent: data["10. change percent"]
        };

        // Cache the result for future calls
        cache[cacheKey] = {
            timestamp: now,
            data: stockData
        };

        res.json(stockData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
