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
        case 'dgb':
          if(data.bg)
            console.log(`${data.nn}送了${data.gfid}礼物X${data.hits}，显示为${data.gs}，特效${data.eid}，大小礼物${data.bg}`);
          // gfid: 824粉丝荧光棒, 192赞， 714怂， 193弱鸡， 520稳， 191鱼丸
          // 我他妈不研究了，在弹幕里一个一个扒（我是不是应该学个爬虫），还是大礼物好找
          // 447办卡，195飞机，显示为5，特效63，大小礼物1
          break;
        case 'spbc':
          if(data.rid === this.props.match.params.roomId)
            console.log(data);
          break;
        case 'uenter':
          // if(data.nl || data.fl > '10' || data.level > '20'){
          if(data.nl < '7' || data.fl > '10') {
            console.log(`用户${data.nn}进入房间，贵族${data.nl}，粉丝等级${data.fl}，用户等级：${data.level}`);
            // console.log(data);
          }
          break;
        default:
          console.log(data);
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
            // return <li key={item.cid}>
            return <li>
              {item.nl ? `贵族${item.nl} ` : ''}{item.bnn.length ? `[${item.bnn}${item.bl}] ` : ''}{item.nn}(lv.{item.level}): {item.txt}
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Room;