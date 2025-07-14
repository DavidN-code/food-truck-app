import React from "react";

const menuItems = [
  { name: "Burgzilla", price: "$9.99" },
  { name: "Taco Titan", price: "$8.50" },
  { name: "Fries Inferno", price: "$3.50" }
];

function Menu() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-700">🚚 Food Truck Menu</h1>
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index} className="text-lg text-gray-800">
              <span className="font-semibold">{item.name}</span> – {item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
