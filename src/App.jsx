import React from 'react';
import './App.scss';

import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import HomePage from './Views/Homepage';
import SingleShow from './Views/SingleShow';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/show/:id" component={SingleShow} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
