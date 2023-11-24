import React from "react";

const CardThematic = ({ themeName, url }) => {
  const cardStyle = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
  };

  return (
    <div
      className="bg-white p-10 border-black border-2 rounded-md text-lg"
      style={cardStyle}
    >
      <p className="text-center text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {themeName}
      </p>
    </div>
  );
};

export default CardThematic;
