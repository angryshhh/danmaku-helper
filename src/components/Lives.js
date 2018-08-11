import React, { Component } from 'react';
import { Col, Row } from 'antd';
import RoomThumbnail from './RoomThumbnail';

class Lives extends Component {
  render() {
    const { rooms } = this.props;
    const rows = Math.trunc(rooms.length / 4) + 1;
    const rowsArr = [];
    for(let i = 0; i < rows; i++) {
      rowsArr.push(<Row key={i}>
        {
          rooms.slice(i * 4, i * 4 + 4).map(room => <Col span={6} key={room.room_id}><RoomThumbnail room={room} /></Col>)
        }
      </Row>);
    }
    return (
      <div>
        {rowsArr}
      </div>
    );
  }
}

export default Lives;