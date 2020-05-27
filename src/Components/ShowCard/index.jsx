import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = (props) => {
  const rating = Math.floor(props.rating.average / 2);
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i className="fas fa-star"></i>);
  }

  console.log(props, 'props');

  return (
    <Link to={`/show/${props.id}`}>
      <div className="showcard">
        <img src={props.image.medium} alt="" />
        <h4>{props.name}</h4>
        {stars.map((star, index) => {
          return <span key={index}>{star}</span>;
        })}
        <ul>
          {props.genres.map((genre) => {
            return <li>{genre}</li>;
          })}
        </ul>
      </div>
    </Link>
  );
};

export default ShowCard;
