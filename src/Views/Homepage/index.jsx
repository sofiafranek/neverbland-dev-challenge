import React from 'react';
import './style.scss';

import bannerImg from './../../homepage-header.jpg';

import ShowCard from './../../Components/ShowCard';

const Homepage = (props) => {
  return (
    <>
      <div className="overlay">
        <header
          className="centered-header homepage-banner-image"
          style={{
            backgroundImage: `url(${bannerImg})`,
          }}
        ></header>
      </div>
      <section className="overlay-section">
        <h1>TV Bland</h1>
        <h2>See all your favourite TV series and shows here.</h2>
        <h2>
          Find the lastest added shows, browse by genre and see all the seasons & episodes for your
          shows and more!
        </h2>
        <a href="/browse">
          <button>Browse All</button>
        </a>
      </section>
      <main className="container">
        <h3>Last Added Shows</h3>
        <section className="display-flex homepage">
          {props.shows.map((show) => {
            // showing the lastest seasons that have premiered by date
            if (show.premiered > '2014-01-12') {
              return <ShowCard key={show.id} {...show} />;
            }
          })}
        </section>
      </main>
    </>
  );
};

export default Homepage;
