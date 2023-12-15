"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

const Home = () => {
  const [gameId, setGameId] = useState(null);
  let name;

  const createGame = () => {
    let user_data = localStorage.getItem("user_data");
    if (user_data !== null) {
      user_data = JSON.parse(user_data);
      name = user_data.name;
    }
    const socket = io("http://10.86.15.117:3001");
    socket.emit("createGame", name);

    socket.on("gameCreated", (newGame) => {
      console.log("Nouveau jeu créé:", newGame);

      // Stocker l'ID de la partie dans la variable d'état
      setGameId(newGame.id);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {!gameId ? (
        <button
          className="bg-blue-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72"
          onClick={createGame}
        >
          Créer une partie
        </button>
      ) : (
        <p>Votre ID de Game : {gameId}</p>
      )}
    </div>
  );
};

export default Home;