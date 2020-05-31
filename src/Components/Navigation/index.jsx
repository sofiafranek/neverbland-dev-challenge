import React from 'react';
import './style.scss';

const Navigation = () => {
  return (
    <nav>
      <a href="/" className="logo hvr-float">
        TV Bland
      </a>
      <a href="/browse" className="search-icon hvr-float">
        <i className="fas fa-search"></i>
      </a>
    </nav>
  );
};

export default Navigation;
