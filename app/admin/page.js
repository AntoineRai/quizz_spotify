"use client";
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const themes = [
  "Pop",
  "Rock",
  "Jazz",
  "Hip Hop",
  "Classique",
  "Country",
  "Blues",
  "Rap",
  "Reggae",
  "Metal",
  "Funk",
];

const CmsThematic = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themeName, setThemeName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [spotifyId, setSpotifyId] = useState("");

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
  };

  const handleSave = () => {
    if (!selectedTheme) {
      alert("Veuillez sélectionner un thème avant de supprimer.");
      return;
    }
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir enregistrer les modifications ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => {
            console.log("Save:", selectedTheme);
          },
        },
        {
          label: "Non",
          onClick: () => {},
        },
      ],
    });
  };

  const handleDelete = () => {
    if (!selectedTheme) {
      alert("Veuillez sélectionner un thème avant de supprimer.");
      return;
    }
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer cette thématique ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => {
            console.log("Delete:", selectedTheme);
            setSelectedTheme(null);
          },
        },
        {
          label: "Non",
          onClick: () => {},
        },
      ],
    });
  };

  const handleCancel = () => {
    if (!selectedTheme) {
      alert("Veuillez sélectionner un thème avant de supprimer.");
      return;
    }
    setSelectedTheme(null);
  };
  const handleNewTheme = () => {
    setThemeName("");
    setImageUrl("");
    setSpotifyId("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full m-10">
      <div className={`flex flex-grow w-full`}>
        <div
          className={`flex flex-col items-center w-1/3 p-4 border-gray-900 ${
            themes.length > 6 ? "overflow-auto" : ""
          }`}
        >
          {themes.map((theme, index) => (
            <button
              key={index}
              className={`p-2 border-gray-500 border-2 w-40 text-center cursor-pointer ${
                selectedTheme === theme ? "bg-orange-300" : ""
              }`}
              onClick={() => handleThemeClick(theme)}
            >
              {theme}
            </button>
          ))}
        </div>

        <div className="flex flex-col flex-grow p-8 bg-gray-100 border-gray-900 border-4">
          <div className="flex flex-col h-full">
            <div className="flex text-left items-center h-1/3">
              {selectedTheme && (
                <p className="text-xl">
                  Nom de la Thématique :{" "}
                  <input
                    type="text"
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="bg-gray-100 text-xl border-none outline-none"
                  />
                </p>
              )}
            </div>
            <div className="flex text-left items-center h-1/3">
              {selectedTheme && (
                <p className="text-xl">
                  Url de l'image :
                  <input
                    type="text"
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="bg-gray-100 text-xl border-none outline-none"
                  />{" "}
                </p>
              )}
            </div>
            <div className="flex text-left items-center h-1/3">
              {selectedTheme && (
                <p className="text-xl">
                  Id Spotify :{" "}
                  <input
                    type="text"
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="bg-gray-100 text-xl border-none outline-none"
                  />
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-4 justify-between items-center">
            <button
              className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="flex-1 bg-gray-400 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3 p-4">
        <button
          className="bg-blue-200 text-white font-bold py-2 px-4 rounded"
          onClick={handleNewTheme}
        >
          Nouvelle Thématique
        </button>
      </div>
    </div>
  );
};

export default CmsThematic;
