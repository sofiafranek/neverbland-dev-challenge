import React, { Component } from 'react';

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
        <header className="centered-header">
          <h1>TV Bland</h1>
          <h2>TV show and web series database.</h2>
          <h2>
            Create personliased schedules. Episode guide, cast, crew and character information.
          </h2>
          <a href="/browse">
            <button>Browse All</button>
          </a>
          <h3>Last Added Shows</h3>
        </header>
        <main className="container">
          <section className="display-flex">
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
