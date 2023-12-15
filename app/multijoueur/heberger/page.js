"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import Link from "next/link";
import CardThematic from "../../../components/CardThematic";
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const Home = () => {
  const [gameId, setGameId] = useState(null);
  const [game, setGame] = useState(null);
  const [themes, setThemes] = useState([]);
  const [chosenTheme, setChosenTheme] = useState(null);
  let name;

  const handleClickThematic = (e) => {
    setChosenTheme(e.target.textContent);
    console.log(e.target.textContent)
  };

  useEffect(() => {
    const fetchThematics = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/thematic/get_thematic"
        );
        const data = await response.json();
        setThemes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchThematics();
  }, []);

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

    socket.on("updateGame", (game) => {
      console.log("Vous avez rejoint la partie:", game);
      setGame(game);
    });
  };

  // Affiche la liste des joueurs dans la partie
  const renderPlayersList = () => {
    if (game && game.players && game.players.length > 0) {
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="py-4">Liste des joueurs :</p>
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
      {!chosenTheme && (
        <div className="grid grid-cols-4 gap-4">
          {themes.map((theme) => (
            <div key={theme._id} onClick={handleClickThematic}>
              <CardThematic themeName={theme.nom} url={theme.url} />
            </div>
          ))}
        </div>
      )}

      {chosenTheme && !gameId && (
        <button
          className="bg-blue-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72"
          onClick={createGame}
        >
          Créer une partie
        </button>
      )}

      {chosenTheme && gameId && (
          <div>
            <span className="mr-3">Votre ID de Game : {gameId}</span>
            <CopyToClipboard text={gameId}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Copy</button>
            </CopyToClipboard>
            {renderPlayersList()}
          </div>
      )}
    </div>
  );
};

export default Home;
