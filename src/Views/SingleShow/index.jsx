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

    let showImg = '';
    let networkName = '';
    let scheduleDay = '';
    let scheduleTime = '';
    let showGenres = '';
    let showRating = '';

    this.props.shows.map((show) => {
      if (show.id === Number(this.props.match.params.id)) {
        showImg = show.image.original;
        networkName = show.network.name;
        scheduleDay = show.schedule.days;
        scheduleTime = show.schedule.time;
        showGenres = Object.values(show.genres).join(' | ');
        showRating = show.rating.average;
      }
    });

    const rating = Math.floor(showRating / 2);
    const alternativeRating = showRating / 2;
    const empty = 5 - rating;
    const stars = [];
    const emptyStars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span>
          <i className="fas fa-star" key={i}></i>
        </span>
      );
    }
    for (let i = 0; i < empty; i++) {
      emptyStars.push(<i className="far fa-star"></i>);
    }

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
              <small className="star-ratings">
                {stars}
                {emptyStars.map((star, index) => {
                  return <span key={index}>{star}</span>;
                })}
                <span className="rating-no">{alternativeRating} / 5</span>
              </small>
              <h1>{single.name}</h1>
              <small>{single.premiered}</small>
              <p>{single.summary}</p>
            </div>
          </section>
        </header>
        <main>
          <section className="single-show-container">
            <section className="show-info-container">
              <h5>Show Info</h5>
              <div className="underline">
                <p>Status: {single.status}</p>
              </div>
              <div className="underline">
                <p>Genres: {showGenres}</p>
              </div>
              <div className="underline">
                <p>Streamed on: {networkName}</p>
              </div>
              <div className="underline">
                <p>Language: {single.language}</p>
              </div>
              <div className="underline">
                <p>
                  Schedule: {scheduleTime} - {scheduleDay}
                </p>
              </div>
            </section>
            <section>
              <h5>Starring</h5>
              <ul>
                {cast.map((single, i) => {
                  return (
                    <li key={this.randomKey(20)}>
                      <div className="cast-image">
                        <img src={single.person.image.medium} alt={i} />
                      </div>
                      <div>{single.person.name}</div>
                      <div>
                        <small className="character-name"> - {single.character.name}</small>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
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
