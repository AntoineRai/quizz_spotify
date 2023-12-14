const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:3000' }));

app.options('*', cors());

const games = {};

app.post('/hostGame', (req, res) => {
  const gameId = generateGameId();
  const gameNamespace = io.of(`/${gameId}`);

  games[gameId] = {
    players: [],
  };

  console.log(`Nouvelle partie créée avec l'ID: ${gameId}`);
  res.json({ gameId });
});

app.get('/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  res.send(`Vous avez rejoint la partie ${gameId}`);
});

function generateGameId() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

server.listen(PORT, '10.86.15.117', () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

io.on('connection', (socket) => {
  const gameId = socket.nsp.name.slice(1);
  const game = games[gameId];

  const requestedGameId = socket.handshake.query.gameId;
  console.log(`Demande de connexion avec gameId: ${requestedGameId}, attendu gameId: ${gameId}`);

  if (gameId !== requestedGameId) {
    console.log(`Tentative de connexion invalide pour le jeu ${requestedGameId}`);
    socket.disconnect(true);
    return;
  }

  console.log(`Nouvelle connexion au jeu ${gameId}:`, socket.id);

  game.players.push(socket.id);
  console.log(`Nombre de personnes connectées au jeu ${gameId}: ${game.players.length}`);

  socket.on('disconnect', () => {
    const index = game.players.indexOf(socket.id);
    if (index !== -1) {
      game.players.splice(index, 1);
      console.log(`Déconnexion de ${socket.id} du jeu ${gameId}`);
      console.log(`Nombre de personnes connectées au jeu ${gameId}: ${game.players.length}`);
    }
  });
});
