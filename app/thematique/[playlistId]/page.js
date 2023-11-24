"use client";
import { useState, useEffect } from "react";
import Card from "../../../components/CardPlaylist";

const Page = ({ params }) => {
  const [songTitle, setSongTitle] = useState("");
  const playlistId = params.playlistId;
  const [data, setData] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFalse, setIsFalse] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleStartButton = () => {
    setCurrentTrackIndex(0);
    setIsPlaying(true);
    setScore(0);
  };

  const handleUserResponse = () => {
    const currentTitle = data[currentTrackIndex]?.title;

    if (songTitle === currentTitle) {
      setScore(score + 1);
      setIsFalse(false);
    } else {
      setIsFalse(true);
      setUserGuess(songTitle);
    }

    setSongTitle("");

    setShowInfo(true);
    setTimeout(() => {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setShowInfo(false);
    }, 5000);
  };

  const handleFinishButton = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const getTracks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8888/spotify/tracks/${playlistId}`
        );
        const result = await response.json();
        setData(result.tracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    getTracks();
  }, [playlistId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {!isPlaying && !showInfo && (
        <div>
          <button
            onClick={handleStartButton}
            className="p-4 bg-green-500 text-white rounded-lg transition-all duration-500 ease-in-out hover:p-6 hover:text-xl hover:font-bold"
          >
            Commencer le quizz
          </button>
        </div>
      )}

      {isPlaying && !showInfo && (
        <div className="flex flex-col items-center justify-center gap-4">
          <Card title="Score" content={`Score : ${score}`} />
          <audio
            src={data[currentTrackIndex]?.preview_url}
            controls
            autoPlay
            onEnded={handleUserResponse}
            onClick={(e) => e.preventDefault()}
            style={{ pointerEvents: "none" }}
            className="w-96"
          />
          <input
            type="text"
            placeholder="Saisie titre de la chanson ici !"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            className="mt-4 p-2 border border-gray-300 rounded-lg w-96"
          />
          <button
            onClick={handleUserResponse}
            className="mt-2 p-2 bg-green-500 text-white rounded-lg w-64"
          >
            ♬ Continuer ♬
          </button>
          <button
            onClick={handleFinishButton}
            className="mt-2 p-2 bg-red-500 text-white rounded-lg w-64"
          >
            Finir la partie
          </button>
        </div>
      )}

      {showInfo && (
        <div className="flex flex-col justify-center items-center">
          <img
            src={data[currentTrackIndex]?.imageUrl}
            alt="Track Image"
            className="w-96 h-auto"
          />
          <p>
            {data[currentTrackIndex]?.title} - {data[currentTrackIndex]?.author}
          </p>
          <p>Score : {score}</p>
          {isFalse && (
            <p className="text-red-500">
              Mauvaise réponse!{" "}
              {correctAnswer
                ? `La réponse correcte était ${correctAnswer}`
                : ""}
            </p>
          )}
          {!isFalse && <p className="text-green-500">Bonne réponse!</p>}
        </div>
      )}
    </div>
  );
};

export default Page;