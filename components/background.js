import React from 'react';

const Background = ({ children }) => {
  return (
    <div className='bg-amber-100 min-h-screen'>
      {children}
    </div>
  );
};

export default Background;