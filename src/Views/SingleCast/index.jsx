import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

import { getCasts } from './../../Services/casts';

class SingleCast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cast: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getCasts(this.props.match.params.id)
      .then((cast) => {
        this.setState({
          cast,
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
    const person = this.props.location.state.single.person;
    const character = this.props.location.state.single.character;
    const cast = this.state.cast;

    return (
      <main className="single-cast">
        <header className="single-show-header" id="box">
          <div className="breadcrumb">
            <a href="/">Home // </a>
            <a
              href={`/show/${this.props.match.params.id}`}
            >{`${this.props.match.params.name} // `}</a>
            <span href="/">{person.name}</span>
          </div>
        </header>
        <section className="header-introduction">
          <img src={person.image.medium} alt="" />
          <div>
            <h1>{person.name}</h1>
            <small>Birthday: {person.birthday}</small>
            <p>Born in: {person.country.name}</p>
            <br />
            <p>Character played: {character.name}</p>
          </div>
        </section>
        <section className="associated-information">
          <h5>Associated Cast Members of {this.props.match.params.name}</h5>
          <div className="cast-container">
            {cast.map((single, i) => {
              return (
                <Link
                  to={{
                    pathname: `/show/${this.props.match.params.id}/cast/${this.props.match.params.name}/${single.person.id}`,
                    state: { single },
                  }}
                  key={i}
                  onClick={this.scrollToTop}
                >
                  <div className="cast-overlay">
                    <div className="associate-cast">
                      <img src={single.person.image.medium} alt="" />
                      <h5>{single.person.name}</h5>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    );
  }
}

export default SingleCast;
