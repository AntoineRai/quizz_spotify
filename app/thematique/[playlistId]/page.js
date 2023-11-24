"use client";
  import { useState, useEffect } from "react";
  import Card from "../../../components/CardPlaylist";

  const Page = ({ params }) => {
    const [songTitle, setSongTitle] = useState("");
    const playlistId = params.playlistId;
    const [data, setData] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [trackCount, setTrackCount] = useState(0);
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
          setTrackCount(result.trackCount)
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
            <Card title="Code de la partie" content={`Code pour l'ID Spotify : ${playlistId}`} />
            <button
              onClick={handleStartButton}
              className="mt-2 p-2 bg-green-500 text-white rounded"
            >
              Commencer le quizz
            </button>
          </div>
        )}

        {isPlaying && !showInfo && (
          <div>
            <Card title="Score" content={`Score : ${score}`} />
            <p>Musique {currentTrackIndex+1} sur {trackCount}</p>
            <audio
              src={data[currentTrackIndex]?.preview_url}
              controls
              autoPlay
              onEnded={handleUserResponse}
              onClick={(e) => e.preventDefault()}
              style={{ pointerEvents: "none" }}
            />
            <input
              type="text"
              placeholder="Saisie titre de la chanson ici !"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="mt-4 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleUserResponse}
              className="mt-2 p-2 bg-green-500 text-white rounded"
            >
              ♬ Continuer ♬
            </button>

            <button
              onClick={handleFinishButton}
              className="mt-2 p-2 bg-red-500 text-white rounded"
            >
              Finir la partie
            </button>
          </div>
        )}

        {showInfo && (
          <div>
            <img src={data[currentTrackIndex]?.imageUrl} alt="Track Image" />
            <p>{data[currentTrackIndex]?.title} - {data[currentTrackIndex]?.author}</p>
            <p>Score : {score}</p>
            {isFalse && (
              <p className="text-red-500">Mauvaise réponse! {correctAnswer ? `La réponse correcte était ${correctAnswer}` : ''}</p>
            )}
            {!isFalse && (
              <p className="text-green-500">Bonne réponse!</p>
            )}
          </div>
        )}
      </div>
    );
  };

  export default Page;
