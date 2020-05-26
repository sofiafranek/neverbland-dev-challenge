import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = (props) => {
  return (
    <Link to={`/show/${props.id}`}>
      <div className="showcard">
        <img src={props.image.medium} alt="" />
        <h4>{props.name}</h4>
      </div>
    </Link>
  );
};

export default ShowCard;
