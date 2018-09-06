import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import loadGames from './redux/actions';
import Home from './components/Home';
import Room from './components/Room';
import './App.css';

class App extends Component {
  render() {
    let store = createStore(reducer, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={connect(state => ({}), dispatch => {
              return {
                loadGames: () => {
                  dispatch(loadGames());
                }
              }
            })(Home)} />
            <Route path='/games/:shortName' component={Home} />
            <Route path='/room/:roomId' component={Room} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
