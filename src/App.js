import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer } from './redux/reducer';
import { 
  loadGames,
  loadLives,
  chooseGame,
  receiveDanmaku,
  changeNobleEnterMessageFilter,
  receiveNobleList,
  receiveNobleNumInfo,
} from './redux/actions';
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
      loadGames: () => dispatch(loadGames()),
      loadLives: (chosenGame, offset, limit) => dispatch(loadLives(chosenGame, offset, limit)),
      chooseGame: shortName => dispatch(chooseGame(shortName)),
    }
  }
)(Home);

const RoomContainer = connect(
  state => ({
    nobleEnterMessageFilter: state.nobleEnterMessageFilter,
    nobleList: state.nobleList,
    nobleNumInfo: state.nobleNumInfo,
  }),
  dispatch => ({
    receiveDanmaku: danmaku => dispatch(receiveDanmaku(danmaku)),
    changeNobleEnterMessageFilter: nobleLevle => dispatch(changeNobleEnterMessageFilter(nobleLevle)),
    receiveNobleList: nobleList => dispatch(receiveNobleList(nobleList)),
    receiveNobleNumInfo: info => dispatch(receiveNobleNumInfo(info)),
  })
)(Room);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route path='/games/:shortName' component={HomeContainer} />
            {/* <Route path='/room/:roomId' component={Room} /> */}
            <Route path='/room/:roomId' component={RoomContainer} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
