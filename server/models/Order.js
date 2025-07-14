const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  menuItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  pickupTime: String,
  specialRequest: String,
  completed: { type: Boolean, default: false }, // ✅ Add this
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
