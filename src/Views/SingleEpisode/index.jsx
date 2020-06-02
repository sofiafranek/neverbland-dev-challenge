import React, { useState, useEffect } from 'react';
import './style.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Link } from 'react-router-dom';

import { getEpisodes } from './../../Services/episodes';

import Episode from '../../Components/Episode';

const SingleEpisode = (props) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchData();
  });

  const fetchData = () => {
    getEpisodes(props.match.params.id)
      .then((episodes) => {
        setEpisodes(episodes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const episode = props.location.state.single;
  return (
    <main className="single-cast episode">
      <header className="single-show-header" id="box">
        <div className="breadcrumb">
          <a href="/" className="hvr-underline-from-left">
            Home
          </a>
          <span>/</span>
          <a
            href={`/show/${props.match.params.id}`}
            className="hvr-underline-from-left"
          >{`${props.match.params.name}`}</a>
          <span>/</span>
          <small href="/">{episode.name}</small>
        </div>
      </header>
      <section className="header-introduction">
        <div className="episode-header-img">
          <LazyLoadImage src={episode.image.original} alt={episode.name} />
        </div>
        <div>
          <h1>
            {episode.name} -
            <small>
              Season: {episode.season}, Episode: {episode.number}
            </small>
          </h1>

          <small>
            Aired: {episode.airtime} - {episode.airdate}
          </small>
          <p dangerouslySetInnerHTML={{ __html: episode.summary }}></p>
        </div>
      </section>
      <section className="associated-information">
        <h5>
          Associated Episodes of Season {episode.season} on {props.match.params.name}
        </h5>
        <div className="cast-container episodes-associate-container">
          {episodes.map((single, i) => {
            if (single.season === episode.season) {
              return (
                <Link
                  to={{
                    pathname: `/show/${props.match.params.id}/${props.match.params.name}/episode/${single.id}`,
                    state: { single },
                  }}
                  key={i}
                  onClick={scrollToTop}
                >
                  {/* <Episode {...single} /> */}
                  <div className="overlay">
                    <div
                      className="associated-episodes"
                      style={{
                        backgroundImage: `url(${
                          single.image !== null ? single.image.original : ''
                        })`,
                      }}
                    >
                      <div>
                        <h5>{single.name}</h5>
                        <h5>Episode {single.number}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </section>
    </main>
  );
};

export default SingleEpisode;
