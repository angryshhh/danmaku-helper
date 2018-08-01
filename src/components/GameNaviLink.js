import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameNaviLink extends Component {
  //TODO: link active style
  render() {
    const { game } = this.props;
    return <Link to={`/games/${game.short_name}`}>{game.game_name}</Link>;
  }
}

export default GameNaviLink;