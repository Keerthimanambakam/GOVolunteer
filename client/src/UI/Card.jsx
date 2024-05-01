import React from "react";

export const Card = ({ name, date, Number }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          Date: {date}
        </p>
        <p className="text-gray-700 text-base">
          Number: {Number}
        </p>
        <button className="p-3 text-white font-bold bg-blue-300 hover:bg-blue-500 rounded-xl mt-6">Update</button>
        <button className="p-3 text-white font-bold font-mono bg-red-300 hover:bg-red-500 rounded-xl mt-6 ml-4">Delete</button>
      </div>
    </div>
  );
};
