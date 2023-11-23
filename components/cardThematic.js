import React from 'react';

const CardThematic = ({ themeName, url }) => {
  return (
    <div className='bg-white p-10 border-black border-2 rounded-md text-lg bg-[url(${it})]'>
        <p className='text-center'>{themeName}</p>
    </div>
  );
};

export default CardThematic;