"use client";
import { useState, useEffect } from "react";

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

  const handleAdd = async () => {
    try {
      if (!formData.nom || !formData.url || !formData.spotifyID) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      const response = await fetch("http://localhost:8888/thematic/add_thematic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: formData.nom,
          url: formData.url,
          idThematic: formData.spotifyID,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          nom: "",
          url: "",
          spotifyID: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la thématique :", error);
    }
  };

  return (
    <div>
      <div className="m-4">
        <h2 className="font-bold text-xl text-center">Page d'administration</h2>
      </div>
      <div className="flex mt-8">
        <div className="w-1/4">
          <h2 className="text-center font-bold	">Les thématiques</h2>
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
              <h2 className="text-center font-bold">Votre thème:</h2>
              <h2>
                <u>Le nom:</u> {selectedTheme.nom}
              </h2>
              <img
                src={selectedTheme.url}
                alt={selectedTheme.nom}
                className="max-w-400 h-auto"
              />
              <p>
                <u>ID Spotify</u> {selectedTheme.idThematic}
              </p>
              <p>
                <u>ID Mongo:</u> {selectedTheme._id}
              </p>

              <button
                className="bg-blue-500 text-white px-2 py-1 m-2 rounded-lg"
                onClick={handleModify}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 m-2 rounded-lg"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
        <div className="w-1/4">
          <div className="flex flex-col items-center mt-4">
            <h2 className="font-bold">Ajouter un nouveau thème </h2>
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
            <button
              className="bg-green-500 text-white px-2 py-1 m-2 rounded-lg"
              onClick={handleAdd}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thematics;
