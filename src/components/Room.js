import React, { Component } from 'react';
import { Layout, Popover, Button, message } from 'antd';
import io from 'socket.io-client';
import Danmakus from './Danmakus';

const { Header, Content, Footer, Sider} = Layout;
class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danmakus: [],
      nobleList: [],
      nobleInfo: {},
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
            message.success(`${data.nn}送了${data.gfid}礼物X${data.hits}，显示为${data.gs}，特效${data.eid}，大小礼物${data.bg}`);
            // console.log(`${data.nn}送了${data.gfid}礼物X${data.hits}，显示为${data.gs}，特效${data.eid}，大小礼物${data.bg}`);
          // gfid: 824粉丝荧光棒, 192赞， 714怂， 193弱鸡， 520稳， 191鱼丸
          // 我他妈不研究了，在弹幕里一个一个扒（我是不是应该学个爬虫），还是大礼物好找
          // 447办卡，195飞机，显示为5，特效63，大小礼物1
          // 1571超大丸星
          break;
        case 'spbc':
          if(data.rid === this.props.match.params.roomId)
            console.log(`广播：${data.sn} 送给${data.dn} ${data.gc}个${data.gn}`);
          break;
        case 'bgbc':
          if(data.rid === this.props.match.params.roomId)
            console.log(data);
          break;
        case 'uenter':
          // if(data.nl || data.fl > '10' || data.level > '20'){
          if(parseInt(data.nl, 10) < 7 || parseInt(data.fl, 10) > 10) {
            message.success(`${data.nl ? `${this.getNobleName(data.nl)} ` : ''}${data.nn} 进入房间${data.fl ? `，粉丝等级${data.fl}` : ''}`);

            // console.log(`${data.nl ? `${this.getNobleName(data.nl)} ` : ''}${data.nn} 进入房间${data.fl ? `，粉丝等级${data.fl}` : ''}`);
            // console.log(data);
          }
          break;
        case 'online_noble_list':
          this.setState({nobleList: data.nl});
          break;
        case 'noble_num_info':
          this.setState({nobleInfo: data});
          break;
        case 'newblackres':
          console.log(`${data.otype === '1' ? '房管' : data.otype === '2' ? '主播' : data.otype === '3' ? '超管' : ''} ${data.snic} 封了 ${data.dnic} 直到${data.endtime}`);
          break;
        case 'txboxb':
          // what is it
          break;
        case 'synexp':
          // what is it
          break;
        case 'tsgs':
          // what is it
          break;
        case 'anbc':
          // what is it
          break;
        case 'qausrespond':
          // what is it
          break;
        case 'rnewbc':
          // what is it
          break;
        case 'rquizisn':
          // what is it
          break;
        case 'ssd':
          // super danmaku for jump, useless
          break;
        case 'srres':
          // share this room
          break;
        case 'blab':
          console.log(`${data.nn} 的粉丝牌升级为${data.bnn}${data.bl}`);
          break;
        case 'upgrade':
          if(data.level > 20) {
            console.log(`用户${data.nn}升级为${data.level}`);
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

  getNobleName(nobleLevel) {
    switch(nobleLevel) {
      case '7':
        return '游侠';
      case '6':
        return '皇帝';
      case '5':
        return '国王';
      case '4':
        return '公爵';
      case '3':
        return '伯爵';
      case '2':
        return '子爵';
      case '1':
        return '骑士';
      default:
        return '';
    }
  }

  render() {
    return (
      <Layout style={{
        height: '100%',
      }}>
        <Header style={{
          position: 'fixed',
          top: 0,
          width: '100vw',
        }}>
          <Popover placement='bottom' title='贵族top20' content={this.state.nobleList.map(noble => <p>{this.getNobleName(noble.ne)} {noble.nn}</p>)}>
            <Button>贵族</Button>
          </Popover>
        </Header>
        <Content style={{marginTop: 64}}><Danmakus danmakus={this.state.danmakus} /></Content>
        <Footer>Footer</Footer>
      </Layout>
      // <div>
      //   <h1>room {this.props.match.params.roomId}</h1>
      //   <h2>top贵族</h2>
      //   <span>
      //     {
      //       this.state.nobleInfo.list ?
      //       `${this.state.nobleInfo.list.map(item => {
      //         return `${this.getNobleName(item.lev)}${item.num}个 `;
      //       })},共${this.state.nobleInfo.sum}个贵族`: null
      //     }
      //   </span>
      //   <ul>
      //     {
      //       this.state.nobleList.map(noble => {
      //         return <li>
      //           {this.getNobleName(noble.ne)} {noble.nn}
      //         </li>;
      //       })
      //     }
      //   </ul>
      //   <h2>弹幕</h2>
      //   <ul>
      //     {this.state.danmakus.map(item => {
      //       // return <li key={item.cid}>
      //       return <li>
      //         {item.nl ? `贵族${item.nl} ` : ''}{item.bnn.length ? `[${item.bnn}${item.bl}] ` : ''}{item.nn}(lv.{item.level}): {item.txt}
      //       </li>;
      //     })}
      //   </ul>
      // </div>
    );
  }
}

export default Room;