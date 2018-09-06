export default function loadGames() {
  return dispatch => {
    return fetch('/RoomApi/game').then((response => {
      response.json().then(result => {
        if(!result.error) {
          dispatch({
            type: 'RECEIVE_GAMES',
            data: result.data,
          });
        } else {
          
        }
      })
    })).catch(err => {
      
    });
  }
}