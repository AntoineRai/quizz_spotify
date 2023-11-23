import React from 'react';
import CardThematic from '../../components/cardThematic';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const themes = [
  'Pop',
  'Rock',
  'Jazz',
  'Hip Hop',
  'Classique',
  'Country',
];

const ChoiceTheme = () => {
  return (
    <div>
        <div className="text-center py-4 bg-blue-500 border-4 border-4 border-white w-96 mx-auto mt-8">
            <h3 className="text-white text-4xl">Choisissez votre thématique</h3>
        </div>
        <div className="flex justify-center items-center h-80">
            <div className="grid grid-cols-3 gap-4">
                {themes.map((theme, index) => (
                <CardThematic key={index} themeName={theme} />
                ))}
            </div>
        </div>

        <div className="fixed bottom-0 left-0 m-4">
            <Link href="/home">
                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full flex items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                </button>
            </Link>
        </div>
    </div>
  );
}

export default ChoiceTheme;
