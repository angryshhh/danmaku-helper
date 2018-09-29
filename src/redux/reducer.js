const initialState = {
  // games: {}, // game id as key
  games: [],
  // lives: {}, // current rooms, room id as key
  lives: [],
  chosenGame: '',
  offset: 0,
  limit: 30,

  nobleEnterMessageFilter: 0,
  nobleList: [],

  danmakus: [],
  danmakusLimit: 50,

  nobleDanmakuFilter: 0,  // 0-6, 游侠到国王，协议里是7，1-6
  filteredDanmakusLimit: 100,
  filteredDanmakus: [],
}

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'RECEIVE_GAMES':
      return {
        ...state,
        games: action.data,
      };
    case 'RECEIVE_LIVES':
      return {
        ...state,
        lives: action.data,
      };
    case 'CHOOSE_GAME':
      return {
        ...state,
        chosenGame: action.chosenGame,
      };
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
      };
    case 'CHANGE_NOBLE_DANMAKU_FILTER':
      return {
        ...state,
        nobleDanmakuFilter: action.nobleLevel,
      };
    case 'CHANGE_NOBLE_ENTER_MESSAGE_FILTER':
      return {
        ...state,
        nobleEnterMessageFilter: action.nobleLevel,
      };
    case 'CHANGE_DANMAKUS_LIMIT':
      return {
        ...state,
        danmakusLimit: action.limit,
      };
    case 'CHANGE_FILTERED_DANMAKUS_LIMIT':
      return {
        ...state,
        filteredDanmakusLimit: action.limit,
      };
    case 'RECEIVE_NOBLE_LIST':
      return {
        ...state,
        nobleList: action.nobleList,
      };
    default:
      return state;
  }
}