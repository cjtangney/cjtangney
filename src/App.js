import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './views/Home/Home';

import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Route exact path='/' render={ (e) => (
            <Home {...e} />
          )} />
        </Router>        
      </div>
    );
  }
}

export default App;
