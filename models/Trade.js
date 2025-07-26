const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  date: Date,
  symbol: String,
  action: String,
  quantity: Number,
  price: Number,
  transactionValue: Number,
  currency: String,
  adjustedPrice: Number,
  adjustedQuantity: Number,
  usdValue: Number,
  inrValue: Number,
  sgdValue: Number
});

module.exports = mongoose.model('Trade', tradeSchema, 'trades');