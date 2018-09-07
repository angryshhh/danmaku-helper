import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './redux/reducer';
import { loadGames, loadLives, chooseGame } from './redux/actions';
import Home from './components/Home';
import Room from './components/Room';
import './App.css';

const store = createStore(reducer, applyMiddleware(thunk));

const HomeContainer = connect(
  state => ({
    chosenGame: state.chosenGame,
    offset: state.offset,
    limit: state.limit,
  }), 
  dispatch => {
    return {
      loadGames: () => {
        dispatch(loadGames());
      },
      loadLives: (chosenGame, offset, limit) => {
        dispatch(loadLives(chosenGame, offset, limit));
      },
      chooseGame: (shortName) => {
        dispatch(chooseGame(shortName));
      },
    }
  }
)(Home);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route path='/games/:shortName' component={HomeContainer} />
            <Route path='/room/:roomId' component={Room} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
