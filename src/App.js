import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Room from './components/Room';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/games/:shortName' component={Home} />
          <Route path='/room' component={Room} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
