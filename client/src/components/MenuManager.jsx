import React, { useState, useEffect } from 'react';

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    fetch('http://localhost:5050/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Failed to load menu:', err));
  };

  const handleAdd = async () => {
    if (!newItem.trim()) return;

    try {
      const res = await fetch('http://localhost:5050/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newItem.trim() })
      });

      if (res.ok) {
        setNewItem('');
        fetchMenu(); // reload updated menu
      } else {
        console.error('Failed to add item');
      }
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5050/api/menu/${id}`, {
        method: 'DELETE',
      });
      fetchMenu(); // refresh list
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // prevent form from refreshing
          handleAdd();
        }}
      >
        <input
          type="text"
          value={newItem}
          placeholder="New menu item"
          onChange={(e) => setNewItem(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit">➕ Add</button>
      </form>
  
      <ul style={{ marginTop: '1rem' }}>
        {menuItems.map(item => (
          <li key={item._id} style={{ marginBottom: '0.5rem' }}>
            {item.name}{' '}
            <button onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default MenuManager;
