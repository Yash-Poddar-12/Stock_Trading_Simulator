const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["buy", "sell"], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
