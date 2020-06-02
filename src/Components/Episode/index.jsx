import React from 'react';

const Episodes = (props) => {
  return (
    <>
      <div className="overlay">
        <div
          className="single-episodes hvr-grow single-episode-image"
          style={{
            backgroundImage: `url(${props.image !== null ? props.image.original : ''})`,
          }}
        ></div>
      </div>
      <section>
        <div className="image-text">
          <span>
            {props.name} {props.number}
          </span>
          <span>Episode {props.number}</span>
        </div>
        <div className="image-text">
          <span>{props.airdate}</span>
          <span>{props.runtime} Minutes</span>
        </div>
      </section>
    </>
  );
};

export default Episodes;
