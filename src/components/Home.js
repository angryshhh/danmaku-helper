import React, { Component } from 'react';
import GamesNavi from './GamesNavi';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      games: [],
      lives: [],
    };
  }

  componentDidMount() {
    fetch('RoomApi/game').then((response => {
      response.json().then(result => {
        if(!result.error) {
          console.log(result.data);
          this.setState({
            games: result.data,
          });
        } else {
          console.log(result.data);
        }
      })
    })).catch(err => {
      console('failed');
    });
  }

  render() {
    return (
      <div>
        <h1>home</h1>
        <GamesNavi games={this.state.games} />
      </div>
    );
  }
}

export default Home;