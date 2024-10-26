import React from "react";

const Annoucement = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Announcement</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Emphasize Smiles and Kindness with Guests</li>
        <li>Strict Hygiene Practices</li>
        <li>Emergency Response Training</li>
        <li>A scheduled fire drill will take place tomorrow at 10:00 AM</li>
      </ul>
    </div>
  );
};

export default Annoucement;
