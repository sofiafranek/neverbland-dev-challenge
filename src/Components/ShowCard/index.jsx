import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = (props) => {
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
    <Link to={`/show/${props.id}`}>
      <div className="showcard">
        <img src={props.image.medium} alt="" />
        <h4>{props.name}</h4>
        {stars.map((star, index) => {
          return <span key={index}>{star}</span>;
        })}
        {emptyStars.map((star, index) => {
          return <span key={index}>{star}</span>;
        })}
        <ul>
          {props.genres.map((genre) => {
            return <li key={genre}>{genre}</li>;
          })}
        </ul>
      </div>
    </Link>
  );
};

export default ShowCard;
