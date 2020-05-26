import React, { Component } from 'react';
import { getShows } from './../../Services/shows';

import ShowCard from './../../Components/ShowCard';

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      shows: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getShows()
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
      <main>
        <header className="App-header">
          <h1>TV Bland</h1>
          <h2>TV show and web series database.</h2>
          <h2>
            Create personliased schedules. Episode guide, cast, crew and character information.
          </h2>
          <h3>Last Added Shows</h3>
        </header>
        <section className="display-flex">
          {this.state.shows.map((show) => {
            return <ShowCard key={show.id} {...show} />;
          })}
        </section>
      </main>
    );
  }
}

export default Homepage;
