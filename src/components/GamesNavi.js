import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

class GamesNavi extends Component {
  render() {
    console.log(this.props);
    return (
      <Menu selectedKeys={[this.props.selectedGame]}>
        {
          this.props.games.map(value => <Menu.Item key={value.short_name}>
            <Link to={`/games/${value.short_name}`}>{value.game_name}</Link>
          </Menu.Item>)
        }
      </Menu>
    );
  }
}

export default GamesNavi;