import React, { Component } from 'react';
import { Card } from 'antd';

class Danmakus extends Component {
  render() {
    return (
      <Card
        title='弹幕'
      >
        {
          this.props.danmakus.map(danmaku => <p>
            {danmaku.nl ? `贵族${danmaku.nl} ` : ''}{danmaku.bnn.length ? `[${danmaku.bnn}${danmaku.bl}] ` : ''}{danmaku.nn}(lv.{danmaku.level}): {danmaku.txt}
          </p>)
        }
      </Card>
    );
  }
}

export default Danmakus;