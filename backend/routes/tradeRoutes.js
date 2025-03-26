const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const router = express.Router();

// In-memory cache for current stock prices
const priceCache = {};
const CACHE_DURATION = 60 * 1000; // Cache duration of 60 seconds

// BUY STOCK ROUTE: POST /api/trade/buy
router.post("/buy", auth, async (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;
    const qty = parseInt(quantity);
    const cost = qty * price;
    const cacheKey = symbol.toUpperCase();
    const now = Date.now();
    let currentPrice;

    // Check if we have a cached price for this symbol
    if (priceCache[cacheKey] && now - priceCache[cacheKey].timestamp < CACHE_DURATION) {
      currentPrice = priceCache[cacheKey].data;
    } else {
      // Fetch current stock price from Alpha Vantage
      const apiKey = process.env.ALPHA_VANTAGE_KEY;
      const currentUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${cacheKey}&apikey=${apiKey}`;
      const currentResponse = await axios.get(currentUrl);

      // Check for rate limit or information message and mask API key
      if (currentResponse.data.Information) {
        return res.status(429).json({ msg: currentResponse.data.Information.replace(apiKey, "********") });
      }

      const currentData = currentResponse.data["Global Quote"];
      if (!currentData || Object.keys(currentData).length === 0) {
        return res.status(404).json({ msg: "Current stock data not found" });
      }

      currentPrice = parseFloat(currentData["05. price"]);
      // Cache the fetched price
      priceCache[cacheKey] = { timestamp: now, data: currentPrice };
    }

    // Ensure the provided buy price is greater than the current market price
    if (parseFloat(price) <= currentPrice) {
      return res.status(400).json({ 
        msg: `Buy price must be greater than the current price ($${currentPrice.toFixed(2)})` 
      });
    }

    // Fetch user and check balance
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.balance < cost) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    // Deduct cost from balance and update portfolio
    user.balance -= cost;
    const holding = user.portfolio.find(item => item.symbol === cacheKey);
    if (holding) {
      holding.quantity += qty;
    } else {
      user.portfolio.push({ symbol: cacheKey, quantity: qty });
    }
    await user.save();

    // Record the transaction
    const transaction = new Transaction({
      user: user._id,
      symbol: cacheKey,
      quantity: qty,
      price,
      type: "buy"
    });
    await transaction.save();

    res.json({
      msg: `Purchased ${qty} shares of ${cacheKey} for $${cost}`,
      balance: user.balance,
      portfolio: user.portfolio
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
