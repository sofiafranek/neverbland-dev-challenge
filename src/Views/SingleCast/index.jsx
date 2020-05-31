import React from 'react';
import './style.scss';

const SingleCast = (props) => {
  const person = props.location.state.single.person;
  const character = props.location.state.single.character;
  return (
    <main className="single-cast">
      <header className="single-show-header" id="box">
        <div className="breadcrumb">
          <a href="/">Home // </a>
          <a href={`/show/${props.match.params.id}`}>{`${props.match.params.name} // `}</a>
          <span href="/">{person.name}</span>
        </div>
      </header>
      <section className="header-introduction">
        <img src={person.image.medium} alt="" />
        <div>
          <h1>{person.name}</h1>
          <small>Birthday: {person.birthday}</small>
          <p>Born in: {person.country.name}</p>
          <br />
          <p>Character played: {character.name}</p>
        </div>
      </section>
    </main>
  );
};

export default SingleCast;
