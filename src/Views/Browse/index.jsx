import React, { Component } from 'react';

import bannerImg from './../../felix-mooneeram-evlkOfkQ5rE-unsplash.jpg';

import Search from './../../Components/Search';
import ShowCard from './../../Components/ShowCard';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: 'All',
      genres: [
        'Action',
        'Adventure',
        'Comedy',
        'Crime',
        'Drama',
        'Family',
        'Romance',
        'Science-Fiction',
        'Thriller',
      ],
    };
  }

  searchShows = (word) => {
    this.setState({
      search: word,
    });
  };

  filter = (event) => {
    event.preventDefault();
    const filter = event.currentTarget.dataset.id;

    console.log(filter, 'filter');

    this.setState({
      filter,
    });
  };

  render() {
    return (
      <>
        <header
          className="centered-header"
          style={{
            backgroundImage: `url(${bannerImg})`,
            backgroundSize: 'cover',
            backgroundColor: 'black',
            opacity: '0.3',
            minHeight: '300px',
            backgroundPosition: 'center',
          }}
        ></header>
        <section className="browse-header">
          <h1>Browse</h1>
          <Search search={this.searchShows} />
          <ul>
            <li onClick={this.filter} data-id="All" key="All" className="hvr-underline-from-left">
              All
            </li>
            {this.state.genres.map((genre) => {
              return (
                <li
                  onClick={this.filter}
                  data-id={genre}
                  key={genre}
                  className="hvr-underline-from-left"
                >
                  {genre}
                </li>
              );
            })}
          </ul>
        </section>
        <main className="container">
          <section className="display-flex">
            {this.props.shows.map((show) => {
              if (show.rating.average !== null) {
                if (show.name.toLowerCase().includes(this.state.search)) {
                  if (show.genres.includes(this.state.filter)) {
                    return <ShowCard key={show.id} {...show} />;
                  } else if (this.state.filter === 'All') {
                    return <ShowCard key={show.id} {...show} />;
                  }
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
