import React from 'react';
import './style.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const ShowCard = (props) => {
  // calculating the rating and adding fontawesome stars to represent
  const rating = Math.floor(props.rating.average / 2);
  const empty = 5 - rating;
  const stars = [];
  const emptyStars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i className="fas fa-star"></i>);
  }
  for (let i = 0; i < empty; i++) {
    emptyStars.push(<i className="far fa-star"></i>);
  }

  return (
    <a href={`/show/${props.id}`}>
      <div className="showcard hvr-float">
        <LazyLoadImage alt={props.name} src={props.image.medium} />
        <h4>{props.name}</h4>
        {stars.map((star, index) => {
          return <span key={index}>{star}</span>;
        })}
        {emptyStars.length === 5 ? (
          <small>No Rating</small>
        ) : (
          emptyStars.map((star, index) => {
            return <span key={index}>{star}</span>;
          })
        )}
        <h6>{Object.values(props.genres).join(' | ')}</h6>
      </div>
    </a>
  );
};

export default ShowCard;
