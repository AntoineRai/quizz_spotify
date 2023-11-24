import React from "react";

const CardThematic = ({ themeName, url }) => {
  const cardStyle = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
  };

  return (
    <div
      className="bg-white p-10 border-white border-4 rounded-md text-lg transition-all duration-500 ease-in-out hover:p-12"
      style={cardStyle}
    >
      <p className="text-center text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {themeName}
      </p>
    </div>
  );
};

export default CardThematic;
