import React from 'react';
import { Link } from 'react-router-dom';

const ShowCard = (props) => {
  const rating = Math.floor(props.rating.average / 2);
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i className="fas fa-star"></i>);
  }

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
            return <li key={genre}>{genre}</li>;
          })}
        </ul>
      </div>
    </Link>
  );
};

export default ShowCard;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const ShowCard = (props) => {
//   const rating = Math.floor(props.show.rating.average / 2);
//   const stars = [];
//   for (let i = 0; i < rating; i++) {
//     stars.push(<i className="fas fa-star"></i>);
//   }

//   return (
//     <Link to={`/show/${props.show.id}`}>
//       <div className="showcard">
//         <img src={props.show.image.medium} alt="" />
//         <h4>{props.name}</h4>
//         {stars.map((star, index) => {
//           return <span key={index}>{star}</span>;
//         })}
//         <ul>
//           {props.show.genres.map((genre) => {
//             return <li key={genre}>{genre}</li>;
//           })}
//         </ul>
//       </div>
//     </Link>
//   );
// };

// export default ShowCard;
