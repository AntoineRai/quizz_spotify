"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

const Home = () => {
  const [gameId, setGameId] = useState(null);
  const [game, setGame] = useState(null);
  let name;

  const createGame = () => {
    let user_data = localStorage.getItem("user_data");
    if (user_data !== null) {
      user_data = JSON.parse(user_data);
      name = user_data.name;
    }
    const socket = io("http://10.86.12.179:3001");
    socket.emit("createGame", name);

    socket.on("gameCreated", (newGame) => {
      console.log("Nouveau jeu créé:", newGame);

      setGame(newGame);
      setGameId(newGame.id);
    });

    socket.on("gameJoined", (game) => {
      console.log("Vous avez rejoint la partie:", game);
      setGame(game);
    });
  };

  // Affiche la liste des joueurs dans la partie
  const renderPlayersList = () => {
    if (game && game.players && game.players.length > 0) {
      return (
        <div>
          <p>Liste des joueurs :</p>
          <ul>
            {game.players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
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
        <div>
          <p>Votre ID de Game : {gameId}</p>
          {renderPlayersList()}
        </div>
      )}
    </div>
  );
};

export default Home;
