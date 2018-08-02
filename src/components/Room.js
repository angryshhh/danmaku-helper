import React, { Component } from 'react';
import io from 'socket.io-client';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danmakus: [],
    };

    this.socket = io('http://localhost:3010', { autoConnect: false });
    this.socket.on('connect', () => {
      console.log('connect');
      this.socket.emit('roomId', this.props.match.params.roomId);
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });

    // handle danmaku
    // this.socket.on('chatmsg', data => {
    //   // console.log(data);
    //   this.setState({
    //     danmakus: [...this.state.danmakus, data],
    //   });
    // });

    this.socket.on('message', data => {
      switch(data.type) {
        case 'chatmsg':
          this.setState({
            danmakus: [...this.state.danmakus.slice(-39), data],  // limit the danmaku list length to 40
          });
          break;
        default:
          console.log(data.type);
          break;
      }
    });

  }

  componentDidMount() {
    this.socket.open();
    
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div>
        <h1>room {this.props.match.params.roomId}</h1>
        <ul>
          {this.state.danmakus.map(item => {
            return <li key={item.cid}>
              {item.nl ? `贵族${item.nl} ` : ''}{item.bnn.length ? `[${item.bnn}${item.bl}] ` : ''}{item.nn}(lv.{item.level}): {item.txt}
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Room;