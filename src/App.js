import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Home from './views/Home/Home';
import Blog from './views/Blog/Blog';
import Resume from './views/Resume/Resume';
import Work from './views/Work/Work';

import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
      <Switch>
        <Route exact path='/' render={ (e) => (
          <Home {...e} />
        )} />
        <Route exact path='/blog' render={ (e) => (
          <Blog {...e} />
        )} />
        <Route exact path='/resume' render={ (e) => (
          <Resume {...e} />
        )} />
        <Route exact path='/work' render={ (e) => (
          <Work {...e} />
        )} />
        <Route path='/work/:folder' render={ (e) => (
          <Work {...e} />
        )} />
        <Route exact path='*' render={ (e) => (
          <h1 className='text-center'>404 Page Not Found</h1>
        )} />
      </Switch>
      </div>
    );
  }
}

export default App;
