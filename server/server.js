const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRoute = require('./routes/orders');
const menuRoutes = require('./routes/menu');
require('dotenv').config();



const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/menu', menuRoutes);

const startServer = async () => {
    try {
// Connect to MongoDB and set up routes
console.log('🔥 Starting server...');
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Reached after Mongo connect');



  
    console.log('✅ MongoDB connected');
    app.use('/api/orders', ordersRoute);
    app.listen(5050, () => {
    console.log('Server running on http://localhost:5050');
    });

}
  catch(err) {
    console.error('❌ MongoDB connection error:', err);
  }
};
  


startServer();


