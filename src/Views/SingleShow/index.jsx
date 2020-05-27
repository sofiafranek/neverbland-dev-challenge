import React, { Component } from 'react';
import { singleShow } from './../../Services/singleShow';
import { getCasts } from './../../Services/casts';

class SingleShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleShow: [],
      cast: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    singleShow(this.props.match.params.id)
      .then((show) => {
        this.setState({
          singleShow: show,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    getCasts(this.props.match.params.id)
      .then((cast) => {
        this.setState({
          cast: cast,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  randomKey = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  render() {
    const single = this.state.singleShow;
    const cast = this.state.cast;

    console.log(single, 'single');

    // const rating = Math.floor(single.rating.average / 2);
    // const stars = [];
    // for (let i = 0; i < rating; i++) {
    //   stars.push(<i className="fas fa-star"></i>);
    // }

    // console.log(single.image, 'image');
    return (
      <>
        <header>
          <div className="navigation-arrows">
            <a href={`/show/${Number(this.props.match.params.id) - 1}`}>
              <i className="fas fa-long-arrow-alt-left"></i>
              <small>Previous Show</small>
            </a>
            <a
              href={`/show/${Number(this.props.match.params.id) + 1}`}
              id="navigation-arrows__right"
            >
              <i className="fas fa-long-arrow-alt-right"></i>
              <small>Next Show</small>
            </a>
          </div>
          {/* <img src={Object.values(single.image)[0]} alt="" /> */}
          {/* {stars.map((star, index) => {
            return <span key={index}>{star}</span>;
          })} */}
          <h1>{single.name}</h1>
          <small>{single.premiered}</small>
          <p>{single.summary}</p>
        </header>
        <main>
          <h5>Starring</h5>
          <ul>
            {cast.map((single) => {
              return (
                <li key={this.randomKey(20)}>
                  {single.person.name}
                  <small className="character-name"> - {single.character.name}</small>
                </li>
              );
            })}
          </ul>
        </main>
      </>
    );
  }
}

export default SingleShow;
