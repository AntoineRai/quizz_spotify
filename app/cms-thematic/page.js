import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const themes = ['Pop', 'Rock', 'Jazz', 'Hip Hop', 'Classique', 'Country'];

const CmsThematic = () => {

  return (
    <div className="flex justify-center items-center bg-gray-100 h-5/6">
      <div className="flex flex-col items-center mr-8 bg-gray-100 border-gray-900 border-4 h-full">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="cursor-pointer p-2 border-gray-500 border-2 w-40 text-center"
            //onClick={() => handleThemeClick(theme)}
          >
            {theme}
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-8 rounded-md border-gray-900 border-4 h-full">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
          //onClick={() => setSelectedTheme(null)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </button>


        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            //onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            //onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-400 text-white font-bold py-2 px-4 rounded"
            //onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      <button className="bg-blue-200 text-white font-bold py-2 px-4 rounded mt-4">
        New Theme
      </button>
    </div>
  );
};

export default CmsThematic;
