const initialState = {
  // games: {}, // game id as key
  games: [],
  // lives: {}, // current rooms, room id as key
  lives: [],
  chosenGame: '',
  offset: 0,
  limit: 30,

  danmakus: [],
  danmakusLimit: 60,

  nobleDanmakuFilter: 3,  // 0-6, 游侠到国王，协议里是7，1-6
  filteredDanmakusLimit: 100,
  filteredDanmakus: [],
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
    case 'RECEIVE_DANMAKU':
      let { danmaku } = action;
      let danmakus = [...state.danmakus.slice(1 - state.danmakusLimit), danmaku];
      let filteredDanmakus = state.filteredDanmakus;
      if(danmaku.nl && parseInt(danmaku.nl, 10) % 7 >= state.nobleDanmakuFilter) {
        filteredDanmakus = [...filteredDanmakus.slice(1 - state.filteredDanmakusLimit), danmaku];
      }
      return {
        ...state,
        danmakus,
        filteredDanmakus,
      }
    case 'CHANGE_NOBLE_DANMAKU_FILTER':
      return {
        ...state,
        nobleDanmakuFilter: action.nobleLevel,
      }
    default:
      return state;
  }
}