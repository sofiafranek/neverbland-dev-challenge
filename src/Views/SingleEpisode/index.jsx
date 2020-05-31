import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

import { getEpisodes } from './../../Services/episodes';

class SingleEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getEpisodes(this.props.match.params.id)
      .then((episodes) => {
        this.setState({
          episodes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    const episode = this.props.location.state.single;
    return (
      <main className="single-cast episode">
        <header className="single-show-header" id="box">
          <div className="breadcrumb">
            <a href="/">Home // </a>
            <a
              href={`/show/${this.props.match.params.id}`}
            >{`${this.props.match.params.name} // `}</a>
            <span href="/">{episode.name}</span>
          </div>
        </header>
        <section className="header-introduction">
          <div className="episode-header-img">
            <img src={episode.image.original} alt="" />
          </div>
          <div>
            <h1>
              {episode.name} -
              <small>
                Season: {episode.season}, Episode: {episode.number}
              </small>
            </h1>

            <small>
              Aired: {episode.airtime} - {episode.airdate}
            </small>
            <p>{episode.summary}</p>
          </div>
        </section>
        <section className="associated-information">
          <h5>
            Associated Episodes of Season {episode.season} on {this.props.match.params.name}
          </h5>
          <div className="cast-container episodes-associate-container">
            {this.state.episodes.map((single, i) => {
              console.log(single, 'single');
              if (single.season === episode.season) {
                return (
                  <Link
                    to={{
                      pathname: `/show/${this.props.match.params.id}/${this.props.match.params.name}/episode/${single.id}`,
                      state: { single },
                    }}
                    key={i}
                    onClick={this.scrollToTop}
                  >
                    <div className="overlay">
                      <div
                        className="associated-episodes"
                        style={{
                          backgroundImage: `url(${
                            single.image !== null ? single.image.original : ''
                          })`,
                        }}
                      >
                        <div>
                          <h5>{single.name}</h5>
                          <h5>Episode {single.number}</h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        </section>
      </main>
    );
  }
}

export default SingleEpisode;
