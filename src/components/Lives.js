import React, { Component } from 'react';
import RoomThumbnail from './RoomThumbnail';

class Lives extends Component {
  render() {
    return (
      <ul>
        {this.props.rooms.map(room => {
          return (<li key={room.room_id}>
            <RoomThumbnail room={room} />
          </li>);
        })}
      </ul>
    );
  }
}

export default Lives;