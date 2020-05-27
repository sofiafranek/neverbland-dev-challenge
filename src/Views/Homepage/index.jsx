import React, { Component } from 'react';
import { getShows } from './../../Services/shows';

import ShowCard from './../../Components/ShowCard';
import Search from './../../Components/Search';

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      shows: [],
      search: '',
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

  searchShows = (word) => {
    this.setState({
      search: word,
    });
  };

  render() {
    return (
      <>
        <header>
          <h1>TV Bland</h1>
          <h2>TV show and web series database.</h2>
          <h2>
            Create personliased schedules. Episode guide, cast, crew and character information.
          </h2>
          <Search search={this.searchShows} />
          <h3>Last Added Shows</h3>
        </header>
        <main className="container">
          <section className="display-flex">
            {this.state.shows.map((show) => {
              if (show.name.toLowerCase().includes(this.state.search)) {
                return <ShowCard key={show.id} {...show} />;
              }
            })}
          </section>
        </main>
      </>
    );
  }
}

export default Homepage;
