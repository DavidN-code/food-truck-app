// OrderConfirmation.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Order Not Found</h2>
        <p>Looks like something went wrong. Please try again.</p>
        <Link to="/">Go back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>✅ Thank you for your order, {order.name}!</h2>
      <p>We’ve received your order and are getting it ready.</p>

      <h4>Order Summary:</h4>
      <ul>
        <li><strong>Item:</strong> {order.menuItem}</li>
        <li><strong>Quantity:</strong> {order.quantity}</li>
        {order.pickupTime && <li><strong>Pickup Time:</strong> {order.pickupTime}</li>}
        {order.specialRequest && <li><strong>Special Request:</strong> {order.specialRequest}</li>}
        <li><strong>Phone:</strong> {order.phone}</li>
      </ul>

      <p style={{ marginTop: '1rem' }}>
        You’ll get your food hot and fresh at the pickup window!
      </p>

      <Link to="/">← Back to Home</Link>
    </div>
  );
};

export default OrderConfirmation;
