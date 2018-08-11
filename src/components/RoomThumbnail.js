import React, { Component } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

 const { Meta } = Card;

class RoomThumbnail extends Component {
  render() {
    const { room } = this.props;
    return (
      <Card
        title={room.room_name}
        extra={<a href={room.url} target='_blank'>直播间</a>}
        cover={<Link to={`/room/${room.room_id}`}><img width='100%' alt={room.room} src={room.room_src} /></Link>}
        // bordered={false}
      >
        {/* <span>主播：{room.nickname}</span>
        <span style={{float: 'right'}}>热度：{room.hn}</span> */}
        <Meta
          title={`主播：${room.nickname}`}
          description={`热度：${room.hn}`}
        />
      </Card>
    );
  }
}
export default RoomThumbnail;