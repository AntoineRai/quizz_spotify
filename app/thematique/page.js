"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CardThematic from "../../components/CardThematic";
import HomeArrow from "../../components/HomeArrow";

const Thematique = () => {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchThematics = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/thematic/get_thematic"
        );
        const data = await response.json();
        setThemes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchThematics();
  }, []);

  return (
    <div>
      <div className="text-center py-4 bg-blue-500 w-96 mx-auto mt-8 rounded-lg">
        <h3 className="text-white text-4xl">Choisissez votre thématique</h3>
      </div>
      <div className="flex justify-center items-center h-80">
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <Link href="/thematique/[id]" as={`/thematique/${theme.idThematic}`}>
              <CardThematic
                key={theme._id}
                themeName={theme.nom}
                url={theme.url}
              />
            </Link>
          ))}
        </div>
      </div>
      <HomeArrow />
    </div>
  );
};

export default Thematique;
