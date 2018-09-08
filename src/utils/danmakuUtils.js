export function getNoble(nobleLevel) {
  switch(nobleLevel) {
    case '7':
      return noble('游侠', 'gray', 2);
    case '6':
      return noble('皇帝', 'gold', 60);
    case '5':
      return noble('国王', 'volcano', 50);
    case '4':
      return noble('公爵', 'red', 40)
    case '3':
      return noble('伯爵', 'blue', 30);
    case '2':
      return noble('子爵', 'orange', 20);
    case '1':
      return noble('骑士', 'olive', 10);
    default:
      return noble('', '', 2);
  }
}

function noble(name, tagColor, messageTime){
  return {name, tagColor, messageTime};
}