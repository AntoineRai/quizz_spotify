"use client";

import { useState, useEffect } from "react";
import Card from "../../../components/CardPlaylist";

const Page = ({ params }) => {
  const [songTitle, setSongTitle] = useState("");
  const playlistId = params.playlistId;
  const [data, setData] = useState([]);

  const handleLaunchButton = () => {
    console.log(`Lancer le titre : ${songTitle}`);
  };

  useEffect(() => {
    const getTracks = async () => {
      try {
        console.log(`http://localhost:8888/spotify/tracks/${playlistId}`);
        const response = await fetch(
          `http://localhost:8888/spotify/tracks/${playlistId}`
        );
        console.log(response.json());
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    getTracks();
  }, [playlistId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Card
        title="Code de la partie"
        content={`Code pour l'ID Spotify : ${playlistId}`}
      />
      <Card title="Score" content="Score à afficher" />
      //TODO : Afficher le JSON ici
      {data}
      <input
        type="text"
        placeholder="Saisie titre de la chanson ici !"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleLaunchButton}
        className="mt-2 p-2 bg-green-500 text-white rounded"
      >
        ♬ Lancer le premier titre ♬
      </button>
    </div>
  );
};

export default Page;
