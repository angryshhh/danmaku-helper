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
  // find out that the some of the data received from danmaku server consist of several messages
  // it's hard to separate them and sometime it causes shard, which i cannot handle
  // so here I only accept the first message with a head in a tcp data field

  const obj = {};
  const dataStr = receivedBuffer.toString('utf8', 12);  // remove head field
  //console.log(dataStr.replace(/@A+/g, '@').replace(/@S/g, '/'));
  dataStr.replace(/@A+/g, '@').replace(/@S/g, '/').split('/').map(value => {
    if(value.length > 1) {  // remove the last string caused by the last '/'
      Object.assign(obj, {[value.split('@=')[0]]: value.split('@=')[1]});
    }
  });

  return obj;
}

// export { createTCPMessage, parseTCPMessage };
module.exports = {
  createTCPMessage: createTCPMessage,
  parseTCPMessage: parseTCPMessage
};