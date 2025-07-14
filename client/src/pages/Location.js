import React from "react";

function Location() {
  const lat = 41.139981;
  const lng = -104.820246;
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">📍 Truck Location</h1>
        <iframe
          title="Food Truck Location"
          src={mapUrl}
          width="100%"
          height="300"
          className="rounded border border-gray-300"
          loading="lazy"
          allowFullScreen
        ></iframe>
        <p className="mt-4 text-sm text-gray-600">
          This is our current parking spot in Cheyenne, WY.
        </p>
      </div>
    </div>
  );
}

export default Location;
