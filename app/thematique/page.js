"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CardThematic from "../../components/CardThematic";
import HomeArrow from "../../components/HomeArrow";
import Header from "../../components/Header";

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
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center p-4 bg-red-500 w-96 border-white border-4 rounded-lg max-h-full my-10">
        <h3 className="text-white text-xl font-bold ">CHOISSISSEZ VOTRE THEMATIQUE</h3>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 gap-4">
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
