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
server.listen(PORT,'192.168.0.25', () => {
  console.log(`Serveur en écoute sur le port http://192.168.0.25:${PORT}`);
});

// Gestion des connexions
io.on("connection", (socket) => {
  // Affichage dans la console
  console.log("Connexion entrante: " + socket);

  // Création d'une partie
  socket.on("createGame", (data) => {
    // Génération de l'ID de la partie
    const gameId = generateGameId();
    console.log(data)
    const owner = data.name;
    const newGame = {
      id: gameId,
      owner: owner,
      players: [],
      nomTheme: data.chosenTheme.nom,
      idTheme: data.chosenTheme.idThematic,
      isGameStarted: false,
    };

    // Ajout de la partie dans la liste des parties
    games.push(newGame);

    // Envoi de la partie au client
    socket.emit("gameCreated", newGame);

    // Rejoindre la room de la partie
    socket.join(gameId);

    // Affichage dans la console
    console.log(`Nouveau jeu créé :`, newGame);
  });

  // Rejoindre une partie
  socket.on("joinGame", (data) => {
    console.log(data)
    let name = data.name;
    let id = data.gameId;
    console.log(games)

    // Recherche de la partie
    const gameToJoin = games.find((game) => game.id === data.gameId);

    // Si la partie est trouvée
    if (gameToJoin) {
      // Ajout du joueur dans la partie
      gameToJoin.players.push({ id: socket.id, name: name });

      // Rejoindre la room de la partie
      socket.join(id);

      // Envoi de la partie aux autres joueurs
      io.to(id).emit("updateGame", gameToJoin);

      // Envoi de la partie au client
      socket.emit("updateGame", gameToJoin);

      // Affichage dans la console
      console.log(`Le joueur ${name} a rejoint la partie ${id}`);
    } else {
      // Affichage dans la console
      console.log("Partie non trouvée");
    }
  });

  // Lancement de partie
  socket.on("startGame", (data) => {
    console.log("2")
    console.log('Partie lancée')
    console.log(data)
    console.log(data.gameId)
    console.log(data.themeName)
    const game = games.find((game) => game.id === data.gameId);
    if (game) {
      game.isGameStarted = true;
      game.theme = data.themeName;
      console.log("3")
      console.log(game)
      io.to(data.gameId).emit("clientStartGame", game);
    }
  });
});
