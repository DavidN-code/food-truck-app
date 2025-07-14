const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ✅ POST - Create order
router.post('/', async (req, res) => {
  console.log('✅ New Order Received:', req.body);
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order saved!' });
  } catch (err) {
    console.error('❌ Failed to save order:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// ✅ GET - Fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ✅ PATCH - Mark as complete
router.patch('/:id/complete', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Order not found' });
    }
    console.log('✅ Order marked complete:', updated);
    res.json(updated);
  } catch (err) {
    console.error('❌ Failed to mark order complete:', err);
    res.status(500).json({ error: 'Failed to mark complete' });
  }
});

// ✅ DELETE - Remove order
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    console.log('🗑️ Deleted Order:', deletedOrder);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error('❌ Failed to delete order:', err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
