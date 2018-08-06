/**
 * returns a buffer which has a head field according to the douyu protocol and a data field transferred from a serialed string.
 * 
 * @param {String} serializedString string serialed by douyu STT
 * @returns buffer to send
 */
function createTCPMessage(serializedString) {
  const head = Buffer.allocUnsafe(12); // head field
  head.writeInt16LE(689, 8); // message source field, 689 stands for client to danmaku server
  head.writeInt8(0, 10);  // encrycption field, not used, defaults 0
  head.writeInt8(0, 11);  // reserved field, not used, defaults 0

  const data = Buffer.from(`${serializedString}\0`); // data end with '\0'

  const message = Buffer.concat([head, data]);  // combain head and data, 
  message.writeInt32LE(message.length - 4, 0);  // message length. according to the returned message, it has to minus 4, confused
  message.writeInt32LE(message.length - 4, 4);  // repeat message length
  
  return message;
}

/**
 * returns a obj transferred from the received buffer
 * @param {Buffer} receivedBuffer 
 */
function parseTCPMessage(receivedBuffer) {
  const dataStr = receivedBuffer.toString('utf8', 12);  // remove head field
  return deSTT(dataStr);
}

function deSTT(dataStr) {
  const obj = {};
  dataStr.split('/').map(keyVal => {  // '/' ends key@=value
    if(keyVal.length > 2) { // not an empty string which is after the last '/'
      const key = keyVal.split('@=')[0];
      const valStr = keyVal.split('@=')[1].replace(/@S/g, '/').replace(/@A/g, '@'); // data has been STTed, translated it back
      if(valStr.indexOf('@S/') === -1) {  // this value is not an array
        Object.assign(obj, {[key]: valStr});
      } else {  // this value is an array, which contains '@S/' because '/' ending the last key-value has become '@S' and an array element ends with '/'
        Object.assign(obj, {[key]: valStr.split('/').map(arrElem => {
          if(arrElem.length > 1) {
            return deSTT(arrElem.replace(/@S/g, '/').replace(/@A/g, '@'));  // deSTT each array element
          }
        })});
      }
    }
  });
  return obj;
}

// export { createTCPMessage, parseTCPMessage };
module.exports = {
  createTCPMessage: createTCPMessage,
  parseTCPMessage: parseTCPMessage
};