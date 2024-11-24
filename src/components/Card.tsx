import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode; 
  bg?: string;         
}

const Card: React.FC<CardProps> = ({ children, bg = 'bg-gray-100' }) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md`}>
      {children}
    </div>
  );
};

export default Card;
