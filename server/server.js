const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Serveur du blindtest en ligne');
});

io.on('connection', (socket) => {
  console.log('Nouvelle connexion :', socket.id);
});

server.listen(PORT, '10.86.15.117', () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
