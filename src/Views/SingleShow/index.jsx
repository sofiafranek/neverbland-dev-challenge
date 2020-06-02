import React, { useState, useEffect } from 'react';
import './style.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Link } from 'react-router-dom';

import { singleShow } from './../../Services/singleShow';
import { getCasts } from './../../Services/casts';
import { getSeasons } from './../../Services/seasons';
import { getEpisodes } from './../../Services/episodes';

const SingleShow = (props) => {
  const [show, setShow] = useState([]);
  const [cast, setCast] = useState([]);
  const [season, setSeason] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    setFilter('Season 1');

    try {
      await singleShow(props.match.params.id).then((show) => {
        setShow(show);
      });
      await getCasts(props.match.params.id).then((cast) => {
        setCast(cast);
      });
      await getSeasons(props.match.params.id).then((season) => {
        setSeason(season);
      });
      await getEpisodes(props.match.params.id).then((episodes) => {
        setEpisodes(episodes);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filtering = (event) => {
    event.preventDefault();
    const filter = event.target.value;

    setFilter(filter);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // variables declared to then be assigned value by mapping props inherited from app
  let showImg = '';
  let networkName = '';
  let scheduleDay = '';
  let scheduleTime = '';
  let showGenres = '';
  let showRating = '';

  props.shows.map((show) => {
    if (show.id === Number(props.match.params.id)) {
      showImg = show.image.original;
      networkName = show.network.name;
      scheduleDay = show.schedule.days;
      scheduleTime = show.schedule.time;
      showGenres = Object.values(show.genres).join(' , ');
      showRating = show.rating.average;
    }
  });

  // calculating the rating and adding the fontawesome stars to create the visual rating
  const rating = Math.floor(showRating / 2);
  const alternativeRating = showRating / 2;
  const empty = 5 - rating;
  const stars = [];
  const emptyStars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <span key={i}>
        <i className="fas fa-star"></i>
      </span>
    );
  }
  for (let i = 0; i < empty; i++) {
    emptyStars.push(<i className="far fa-star" key={i}></i>);
  }

  return (
    <>
      <div className="navigation-arrows">
        <a href={`/show/${Number(props.match.params.id) - 1}`} className="hvr-grow large">
          <i className="fas fa-long-arrow-alt-left"></i>
          <small>Previous Show</small>
        </a>
        <a
          href={`/show/${Number(props.match.params.id) + 1}`}
          id="navigation-arrows__right"
          className="hvr-grow large"
        >
          <i className="fas fa-long-arrow-alt-right"></i>
          <small>Next Show</small>
        </a>
      </div>
      <div className="overlay" id="single-show-overlay">
        <header
          className="single-show-header"
          id="box"
          style={{
            backgroundImage: `url(${showImg})`,
          }}
        ></header>
      </div>
      <section className="show-introduction">
        <div className="minimum-height">
          <LazyLoadImage src={showImg} alt={show.name} />
        </div>
        <div>
          <small className="star-ratings">
            {stars}
            {emptyStars.map((star, index) => {
              return <span key={index}>{star}</span>;
            })}
            <span className="rating-no">{alternativeRating} / 5</span>
          </small>
          <h1>{show.name}</h1>
          <small>{show.premiered}</small>
          <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
        </div>
      </section>
      <main>
        <section className="single-show-container">
          <section className="show-info-container">
            <h5>Show Info</h5>
            <div className="underline">
              <span>Status:</span>
              <span>{show.status}</span>
            </div>
            <div className="underline">
              <span>Genres:</span>
              <span>{showGenres}</span>
            </div>
            <div className="underline">
              <span>Streamed on:</span>
              <span>{networkName}</span>
            </div>
            <div className="underline">
              <span>Language:</span>
              <span>{show.language}</span>
            </div>
            <div className="underline">
              <span>Schedule:</span>
              <span>
                {scheduleTime} - {scheduleDay}
              </span>
            </div>
          </section>
          <section>
            <h5>Starring</h5>
            <ul>
              {cast.map((single, i) => {
                return (
                  <Link
                    to={{
                      pathname: `/show/${props.match.params.id}/cast/${show.name}/${single.person.id}`,
                      state: { single },
                    }}
                    key={i}
                    onClick={scrollToTop}
                  >
                    <li>
                      <div className="cast-image">
                        <LazyLoadImage src={single.person.image.medium} alt={single.person.name} />
                      </div>
                      <div className="cast-name">{single.person.name}</div>
                      <div>
                        <small className="character-name"> - {single.character.name}</small>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </section>
        </section>
        <section className="seasons-episodes-container">
          <select name="filter" className="filter" onChange={filtering}>
            {season.map((single, index) => {
              // To make the default option season 1 so there is no blank space, on inital view you see episodes displayed
              index++;
              return (
                <option value={`Season ${index}`} key={`Season ${index}`}>
                  Season {index}
                </option>
              );
            })}
          </select>
          <div className="display-flex episodes-container">
            {episodes.map((single) => {
              // Need to have an error message
              if (filter === `Season ${single.season}`) {
                return (
                  <Link
                    to={{
                      pathname: `/show/${props.match.params.id}/${show.name}/episode/${single.id}`,
                      state: { single },
                    }}
                    key={single.name}
                    onClick={scrollToTop}
                  >
                    <div className="overlay">
                      <div
                        className="single-episodes hvr-grow single-episode-image"
                        style={{
                          backgroundImage: `url(${
                            single.image !== null ? single.image.original : ''
                          })`,
                        }}
                      ></div>
                    </div>
                    <section>
                      <div className="image-text">
                        <span>
                          {single.name} {single.number}
                        </span>
                        <span>Episode {single.number}</span>
                      </div>
                      <div className="image-text">
                        <span>{single.airdate}</span>
                        <span>{single.runtime} Minutes</span>
                      </div>
                    </section>
                    {/* </a> */}
                  </Link>
                );
              }
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleShow;
