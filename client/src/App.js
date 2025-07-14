import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import Admin from './pages/Admin'; // Make sure this file exists
import OrderConfirmation from './components/OrderConfirmation'; // adjust path as needed


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-10">
        <Routes>
          <Route path="/" element={<OrderForm />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
