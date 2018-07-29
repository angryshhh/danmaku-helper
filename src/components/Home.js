import React, { Component } from 'react';
import GamesNavi from './GamesNavi';
import Lives from './Lives';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      games: [],
      chosenGame: this.props.match.params.shortName || '', // game.short_name
      lives: [],
      offset: 0,  // 翻页偏移量，GET参数
      limit: 30,  // 每次获取数量，GET参数
    };
  }

  componentDidMount() {

    fetch('/RoomApi/game').then((response => {
      response.json().then(result => {
        if(!result.error) {
          this.setState({
            games: result.data,
          });
        } else {
          console.log(result.data);
        }
      })
    })).catch(err => {
      console('games fetch failed');
    });

    fetch(this.createRoomApi(this.state.chosenGame)).then(response => {
      response.json().then(result => {
        if(!result.error) {
          this.setState({
            lives: result.data,
          });
        } else {
          console.log(result.data);
        }
      })
    }).catch(err => {
      console.log('rooms fetch failed');
    });
  }

  componentWillReceiveProps(nextProps) {
    const { shortName } = nextProps.match.params;
    fetch(this.createRoomApi(shortName)).then(response => {
      response.json().then(result => {
        if(!result.error) {
          this.setState({ // 每次setstate都会引起重新渲染，而在will中只有第一次生效，所以要一次set完所有更新的state
            chosenGame: shortName,
            lives: result.data,
          });
        } else {
          console.log(result.data);
        }
      })
    }).catch(err => {
      console.log('rooms fetch failed');
    });
  }

  createRoomApi(shortName) {
    if(shortName && shortName.length > 0) {
      return `/RoomApi/live/${shortName}?offset=${this.state.offset}&limit=${this.state.limit}`;
    } else {
      return `/RoomApi/live?offset=${this.state.offset}&limit=${this.state.limit}`
    }
  }

  render() {
    return (
      <div>
        <h1>home</h1>
        <GamesNavi games={this.state.games} />
        <Lives rooms={this.state.lives} />
      </div>
    );
  }
}

export default Home;