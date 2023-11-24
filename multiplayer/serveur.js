const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 4000;

// Liste des joueurs connectés
let players = [];

// Gestion de la connexion d'un joueur
io.on('connection', (socket) => {
  console.log('Un joueur s\'est connecté');

  // Gestion de la déconnexion d'un joueur
  socket.on('disconnect', () => {
    console.log('Un joueur s\'est déconnecté');

    // Supprimer le joueur de la liste des joueurs connectés
    players = players.filter((player) => player.id !== socket.id);

    // Envoyer la mise à jour de la liste des joueurs connectés à tous les joueurs
    io.emit('updatePlayers', players);
  });

  // Gestion de la demande de connexion d'un joueur
  socket.on('join', (playerName) => {
    console.log(`Le joueur ${playerName} s'est connecté`);

    // Créer un objet joueur avec l'ID du socket et le nom du joueur
    const player = {
      id: socket.id,
      name: playerName,
    };

    // Ajouter le joueur à la liste des joueurs connectés
    players.push(player);

    // Envoyer la mise à jour de la liste des joueurs connectés à tous les joueurs
    io.emit('updatePlayers', players);
  });
});

// Démarrer le serveur
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
