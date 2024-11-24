import React from 'react';
import logo from '../assets/images/logo.png';

const Logo: React.FC = () => {
  return (
    <img className="h-10 w-auto" src={logo} alt="React Jobs" />
  );
};

export default Logo;
