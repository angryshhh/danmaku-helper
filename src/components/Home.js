import React, { Component } from 'react';
import { Layout } from 'antd'
import GamesNavi from './GamesNavi';
import Lives from './Lives';

const { Sider, Content } = Layout;

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
      <Layout>
        <Sider style={{
          overflow: 'auto',
          height: '100vh',  // 100% viewport height
          position: 'fixed',  // 位置被设置为 fixed 的元素，可定位于相对于浏览器窗口的指定坐标。此元素的位置可通过 "left"、"top"、"right" 以及"bottom" 属性来规定。不论窗口滚动与否，元素都会留在那个位置
          left: 0,  // 作用于position
        }}>
          <GamesNavi selectedGame={this.state.chosenGame} games={this.state.games} />
        </Sider>
        <Content style={{
          marginLeft: 200,  // sider width is 200
        }}>
          <Lives rooms={this.state.lives} />
        </Content>
      </Layout>
    );
  }
}

export default Home;