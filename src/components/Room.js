import React, { Component } from 'react';
import io from 'socket.io-client';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danmakus: [],
    };
  }

  componentDidMount() {
    const socket = io('http://localhost:3010');
    socket.on('connect', () => {
      console.log('connect');
      socket.emit('roomId', this.props.match.params.roomId);
    });
    socket.on('chatmsg', data => {
      console.log(data);
      this.setState({
        danmakus: [...this.state.danmakus, data],
      });
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <div>
        <h1>room {this.props.match.params.roomId}</h1>
        <ul>
          {this.state.danmakus.map(item => {
            return <li>
              {parseInt(item.gt) ? item.gt : null}{item.nn}(lv.{item.level}): {item.txt}
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Room;