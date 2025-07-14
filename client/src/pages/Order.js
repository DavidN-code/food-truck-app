import React, { useState } from "react";

function Order() {
  const [name, setName] = useState("");
  const [item, setItem] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">🛒 Place an Order</h1>
        
        {submitted ? (
          <div className="text-green-700 font-semibold">
            ✅ Thank you, {name}! Your order for <span className="italic">{item}</span> has been received.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">What would you like?</label>
              <input
                type="text"
                placeholder="e.g. Burgzilla"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition"
            >
              Submit Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Order;
