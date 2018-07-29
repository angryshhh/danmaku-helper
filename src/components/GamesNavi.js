import React, { Component } from 'react';
import GameNaviLink from './GameNaviLink';

class GamesNavi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewAll: false,
    }
    this.handleViewAll = this.handleViewAll.bind(this);
  }

  handleViewAll() {
    this.setState({
      viewAll: !this.state.viewAll,
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.games.map((value, index, array) => {
            return index < 20 || this.state.viewAll ? (
              <li key={value.cate_id}>
                <GameNaviLink game={value} />
              </li>
            ) : null;
          })}
        </ul>
        <button onClick={this.handleViewAll}>{this.state.viewAll ? '收缩' : '全部'}</button>
      </div>
    );
  }
}

export default GamesNavi;