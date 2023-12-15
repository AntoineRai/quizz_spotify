const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));

app.options("*", cors());

const games = {};

function generateGameId() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`Connexion entrante`);

  socket.on("createGame", (name) => {
    const gameId = generateGameId();
    const owner = name;
    const newGame = {
      id: gameId,
      owner: owner,
      players: [],
    };

    games[gameId] = newGame;

    socket.emit("gameCreated", newGame);

    console.log(`Nouveau jeu créé :`, newGame);
  });

  socket.on("joinGame", (id, name) => {
    const gameToJoin = games[id];

    if (gameToJoin) {
      gameToJoin.players.push({ name: name });

      socket.emit("gameJoined", gameToJoin);

      console.log(`Le joueur ${name} a rejoint la partie ${id}`);
    } else {
      socket.emit("gameNotFound", { message: "Partie non trouvée" });
    }
  });
});