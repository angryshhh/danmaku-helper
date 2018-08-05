/**
 * soket.io to communicate with react
 * net(tcp) to communicate with danmaku server
 */
const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

const net = require('net');
// import { createTCPMessage, parseTCPMessage } from '../utils/danmakuTCPUtils';
const { createTCPMessage, parseTCPMessage } = require('../utils/danmakuTCPUtils');

io.on('connection', reactSocket => {
  let heartbeatTimer = -1;
  let tempBuffer = Buffer.alloc(0);
  const tcpSocket = new net.Socket();

  console.log(`connected with react ${reactSocket.client.id}`);
  reactSocket.on('roomId', reactSocketData => {

    tcpSocket.connect({
      port: 8601,
      host: 'openbarrage.douyutv.com',
    }, () => {
      console.log('connected to danmaku server');
      tcpSocket.write(createTCPMessage(`type@=loginreq/roomid@=${reactSocketData}/`));
    });

    tcpSocket.on('data', tcpSocketData => {
      // console.log(`buffer received length: ${tcpSocketData.length}`);

      tempBuffer = Buffer.concat([tempBuffer, tcpSocketData]);
      if((tempBuffer.readInt32LE(0) + 4) <= tempBuffer.length) {
        let beginIndex = 0;
        while(beginIndex < tempBuffer.length - 12) {  // at least there is a head feild which is 12 bytes
          const endIndex = tempBuffer.readInt32LE(beginIndex) + 4 + beginIndex;
          if(endIndex > tempBuffer.length) {
            break;  // not a complete message from the beginIndex
          }
          const tempTempBuffer = tempBuffer.slice(beginIndex, endIndex);

          const obj = parseTCPMessage(tempTempBuffer);
          switch(obj.type) {
            case 'loginres':
              tcpSocket.write(createTCPMessage(`type@=joingroup/rid@=${reactSocketData}/gid@=-9999/`));
              heartbeatTimer = setInterval(() => {
                console.log('send heartbeat to danmaku server');
                tcpSocket.write(createTCPMessage('type@=mrkl/'));
              }, 45000);
              break;
            case 'pingreq':
              console.log(`danmaku server pingreq at ${obj.tick}`);
              break;
            case 'error':
              console.log(obj);
              break;
            case 'ranklist':
              console.log('handle ranklist');
              break;
            case 'ruclp':
              console.log('handle 用户点赞推送通知消息');
              break;
            case 'online_noble_list':
              console.log('handle 房间贵族列表广播消息');
              console.log(obj);
              break;
            case 'ul_ranklist':
              console.log('handle 房间用户等级排行榜');
              break;
            case 'frank':
              console.log('handle 粉丝排行榜消息');
              break;
            default:
              if(obj.type) {
                // reactSocket.emit(obj.type, obj);
                reactSocket.send(obj);
              } else {
                console.log('this message has no type');
                // console.log(obj);
              }
              break;
          }

          beginIndex = endIndex;
        }

        tempBuffer = tempBuffer.slice(beginIndex);
      } else {
        // tempBuffer is not completed, do nothing to waiting next data
      }
    });

    tcpSocket.on('end', () => {
      console.log('end danmaku server');
    });

    tcpSocket.on('close', () => {
      console.log('close danmaku server');
    });

  });

  reactSocket.on('disconnect', () => {
    clearInterval(heartbeatTimer);

    reactSocket.disconnect(true);  // component start the disconnection of the socket, server has to close it too, and the 'true' is required, check it on the api
    console.log(`disconnected from react ${reactSocket.client.id}`);

    tcpSocket.end(createTCPMessage('type@=logout/'));  // it will receive error message, not knowing why
    console.log('disconnected from danmaku server');
  });
})

server.listen(3010);