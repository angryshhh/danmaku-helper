import React, { Component } from 'react';
import { Card, Input, Tag } from 'antd';

const { TextArea } = Input;

class Danmakus extends Component {
  render() {
    return (
      <TextArea
        autosize='true'
        value={this.props.danmakus.map(danmaku => {
          return `${danmaku.nl ? `贵族${danmaku.nl} ` : ''}${danmaku.bnn.length ? `[${danmaku.bnn}${danmaku.bl}] ` : ''}${danmaku.nn}(lv.${danmaku.level}): ${danmaku.txt}`;
        }).join('\n')} 
      />

      // <Card
      //   title='弹幕'
      // >
      //   {
      //     this.props.danmakus.map(danmaku => <p>
      //       {danmaku.nl ? `贵族${danmaku.nl} ` : ''}{danmaku.bnn.length ? `[${danmaku.bnn}${danmaku.bl}] ` : ''}{danmaku.nn}(lv.{danmaku.level}): {danmaku.txt}
      //     </p>)
      //   }
      // </Card>
    );
  }
}

export default Danmakus;