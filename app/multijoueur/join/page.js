"use client";

import React, { useState } from "react";
import io from "socket.io-client";

const Join = () => {
  const [gameId, setGameId] = useState("");
  let name;

  const joinGame = () => {
    let user_data = localStorage.getItem("user_data");
    if (user_data !== null) {
      user_data = JSON.parse(user_data);
      name = user_data.name;
    }
    const socket = io("http://localhost:3001");
    socket.emit("joinGame", { name, gameId });

    socket.on("gameJoined", (game) => {
      console.log("Vous avez rejoint la partie:", game);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-1/3 w-1/2 rounded-lg border-4 border-white bg-amber-300 gap-4">
        <div>Rentrez votre ID:</div>
        <input
          type="text"
          className="border-2 border-black rounded-md p-2"
          onChange={(e) => setGameId(e.target.value)}
        />
        <button
          className="bg-red-500 text-white font-bold p-4 rounded-lg border-white border-4 w-64"
          onClick={joinGame}
        >
          REJOINDRE
        </button>
      </div>
    </div>
  );
};

export default Join;
