import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Popover, Button, message, Tag, Row, Col, InputNumber } from 'antd';
import io from 'socket.io-client';
import Danmakus from './Danmakus';
import { getNoble } from '../utils/danmakuUtils';
import { changeNobleDanmakuFilter } from '../redux/actions';

const { Header, Content, Footer } = Layout;

const DanmakusContainer = connect(
  state => ({
    danmakus: state.danmakus,
    title: '弹幕',
  })
)(Danmakus);

const FilteredDanmakusContainer = connect(
  state => ({
    danmakus: state.filteredDanmakus,
    nobleDanmakuFilter: state.nobleDanmakuFilter,
    title: '过滤弹幕',
  }),
  dispatch => ({
    changeNobleDanmakuFilter: (nobleLevel) => {
      dispatch(changeNobleDanmakuFilter(nobleLevel));
    },
  })
)(Danmakus);

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nobleList: [],
      nobleInfo: {},
    };

    // this.socket = io('http://192.168.1.195:3010', { autoConnect: false });
    // this.socket = io('http://localhost:3010', { autoConnect: false });
    // socket request begin with '/sokect.io', handle it in proxy in package.json
    this.socket = io('', { autoConnect: false });
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
          // this.setState({
          //   danmakus: [...this.state.danmakus.slice(-399), data],  // limit the danmaku list length to 400
          // });
          this.props.receiveDanmaku(data);
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
            // if(parseInt(data.nl, 10) < 7 || parseInt(data.fl, 10) > 10) {
          if(parseInt(data.nl, 10) % 7 >= this.props.nobleEnterMessageFilter){
            message.open({
              content: `${data.nn} 进入房间`,
              duration: 2 ** (parseInt(data.nl, 10) % 7 + 1),
              icon: data.nl ? <Tag color={getNoble(data.nl).tagColor}>{getNoble(data.nl).name}</Tag>  : null,
            });
            // console.log(`${data.nl ? `${getNoble(data.nl)} ` : ''}${data.nn} 进入房间${data.fl ? `，粉丝等级${data.fl}` : ''}`);
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

  render() {
    return (
      <Layout style={{
        // height: '100%',
        height: '100vh',
      }}>
        <Header>
          <Popover placement='bottom' title='贵族top20' content={this.state.nobleList.map(noble => <p key={noble.uid}>{getNoble(noble.ne).name} {noble.nn}</p>)}>
            <Button>贵族</Button>
          </Popover>
          <span style={{color: 'pink'}}>贵族进入提醒初始等级</span><InputNumber min={0} max={6} step={1} size='small' value={this.props.nobleEnterMessageFilter} onChange={value => {this.props.changeNobleEnterMessageFilter(value)}} />
        </Header>
        {/* <Danmakus danmakus={this.state.danmakus} /> */}
        <Layout style={{height: '100%', overflow: 'auto', backgroundColor: 'pink'}}>
          {/* <Content style={{height: '100%', overflow: 'auto'}}> */}
            <Row style={{height: '100%', overflow: 'auto'}}>
              <Col span={12} style={{height: '100%', overflow: 'auto'}}><DanmakusContainer /></Col>
              <Col span={12} style={{height: '100%', overflow: 'auto'}}><FilteredDanmakusContainer /></Col>
            </Row>
          {/* </Content> */}
        </Layout>
        <Footer style={{backgroundColor: 'black'}}>Footer</Footer>
      </Layout>
    );
  }
}

export default Room;