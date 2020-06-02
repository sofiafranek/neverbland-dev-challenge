import React, { useState, useEffect } from 'react';
import './style.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Link } from 'react-router-dom';

import { getCasts } from './../../Services/casts';

const SingleCast = (props) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchData();
  });

  const fetchData = () => {
    getCasts(props.match.params.id)
      .then((cast) => {
        setCast(cast);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const person = props.location.state.single.person;
  const character = props.location.state.single.character;

  return (
    <>
      <header className="single-show-header" id="box">
        <div className="breadcrumb">
          <a href="/" className="hvr-underline-from-left">
            Home
          </a>
          <span>/</span>
          <a
            href={`/show/${props.match.params.id}`}
            className="hvr-underline-from-left"
          >{`${props.match.params.name}`}</a>{' '}
          <span>/</span>
          <small href="/">{person.name}</small>
        </div>
      </header>
      <main className="single-cast">
        <section className="header-introduction">
          <LazyLoadImage src={person.image.medium} alt={person.name} />
          <div>
            <h1>{person.name}</h1>
            <small>Birthday: {person.birthday}</small>
            <p>Born in: {person.country.name}</p>
            <br />
            <p>Character played: {character.name}</p>
          </div>
        </section>
        <section className="associated-information">
          <h5>Associated Cast Members of {props.match.params.name}</h5>
          <div className="cast-container">
            {cast.map((single, i) => {
              return (
                <Link
                  to={{
                    pathname: `/show/${props.match.params.id}/cast/${props.match.params.name}/${single.person.id}`,
                    state: { single },
                  }}
                  key={i}
                  onClick={scrollToTop}
                >
                  <div className="cast-overlay">
                    <div className="associate-cast">
                      <LazyLoadImage src={single.person.image.medium} alt={single.person.name} />
                      <h5>{single.person.name}</h5>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleCast;
