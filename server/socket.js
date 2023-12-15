//Imports
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

//Création du serveur
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//Port d'écoute
const PORT = process.env.PORT || 3001;

//Définition du CORS
app.options("*", cors());

//Initialisation des parties
const games = [];

//Génération aléatoire de l'ID de la partie
const generateGameId = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

//Connexion au serveur
server.listen(PORT, '10.86.15.117', () => {
  console.log(`Serveur en écoute sur le port http://10.86.15.117:${PORT}`);
});

//Gestion des connexions
io.on("connection", (socket) => {
  //Affichage dans la console
  console.log("Connexion entrante");

  socket.on("createGame", (name) => {
    //Génération de l'ID de la partie
    const gameId = generateGameId();
    const owner = name;
    const newGame = {
      id: gameId,
      owner: owner,
      players: [{ name: name }],
    };

    //Ajout de la partie dans la liste des parties
    games[games.length] = newGame;

    //Envoi de la partie au client
    socket.emit("gameCreated", newGame);

    //Affichage dans la console
    console.log(`Nouveau jeu créé :`, newGame);
  });

  socket.on("joinGame", (data) => {
    let name = data.name;
    let id = data.gameId;

    const gameToJoin = games.find((game) => game.id === data.gameId);

    if (gameToJoin) {
      gameToJoin.players.push({ name: name });

      socket.emit("gameJoined", gameToJoin);

      console.log(`Le joueur ${name} a rejoint la partie ${id}`);
    } else {
      console.log("Partie non trouvée");
    }
  });
});
