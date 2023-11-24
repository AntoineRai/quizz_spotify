"use client";
import { useState, useEffect } from "react";
// Import nécessaire pour les styles du formulaire
import 'react-confirm-alert/src/react-confirm-alert.css';

const Thematics = () => {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    url: "",
    spotifyID: "",
  });

  useEffect(() => {
    const fetchThematics = async () => {
      try {
        const response = await fetch("http://localhost:8888/getThematics");
        const data = await response.json();
        setThemes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchThematics();
  }, []);

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleModify = () => {
    // Ajoutez ici la logique pour la modification du thème avec formData
    console.log("Modifier :", formData);
  };

  const handleDelete = () => {
    // Ajoutez ici la logique pour la suppression du thème
    console.log("Supprimer :", selectedTheme);
  };

  const handleAdd = () => {
    // Ajoutez ici la logique pour l'ajout d'un nouveau thème avec formData
    console.log("Ajouter :", formData);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <h2 className="text-center">Les thématiques</h2>
        <ul>
          {themes.map((theme) => (
            <li key={theme._id} onClick={() => handleThemeClick(theme)}>
              {theme.nom}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/4">
        {selectedTheme && (
          <div className="flex flex-col items-center">
            <h2>{selectedTheme.nom}</h2>
            <img src={selectedTheme.url} alt={selectedTheme.nom} />
            <p>ID: {selectedTheme.idThematic}</p>

            <button className="bg-blue-500 text-white px-2 py-1 m-2" onClick={handleModify}>
              Modifier
            </button>
            <button className="bg-red-500 text-white px-2 py-1 m-2" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        )}
        </div>
        <div className="w-1/4">
          <div className="flex flex-col items-center mt-4">
            <h2>Ajouter un nouveau thème</h2>
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="m-2 p-2"
            />
            <input
              type="text"
              name="url"
              placeholder="URL de l'image"
              value={formData.url}
              onChange={handleChange}
              className="m-2 p-2"
            />
            <input
              type="text"
              name="spotifyID"
              placeholder="ID Spotify"
              value={formData.spotifyID}
              onChange={handleChange}
              className="m-2 p-2"
            />
            <button className="bg-green-500 text-white px-2 py-1 m-2" onClick={handleAdd}>
              Ajouter
            </button>
          </div>
          
      </div>
    </div>
  );
};

export default Thematics;
