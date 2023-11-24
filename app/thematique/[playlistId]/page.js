"use client";
import { useState, useEffect } from "react";
import Card from "../../../components/CardPlaylist";
import HomeArrow from "../../../components/HomeArrow";

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
    const [isFinish, setIsFinish] = useState(false);
    const [userGuess, setUserGuess] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");

    const handleStartButton = () => {
      setCurrentTrackIndex(0);
      setIsPlaying(true);
      setScore(0);
    };

    const handleUserResponse = () => {
      const currentTitle = data[currentTrackIndex]?.title;
      
      const formattedSongTitle = songTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      
      if (formattedSongTitle === currentTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
        setScore(score + 1);
        setIsFalse(false);
      } else {
        setIsFalse(true);
        setUserGuess(formattedSongTitle);
      }

      setSongTitle("");
      setShowInfo(true);
      setTimeout(() => {
        setCurrentTrackIndex(currentTrackIndex + 1);
        setShowInfo(false);
      }, 5000);
      if (currentTrackIndex+1 === trackCount) {
        setIsFinish(true);
      } else {
        setIsFinish(false);
      }
    };

    const handleFinishButton = () => {
      setIsFinish(true);
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
      <div className="flex flex-col items-center justify-center h-screen">
        {!isPlaying && !showInfo && !isFinish && (
          <div>
            <button
              onClick={handleStartButton}
              className="p-4 bg-green-500 text-white rounded-lg"
            >
              Commencer le quizz
            </button>
          </div>
        )}

        {isPlaying && !showInfo && !isFinish && (
          <div className="flex flex-col items-center justify-center gap-4">
            <Card title="Score" content={`Score : ${score}`} />
            <p>Musique {currentTrackIndex+1} sur {trackCount}</p>
            <audio
              src={data[currentTrackIndex]?.preview_url}
              controls
              autoPlay
              onEnded={handleUserResponse}
              onClick={(e) => e.preventDefault()}
              style={{ pointerEvents: "none" }}
              className="w-64"
            />
            <input
              type="text"
              placeholder="Saisie titre de la chanson ici !"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="mt-4 p-2 border border-gray-300 rounded-lg w-64"
            />
            <button
              onClick={handleUserResponse}
              className="p-2 bg-green-500 text-white rounded-lg w-56"
            >
              ♬ Continuer ♬
            </button>

            <button
              onClick={handleFinishButton}
              className="p-2 bg-red-500 text-white rounded-lg w-56"
            >
              Finir la partie
            </button>
          </div>
        )}

        {showInfo && !isFinish && (
          <div className="flex flex-col items-center justify-center">
            <img src={data[currentTrackIndex]?.imageUrl} alt="Track Image" className="w-64 h-auto"/>
            <p>{data[currentTrackIndex]?.title} - {data[currentTrackIndex]?.author}</p>
            <p>Score : {score}</p>
            {isFalse && (
              <p className="text-red-500 font-bold">Mauvaise réponse! {correctAnswer ? `La réponse correcte était ${correctAnswer}` : ''}</p>
            )}
            {!isFalse && (
              <p className="text-green-500 font-bold">Bonne réponse!</p>
            )}
          </div>
        )}
        {isFinish && (
          <div>
            <p className="text-green-500">Fin de la partie, Bien joué !</p>
            <p>Score : {score} sur {trackCount}</p>
          </div>
        )}
        <HomeArrow />
      </div>
    );
  };

  export default Page;
