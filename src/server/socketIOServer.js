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
      const obj = parseTCPMessage(tcpSocketData);
      switch(obj.type) {
        case 'loginres':
          tcpSocket.write(createTCPMessage(`type@=joingroup/rid@=${reactSocketData}/gid@=-9999/`));
          heartbeatTimer = setInterval(() => {
            console.log('send heartbeat to danmaku server');
            tcpSocket.write(createTCPMessage('type@=mrkl/'));
          }, 45000);
          break;
        case 'pingreq':
          console.log(`danmaku server heartbeat back at ${obj.tick}`);
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