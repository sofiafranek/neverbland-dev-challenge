import React from 'react';
import './style.scss';

const Navigation = () => {
  return (
    <nav>
      <a href="/" className="logo">
        TV Bland
      </a>
      <a href="/" className="home-icon">
        <i className="fas fa-home"></i>
      </a>
      <a href="/browse" className="search-icon">
        <i className="fas fa-search"></i>
      </a>
    </nav>
  );
};

export default Navigation;
