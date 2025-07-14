const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Order = require('./models/Order');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Log incoming requests
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request to ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  console.log("✅ GET / route was hit by a browser!");
  res.send("✔️ Server is alive and responding.");
});

const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.post('/api/orders', async (req, res) => {
    try {
      console.log('📥 Order received:', req.body);
  
      const newOrder = new Order(req.body);
      await newOrder.save();
  
      res.status(201).json({ message: '✅ Order saved!' });
    } catch (err) {
      console.error('❌ Failed to save order:', err);
      res.status(500).json({ error: 'Failed to save order' });
    }
  });
  ;
