import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import GamesNavi from './GamesNavi';
import Lives from './Lives';

const { Sider, Content } = Layout;

const GamesNaviContainer = connect(
  state => ({
    selectedGame: state.chosenGame,
    games: state.games,
  })
)(GamesNavi);

const LivesContainer = connect(
  state => ({rooms: state.lives})
)(Lives);

class Home extends Component {
  componentDidMount() {
    const { shortName } = this.props.match.params;
    this.props.loadGames();
    if(shortName){
      this.props.chooseGame(shortName);
    } else {
      this.props.loadLives(this.props.chosenGame, this.props.offset, this.props.limit);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match !== this.props.match){ // props received from router
      const { shortName } = nextProps.match.params;
      this.props.chooseGame(shortName);
    } else {
      this.props.loadLives(nextProps.chosenGame, nextProps.offset, nextProps.limit);
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
          <GamesNaviContainer />
        </Sider>
        <Content style={{
          marginLeft: 200,  // sider width is 200
        }}>
          <LivesContainer />
        </Content>
      </Layout>
    );
  }
}

export default Home;