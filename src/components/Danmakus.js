import React, { Component } from 'react';
import { Card, Input, Tag } from 'antd';
import { getNoble } from '../utils/danmakuUtils';

const { TextArea } = Input;

const noMargin = {
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
}

class Danmakus extends Component {
  render() {
    return (
      

      <Card
        title='弹幕'
        // contentEditable='true'
      >
        {
          this.props.danmakus.map(danmaku => <p style={noMargin}>
            {danmaku.nl ? <Tag color={getNoble(danmaku.nl).tagColor} style={noMargin}>{getNoble(danmaku.nl).name}</Tag> : null}
            {danmaku.bnn.length ? `[${danmaku.bnn}${danmaku.bl}] ` : ''}
            {/* <Tag color='#2db7f5' style={noMargin}>lv.{danmaku.level}</Tag>  */}
            <span style={{color: 'white', backgroundColor: '#2db7f5'}}>&nbsp;lv.{danmaku.level}&nbsp;</span>&nbsp;
            <span style={{color: '#2db7f5'}}>{danmaku.nn}：</span>
            <b>{danmaku.txt}</b>
          </p>)
        }
        {/* <TextArea
          autosize='true'
          value={this.props.danmakus.map(danmaku => {
            return `${danmaku.nl ? `贵族${danmaku.nl} ` : ''}${danmaku.bnn.length ? `[${danmaku.bnn}${danmaku.bl}] ` : ''}${danmaku.nn}(lv.${danmaku.level}): ${danmaku.txt}`;
          }).join('\n')} 
        /> */}
      </Card>
    );
  }
}

export default Danmakus;