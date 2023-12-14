import React from "react";

const Join = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-1/3 w-1/2 rounded-lg border-4 border-white bg-amber-300 gap-4">
        <div>Rentrez votre ID:</div>
        <input type="text" className="border-2 border-black rounded-md p-2" />
        <button className="bg-red-500 text-white font-bold p-4 rounded-lg border-white border-4 w-64">
          REJOINDRE
        </button>
      </div>
    </div>
  );
};

export default Join;
