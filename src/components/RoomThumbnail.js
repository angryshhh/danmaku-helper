import React, { Component } from 'react';

class RoomThumbnail extends Component {
  render() {
    const { room } = this.props;
    return (
      <div>
        <span>id：{room.room_id}</span>
        <span><a href={room.url} target='_blank'>房间名：{room.room_name}</a></span>
        <span>主播：{room.nickname}</span>
        <span>热度：{room.hn}</span>
        <img src={room.room_src} width='180' height='100' alt={room.room_name}/>
      </div>
    );
  }
}
export default RoomThumbnail;