import React, { Component } from 'react';
import { singleShow } from './../../Services/singleShow';
import { getCasts } from './../../Services/casts';
import { getSeasons } from './../../Services/seasons';
import { getEpisodes } from './../../Services/episodes';

// global variables getting info from props, could not access through state of singleShow
let showImg = '';

class SingleShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleShow: [],
      cast: [],
      season: [],
      episodes: [],
      filter: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // turn into an async await function later
  fetchData() {
    this.setState({
      filter: 'Season 1',
    });

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

  filter = (event) => {
    event.preventDefault();
    const filter = event.target.value;

    this.setState({
      filter,
    });
  };

  render() {
    const single = this.state.singleShow;
    const cast = this.state.cast;
    const season = this.state.season;
    const episodes = this.state.episodes;

    // console.log(this.props.shows, 'props');

    this.props.shows.map((show) => {
      // console.log(show, 'show', this.props.match.params.id);
      if (show.id === Number(this.props.match.params.id)) {
        showImg = show.image.original;
        console.log(show.image, 'show');
      }
    });

    // const rating = Math.floor(single.rating.average / 2);
    // const stars = [];
    // for (let i = 0; i < rating; i++) {
    //   stars.push(<i className="fas fa-star"></i>);
    // }

    // console.log(single.image, 'image');
    return (
      <>
        <header className="single-show-header">
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
          <section className="show-introduction">
            <div className="minimum-height">
              <img src={showImg} alt="" />
            </div>
            <div>
              {' '}
              <h1>{single.name}</h1>
              <small>{single.premiered}</small>
              <p>{single.summary}</p>
            </div>
          </section>
        </header>
        <main>
          <section className="single-show-container">
            <div className="show-info-container">
              <h5>Show Info</h5>
              <div className="underline">
                <p>Status {single.status}</p>
              </div>
              <div className="underline">
                <p>Genres {single.genres}</p>
              </div>
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
          <section className="seasons-episodes-container">
            <select name="filter" className="filter" onChange={this.filter}>
              {season.map((single, index) => {
                // To make the default option season 1 so there is no blank space, on inital view you see episodes displayed
                index++;
                return (
                  <option value={`Season ${index}`} key={`Season ${index}`}>
                    Season {index}
                  </option>
                );
              })}
            </select>
            {episodes.map((single) => {
              // Need to have an error message
              if (this.state.filter === `Season ${single.season}`) {
                return (
                  <a href={single.url} key={this.randomKey(20)}>
                    <div className="display-flex single-episodes hvr-grow">
                      <p>{single.name}</p>
                      <p className="allign">Episode {single.number}</p>
                      <p className="allign">Airdate: {single.airdate}</p>
                      <p className="allign">Duration: {single.runtime}</p>
                    </div>
                  </a>
                );
              }
            })}
          </section>
        </main>
      </>
    );
  }
}

export default SingleShow;
