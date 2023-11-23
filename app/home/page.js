import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
const Home = () => {
  return (
    <div className="relative">
        <div className="flex flex-col items-center justify-center h-screen">
            <Link href="/choice-theme">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 border-white border-4 w-72">
                    COMMENCER UNE PARTIE !
                </button>
            </Link>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded mb-4 border-white border-4 w-72">
                REJOINDRE UN AMI
            </button>
        </div>

        <Link href="/cms-thematic">
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded border-white border-4  flex items-center justify-center absolute top-0 right-0 m-4">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
            </button>
        </Link>
    </div>
  );
}

export default Home;
