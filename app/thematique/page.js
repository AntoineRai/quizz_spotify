import React from "react";
import CardThematic from "../../components/cardThematic";

const themes = ["Pop", "Rock", "Jazz", "Hip Hop", "Classique", "Country"];

const Thematique = () => {
  return (
    <div>
      <div className="text-center py-4 bg-blue-500 border-4 border-white w-96 mx-auto mt-8">
        <h3 className="text-white text-4xl">Choisissez votre thématique</h3>
      </div>
      <div className="flex justify-center items-center h-80">
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme, url, index) => (
            <CardThematic key={index} themeName={theme} url={url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Thematique;
