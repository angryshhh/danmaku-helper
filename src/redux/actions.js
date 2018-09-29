export function loadGames() {
  return dispatch => {
    return fetch('/api/RoomApi/game').then(response => {
      response.json().then(result => {
        if(!result.error) {
          dispatch({
            type: 'RECEIVE_GAMES',
            data: result.data,
          });
        } else {
          
        }
      });
    }).catch(err => {
      
    });
  }
}

export function loadLives(gameShortName, offset, limit) {
  let req = (gameShortName && gameShortName.length > 0) ?
    `/api/RoomApi/live/${gameShortName}?offset=${offset}&limit=${limit}` :
    `/api/RoomApi/live?offset=${offset}&limit=${limit}`;
  return dispatch => {
    return fetch(req).then(response => {
      response.json().then(result => {
        if(!result.error) {
          dispatch({
            type: 'RECEIVE_LIVES',
            data: result.data,
          });
        } else {

        }
      });
    }).catch(err => {

    });
  }
}

export function chooseGame(chosenGame) {
  return {
    type: 'CHOOSE_GAME',
    chosenGame,
  };
}

export function receiveDanmaku(danmaku) {
  return {
    type: 'RECEIVE_DANMAKU',
    danmaku,
  };
}

export function changeNobleDanmakuFilter(nobleLevel) {
  return {
    type: 'CHANGE_NOBLE_DANMAKU_FILTER',
    nobleLevel,
  };
}

export function changeNobleEnterMessageFilter(nobleLevel) {
  return {
    type: 'CHANGE_NOBLE_ENTER_MESSAGE_FILTER',
    nobleLevel,
  };
}

export function changeDanmakusLimit(limit) {
  return {
    type: 'CHANGE_DANMAKUS_LIMIT',
    limit,
  };
}

export function changeFilteredDanmakusLimit(limit) {
  return {
    type: 'CHANGE_FILTERED_DANMAKUS_LIMIT',
    limit,
  };
}

export function receiveNobleList(nobleList) {
  return {
    type: 'RECEIVE_NOBLE_LIST',
    nobleList,
  };
}