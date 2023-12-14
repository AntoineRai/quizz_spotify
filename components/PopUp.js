import React, {useState} from 'react';

export default function Popup(props) {
    const [name,setName] = useState('');

    const handleClick = () => {
        props.setTrigger(false);
        localStorage.setItem('quizz_name', name);
    }

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
                <button onClick={handleClick} className='mt-4 bg-blue-500 hover:bg-blue-700 text-white border-white border-4 font-bold py-2 px-4 rounded'>Enregistrer</button>
            </div>
        </div>
    ) : null;
}
