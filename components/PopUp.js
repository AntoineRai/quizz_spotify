import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Popup(props) {
    const [name, setName] = useState('');

    const handleClick = () => {
        props.setTrigger(false);

        const userId = uuidv4();

        const userData = {
            name: name,
            id: userId,
        };

        const userDataString = JSON.stringify(userData);

        localStorage.setItem('user_data', userDataString);
    };

    return props.trigger ? (
        <div className='fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-amber-200 relative p-8 w-80 h-30vh flex flex-col justify-center items-center text-center rounded-lg border-4 border-black shadow-2xl'>
                {props.children}
                <input
                    type='text'
                    className='mt-4 p-2 border rounded-md w-full'
                    placeholder='Saisissez votre texte ici...'
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleClick} className='mt-4 bg-blue-500 text-white font-bold p-4 rounded-lg border-white border-4 w-72'>
                    Enregistrer
                </button>
            </div>
        </div>
    ) : null;
}
