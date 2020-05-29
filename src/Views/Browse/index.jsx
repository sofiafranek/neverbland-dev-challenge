import React, { Component } from 'react';

import Search from './../../Components/Search';
import ShowCard from './../../Components/ShowCard';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  searchShows = (word) => {
    this.setState({
      search: word,
    });
  };

  render() {
    // console.log(this.props.shows, 'props');
    return (
      <>
        <header className="centered-header">
          <h1>Browse</h1>
          <Search search={this.searchShows} />
          <ul>
            <li>Action</li>
            <li>|</li>
            <li>Adventure</li>
            <li>|</li>
            <li>Comedy</li>
            <li>|</li>
            <li>Crime</li>
            <li>|</li>
            <li>Drama</li>
            <li>|</li>
            <li>Family</li>
            <li>|</li>
            <li>Romance</li>
            <li>|</li>
            <li>Science-Fiction</li>
            <li>|</li>
            <li>Thriller</li>
          </ul>
        </header>
        <main className="container">
          <section className="display-flex">
            {this.props.shows.map((show) => {
              if (show.rating.average !== null) {
                if (show.name.toLowerCase().includes(this.state.search)) {
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

export default Browse;
