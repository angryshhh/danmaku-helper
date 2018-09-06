const initialState = {
  // games: {}, // game id as key
  games: [],
  rooms: {}, // current rooms, room id as key
  damakus: [],
  gifts: [],
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'RECEIVE_GAMES':
      return {
        ...state,
        games: action.data,
      }
    default:
      return state;
  }
}

function loadGames() {
  fetch('/RoomApi/game').then((response => {
    response.json().then(result => {
      if(!result.error) {
        console.log(result.data);
        return result.data;
      } else {
        console.log(result.data);
        return [];
      }
    })
  })).catch(err => {
    console('games fetch failed');
    return [];
  });
}