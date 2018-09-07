const initialState = {
  // games: {}, // game id as key
  games: [],
  // lives: {}, // current rooms, room id as key
  lives: [],
  chosenGame: '',
  offset: 0,
  limit: 30,
}

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'RECEIVE_GAMES':
      return {
        ...state,
        games: action.data,
      }
    case 'RECEIVE_LIVES':
      return {
        ...state,
        lives: action.data,
      }
    case 'CHOOSE_GAME':
      return {
        ...state,
        chosenGame: action.chosenGame,
      }
    default:
      return state;
  }
}