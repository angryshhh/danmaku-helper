import React, { Component } from 'react';
import { Card, Slider, Popover, Button, InputNumber } from 'antd';
import { getNoble, nobleMarksForSlider } from '../utils/danmakuUtils';

class Danmakus extends Component {
  
  render() {
    let filters;
    if(this.props.title === '过滤弹幕') {
      filters = <Popover content={[
        // <Slider
        //   marks={nobleMarksForSlider()}
        //   value={this.props.nobleDanmakuFilter}
        //   onChange={value => {this.props.changeNobleDanmakuFilter(value);}}
        //   defaultValue={6} min={0} max={6} dots={true} />,
        '贵族起始等级：',
        <InputNumber
          value={this.props.nobleDanmakuFilter}
          onChange={value => this.props.changeNobleDanmakuFilter(value)}
          min={0} max={6} step={1} size='small' />,
        <br />,
        '弹幕数量：',
        <InputNumber
          value={this.props.filteredDanmakusLimit}
          onChange={value => this.props.changeFilteredDanmakusLimit(value)}
          min={50} max={500} step={50} size='small' />,
        <br />,
      ]} title='过滤条件' placement='leftTop' trigger='click'>
        <Button size='small'>过滤条件</Button>
      </Popover>;
    } else {
      filters = <Popover content={[
        '弹幕数量：',
        <InputNumber
          value={this.props.danmakusLimit}
          onChange={value => this.props.changeDanmakusLimit(value)}
          min={50} max={500} step={50} size='small' />,
        <br />,
      ]} title='弹幕数量' placement='leftTop' trigger='click'>
        <Button size='small'>弹幕数量</Button>
      </Popover>
    }
    return (
      
      <Card
        title={this.props.title}
        extra={filters}
        style={{height: '100%', paddingTop: 50, overflow: 'auto'}}
        headStyle={{height: 50, marginTop: -50}}
        bodyStyle={{height: '100%', overflow: 'auto', padding: 0}}
      >
        {
          // this.props.danmakus.map((danmaku, index) => <p key={danmaku.cid} style={{margin: '0 auto'}}>{index}
          this.props.danmakus.map((danmaku, index) => <p key={index} style={{margin: '0 auto'}}>
            {/* {index} */}
            {/* {danmaku.nl ? <Tag color={getNoble(danmaku.nl).tagColor}>{getNoble(danmaku.nl).name}</Tag> : null} */}
            {danmaku.nl ? <span style={{backgroundColor: getNoble(danmaku.nl).tagColor}}>{getNoble(danmaku.nl).name}</span> : null}
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