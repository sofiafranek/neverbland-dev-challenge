import React, { Component } from 'react';
import { singleShow } from './../../Services/singleShow';
import { getCasts } from './../../Services/casts';
import { getSeasons } from './../../Services/seasons';
import { getEpisodes } from './../../Services/episodes';

class SingleShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleShow: [],
      cast: [],
      season: [],
      episodes: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // turn into an async await function later
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

    getSeasons(this.props.match.params.id)
      .then((season) => {
        this.setState({
          season: season,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    getEpisodes(this.props.match.params.id)
      .then((episodes) => {
        this.setState({
          episodes: episodes,
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
    const season = this.state.season;
    const episodes = this.state.episodes;

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
          <section className="single-show-container">
            <div className="show-info-container">
              <h5>Show Info</h5>
              <p>Status {single.status}</p>
              <hr />
              {/* {single.genres.map((genre) => {
            return <span>{genre}</span>;
          })} */}
              {/* <p>Streamed On {single.network}</p> */}
            </div>
            <div>
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
            </div>
          </section>
          <section>
            {season.map((single, index) => {
              console.log(index + 1, single.number);
              return (
                <div key={this.randomKey(20)}>
                  <h6>
                    Season {index + 1}, {single.name}
                  </h6>
                  <p>{single.summary}</p>
                  {index + 1 === single.number
                    ? episodes.map((single) => {
                        return (
                          <div key={this.randomKey(20)}>
                            <p>{single.name}</p>
                          </div>
                        );
                      })
                    : ''}
                </div>
              );
            })}
          </section>
        </main>
      </>
    );
  }
}

export default SingleShow;
