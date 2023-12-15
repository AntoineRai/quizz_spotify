# QUIZZ SPOTIFY
PROJET UNIVERSITAIRE | Création d'un blindtest avec l'utilisation de l'API Spotify en solo et multijoueur par le biais des WebSocket (socket.io)

## Installation du projet

Premièrement pour le développement, utilisez les trois commandes suivantes :

```bash
npm run dev
# and
npm run dev-server
# and
npm run dev-socket
```

Copiez le .env.example et remplacez avec vos valeurs.

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le Front.
[http://localhost:3001](http://localhost:3001) pour le serveur de la Web Socket.
[http://localhost:8888](http://localhost:8888) pour le serveur en back-end API.

Pour les routes de l'API :
- [http://localhost:8888/spotify/login](/spotify/login) pour se connecter à Spotify