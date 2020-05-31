import React from 'react';
import './style.scss';

const SingleEpisode = (props) => {
  const episode = props.location.state.single;
  console.log(episode, 'props');
  return (
    <main className="single-cast episode">
      <header className="single-show-header" id="box">
        <div className="breadcrumb">
          <a href="/">Home // </a>
          <a href={`/show/${props.match.params.id}`}>{`${props.match.params.name} // `}</a>
          <span href="/">{episode.name}</span>
        </div>
      </header>
      <section className="header-introduction">
        <img src={episode.image.original} alt="" />
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
          <p>{episode.summary}</p>
        </div>
      </section>
    </main>
  );
};

export default SingleEpisode;
