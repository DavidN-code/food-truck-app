import React, { useEffect, useRef, useState } from 'react'; // 👈 Add useRef
import MenuManager from '../components/MenuManager'; // or adjust path if needed

const ADMIN_PASSWORD = 'letmein'; // 🔐 Change this to anything you want

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('adminAuthed') === 'true'
  );
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null); // 👈 create the ref



  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = () => {
    fetch('http://localhost:5050/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  };

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthed', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthed');
    setIsAuthenticated(false);
    setPasswordInput('');      // Clear input
    setShowPassword(false);    // ✅ Reset password visibility
  };
  
  


  const markComplete = (id) => {
    fetch(`http://localhost:5050/api/orders/${id}/complete`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(() => fetchOrders())
      .catch(err => console.error('Error marking order complete:', err));
  };

  const deleteOrder = (id) => {
    fetch(`http://localhost:5050/api/orders/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => fetchOrders())
      .catch(err => console.error('Error deleting order:', err));
  };

  if (!isAuthenticated) {
    return (
        <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent page reload
          handleLogin();
        }}
        style={{ padding: '2rem' }}
      >
        <h2>Admin Login</h2>
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '280px',
        }}
        >
        <input
            ref={passwordInputRef} // 👈 attach here
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            autoFocus
            style={{ flex: 1 }}
        />
            <button
            type="button" // ✅ <-- Add this line
            onClick={() => {
                setShowPassword(!showPassword);
                passwordInputRef.current?.focus(); // ⬅ keeps input focused for Enter
            }}
            style={{ marginLeft: '0.5rem' }}
            >
            {showPassword ? '🙈 Hide Password' : '👁 Show Password'}
            </button>


        </div>

        <br /><br />
        <button type="submit">Login</button>
      </form>
      
    );
  }

  return (
    
    <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h1>Order Dashboard</h1>
  <button onClick={handleLogout}>🚪 Logout</button>
</div>

      
{orders.length === 0 ? (
  <p>No orders yet.</p>
) : (
  <div style={{ overflowX: 'auto' }}>
    <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left', minWidth: '600px' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Item</th>
          <th>Qty</th>
          <th>Pickup Time</th>
          <th>Request</th>
          <th>Ordered At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order._id} style={{ backgroundColor: order.completed ? '#d4edda' : 'white' }}>
            <td>{order.name}</td>
            <td>{order.phone}</td>
            <td>{order.menuItem}</td>
            <td>{order.quantity}</td>
            <td>{order.pickupTime || '-'}</td>
            <td>{order.specialRequest || '-'}</td>
            <td>{new Date(order.createdAt).toLocaleString()}</td>
            <td>
              {!order.completed ? (
                <>
                  <button onClick={() => markComplete(order._id)}>✅ Mark Complete</button>{' '}
                  <button onClick={() => deleteOrder(order._id)}>🗑 Delete</button>
                </>
              ) : (
                <span>✅ Done</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        <br />
        <h2 style={{ marginTop: '2rem' }}>Manage Menu Items</h2>
        <MenuManager />
    </div>
  );
};

export default Admin;
