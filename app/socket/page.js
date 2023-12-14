"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const App = () => {
  const [gameId, setGameId] = useState('');
  const [playersCount, setPlayersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hostGame = async () => {
      try {
        const response = await fetch('http://10.86.15.117:3000/hostGame', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('La création du jeu a échoué');
        }

        const data = await response.json();

        if (!data.gameId) {
          throw new Error('Réponse du serveur sans identifiant de jeu');
        }

        setGameId(data.gameId);

        const socket = io(`http://10.86.15.117:3000/${data.gameId}`, {
          query: {
            gameId: data.gameId,
          },
        });

        // Attacher des écouteurs avant la connexion pour s'assurer de capturer l'événement connect
        socket.on('connect', () => {
          console.log(`Connecté au jeu ${data.gameId}`);
        });

        // Écouter les événements du socket
        socket.on('updatePlayersCount', (count) => {
          setPlayersCount(count);
        });

        // Mettre à jour l'état de chargement
        setLoading(false);

        // Fonction de déconnexion du socket lors du démontage du composant
        return () => {
          socket.disconnect();
        };

      } catch (error) {
        console.error('Erreur lors de la création du jeu:', error);
        setLoading(false);
      }
    };

    // Appeler la fonction pour créer un nouveau jeu
    hostGame();
  }, []);

  const joinGameLink = gameId ? `http://10.86.15.117:3000/${gameId}` : '';

  return (
    <div>
      <h1>Vous êtes actuellement en train d'héberger</h1>
      {loading && <p>Chargement...</p>}
      {!loading && gameId && (
        <div>
          <p>Code du jeu: {gameId}</p>
          <p>Nombre de joueurs connectés: {playersCount}</p>
          <a href={joinGameLink} target="_blank" rel="noopener noreferrer">
            Rejoindre la partie
          </a>
        </div>
      )}
    </div>
  );
};

export default App;