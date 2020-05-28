import React, { Component } from 'react';
import './App.scss';

import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { getShows } from './Services/shows';

import HomePage from './Views/Homepage';
import SingleShow from './Views/SingleShow';

class App extends Component {
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
      <div className="App">
        <nav>
          <a href="/" className="home-icon">
            <i className="fas fa-home"></i>
          </a>
        </nav>
        <Router>
          <Switch>
            <Route
              path="/"
              render={(props) => <HomePage {...props} shows={this.state.shows} />}
              exact
            />
            <Route
              path="/show/:id"
              render={(props) => <SingleShow {...props} shows={this.state.shows} />}
              exact
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
