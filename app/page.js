import Background from "../components/background";
import TrackComponent from "../components/TrackComponent";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Quizz Spotify</h1>
      <TrackComponent />
      <Background/>
    </main>
  );
}
