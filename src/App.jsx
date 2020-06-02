import React, { useState, useEffect } from 'react';
import './App.scss';

import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { getShows } from './Services/shows';

import HomePage from './Views/Homepage';
import SingleShow from './Views/SingleShow';
import Browse from './Views/Browse';
import SingleCast from './Views/SingleCast';
import SingleEpisode from './Views/SingleEpisode';

import Navigation from './Components/Navigation';

const App = () => {
  const [shows, setShows] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    fetchData();
    setTimeout(() => setSpinner(false), 1000);
  }, []);

  const fetchData = () => {
    getShows()
      .then((shows) => {
        setShows(shows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    !spinner && (
      <div className="App loader">
        <Navigation />
        <Router>
          <Switch>
            <Route path="/" render={(props) => <HomePage {...props} shows={shows} />} exact />
            <Route path="/browse" render={(props) => <Browse {...props} shows={shows} />} exact />
            <Route
              path="/show/:id"
              render={(props) => <SingleShow {...props} shows={shows} />}
              exact
            />
            <Route
              path="/show/:id/cast/:name/:castID"
              render={(props) => <SingleCast {...props} shows={shows} />}
              exact
            />
            <Route
              path="/show/:id/:name/episode/:episodeID"
              render={(props) => <SingleEpisode {...props} shows={shows} />}
              exact
            />
          </Switch>
        </Router>
      </div>
    )
  );
};

export default App;
