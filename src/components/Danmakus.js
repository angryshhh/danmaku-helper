import React, { Component } from 'react';
import { Card, Input, Tag } from 'antd';
import { getNoble } from '../utils/danmakuUtils';

const { TextArea } = Input;

class Danmakus extends Component {
  render() {
    return (
      <Card
        title='弹幕'
        style={{height: '100%', paddingTop: 50, overflow: 'auto'}}
        headStyle={{height: 50, marginTop: -50}}
        bodyStyle={{height: '100%', overflow: 'auto', padding: 0}}
      >
        {
            this.props.danmakus.map(danmaku => <p style={{margin: '0 auto'}}>
              {danmaku.nl ? <Tag color={getNoble(danmaku.nl).tagColor}>{getNoble(danmaku.nl).name}</Tag> : null}
              {danmaku.bnn.length ? `[${danmaku.bnn}${danmaku.bl}] ` : ''}
              <span style={{color: 'white', backgroundColor: '#2db7f5'}}>&nbsp;lv.{danmaku.level}&nbsp;</span>&nbsp;
              <span style={{color: '#2db7f5'}}>{danmaku.nn}：</span>
              <b>{danmaku.txt}</b>
            </p>)
          }
      </Card>


      // css setting below for two children one with given height(50 for example)
      // and anothor fills the rest of the father and has oversize content needing a scroll
      // and the father's height will not change or has a scroll(but it has to be set overflow: 'auto' too)
      // the father's height can be given or '100%' to fill his father
      // <div style={{height: '100%', paddingTop: 50, overflow: 'auto'}}>
      //   <div style={{height: 50, marginTop: -50}}>title</div>
      //   <div style={{height: '100%', overflow: 'auto'}}>
      //     <p></p> * 999
      //   </div>
      // </div>      
    );
  }
}

export default Danmakus;