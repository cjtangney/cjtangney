import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

import Home from './views/Home/Home';

import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path='/' render={ (e) => (
            <Home {...e} />
          )} />
        </Router>        
      </div>
    );
  }
}

export default App;
