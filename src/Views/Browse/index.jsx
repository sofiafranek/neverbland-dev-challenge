import React, { useState } from 'react';
import './style.scss';

import bannerImg from './../../browse-header.jpg';

import Search from './../../Components/Search';
import ShowCard from './../../Components/ShowCard';

const Browse = (props) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [genres] = useState([
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Drama',
    'Family',
    'Romance',
    'Science-Fiction',
    'Thriller',
  ]);

  const searchShows = (word) => {
    setSearch(word);
  };

  const filtering = (e) => {
    const filter = e.target.getAttribute('data-index');
    setFilter(filter);
  };

  return (
    <>
      <header
        className="centered-header browse-banner-image"
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
      ></header>
      <section className="browse-header">
        <h1>Browse</h1>
        <Search search={searchShows} />
        <ul>
          <li
            onClick={(e) => filtering(e)}
            key="All"
            data-index="All"
            className="hvr-underline-from-left"
          >
            All
          </li>
          {genres.map((genre) => {
            return (
              <li
                onClick={(e) => filtering(e)}
                key={genre}
                data-index={genre}
                className="hvr-underline-from-left"
              >
                {genre}
              </li>
            );
          })}
        </ul>
      </section>
      <main className="container">
        <section className="display-flex">
          {props.shows.map((show) => {
            if (show.rating.average !== null) {
              if (show.name.toLowerCase().includes(search.toLowerCase())) {
                if (show.genres.includes(filter)) {
                  return <ShowCard key={show.id} {...show} />;
                } else if (filter === 'All') {
                  return <ShowCard key={show.id} {...show} />;
                }
              }
            }
          })}
        </section>
      </main>
    </>
  );
};

export default Browse;
