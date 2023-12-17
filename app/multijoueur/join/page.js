"use client";

import React, { useState } from "react";
import io from "socket.io-client";

const Join = () => {
  const [gameId, setGameId] = useState("");
  const [game, setGame] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  let name;

  const joinGame = () => {
    let user_data = localStorage.getItem("user_data");
    if (user_data !== null) {
      user_data = JSON.parse(user_data);
      name = user_data.name;
    }
    const socket = io("http://192.168.0.25:3001");
    socket.emit("joinGame", { name, gameId });

    socket.on("updateGame", (game) => {
      console.log("Vous avez rejoint la partie:", game);
      setGame(game);
      setIsJoined(!isJoined);
    });

    socket.on("clientStartGame", (game) => {
      window.location.href = `/thematique/${game.idTheme}/multi`;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {isJoined ? (
        <div className="flex flex-col items-center justify-center">
          <p>Vous avez rejoint la partie {game.id}</p>
          {game.players.map((player, key) => (
            <p key={key}>{player.name}</p>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p>Vous n'avez pas encore rejoint de partie</p>
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
      )}
    </div>
  );
};

export default Join;
