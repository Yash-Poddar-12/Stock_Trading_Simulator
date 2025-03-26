const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 1000000 },
  portfolio: [
    {
      symbol: { type: String },
      quantity: { type: Number, default: 0 },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
