import React, { Component } from 'react';

import bannerImg from './../../felix-mooneeram-evlkOfkQ5rE-unsplash.jpg';

import ShowCard from './../../Components/ShowCard';

import { getScheduledShow } from './../../Services/schedule';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getScheduledShow()
      .then((shows) => {
        this.setState({
          shows,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <div className="overlay">
          <header
            className="centered-header"
            style={{
              backgroundImage: `url(${bannerImg})`,
              backgroundSize: 'cover',
              backgroundColor: 'black',
              opacity: '0.3',
              backgroundPosition: 'center',
              minHeight: '385px',
            }}
          ></header>
        </div>
        <section className="overlay-section">
          <h1>TV Bland</h1>
          <h2>TV show and web series database.</h2>
          <h2>
            Create personliased schedules. Episode guide, cast, crew and character information.
          </h2>
          <a href="/browse">
            <button>Browse All</button>
          </a>
        </section>
        <main className="container">
          <h3>Last Added Shows</h3>
          <section className="display-flex homepage">
            {this.props.shows.map((show) => {
              // showing the lastest seasons that have premiered by date
              if (show.premiered > '2014-01-12') {
                // only showing data that is complete this removes any seasons without a rating
                if (show.rating.average !== null) {
                  return <ShowCard key={show.id} {...show} />;
                }
              }
            })}
          </section>
        </main>
      </>
    );
  }
}

export default Homepage;
