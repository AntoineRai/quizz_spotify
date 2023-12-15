"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";


const Home = () => {
  const [gameId, setGameId] = useState("");
  const [requestedGameId, setRequestedGameId] = useState("");
  const [name, setName] = useState("");

  const handleJoin = () => {
    socket.emit("joinGame", requestedGameId, name);
  };

  useEffect(() => {
    const socket = io("http://localhost:3001");

    let user_data = localStorage.getItem("user_data");
    if (user_data !== null) {
      user_data = JSON.parse(user_data);
    }

    if (user_data.name) {
      console.log("Les données utilisateur sont valides.");

      //TEST DE CREATION DE PARTIE
      socket.emit("createGame", user_data.name);
      setName(user_data.name)

      socket.on("gameCreated", (newGame) => {
        console.log("Nouveau jeu créé:", newGame);

        let gameId = newGame.id;
        setGameId(gameId);

        //TEST POUR REJOINDRE LA PARTIE
        socket.emit("joinGame", gameId, user_data.name);
      });
    } else {
      console.error("Les données utilisateur ne sont pas valides.");
    }

    socket.on("gameJoined", (joinedGame) => {
      console.log("Vous avez rejoint la partie :", joinedGame);
    });

    socket.on("playerJoined", (playerData) => {
      console.log(`Nouveau joueur rejoint : ${playerData.playerName}`);
    });

    socket.on("gameNotFound", (error) => {
      console.error("Erreur :", error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Socket</p>
      <p>{gameId}</p>
    </div>
  );
};

export default Home;