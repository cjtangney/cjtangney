import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Home from './views/Home/Home';
import Blog from './views/Blog/Blog';

import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        {/*
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path='/' render={ (e) => (
            <Home {...e} />
          )} />
          <Route path='/blog/' render={ (e) => (
            <Blog {...e} />
          )} />
        </Router>
        */}
        <Router hashType='slash' basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path='/' render={ (e) => (
              <Home {...e} />
            )} />
            <Route exact path='/blog' render={ (e) => (
              <Blog {...e} />
            )} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
