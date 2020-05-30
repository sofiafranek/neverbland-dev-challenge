import React from 'react';

const Navigation = () => {
  return (
    <nav>
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
