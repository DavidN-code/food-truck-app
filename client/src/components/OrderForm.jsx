import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    menuItem: '',
    quantity: 1,
    pickupTime: '',
    specialRequest: ''
  });

  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/api/menu`)
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('❌ Failed to load menu:', err));
  }, []);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/orders`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('✅ Order submitted:', data);
      alert('✅ Order submitted!');
      navigate('/confirmation', { state: { order: formData } });

      // Optionally reset form
      setFormData({
        name: '',
        phone: '',
        menuItem: '',
        quantity: 1,
        pickupTime: '',
        specialRequest: ''
      });
    } catch (err) {
      console.error('❌ Error submitting order:', err);
      alert('❌ Failed to submit order.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-2xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Place Your Order</h2>

      <div>
        <label className="block font-semibold mb-1" htmlFor="name">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="phone">Phone Number</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="menuItem">Menu Item</label>
        <select name="menuItem" value={formData.menuItem} onChange={handleChange} required className="w-full p-2 border rounded">
        <option value="">-- Choose an item --</option>
        {menuItems.map(item => (
          <option key={item._id} value={item.name}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </option>
        ))}

        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="quantity">Quantity</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="pickupTime">Pickup Time (optional)</label>
        <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="specialRequest">Special Requests</label>
        <textarea name="specialRequest" value={formData.specialRequest} onChange={handleChange} rows="3" className="w-full p-2 border rounded" />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;
