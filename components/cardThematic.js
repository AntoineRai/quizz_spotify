import React from 'react';

const CardThematic = ({ themeName, url }) => {
  const cardStyle = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
  };

  return (
    <div className='bg-white p-10 border-black border-2 rounded-md text-lg' style={cardStyle}>
        <p className='text-center'>{themeName}</p>
    </div>
  );
};

export default CardThematic;
