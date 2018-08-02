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

io.on('connection', socket => {
  console.log(`connected with react ${socket.client.id}`);
  socket.on('roomId', socketData => {

    const client = net.createConnection({
      port: 8601,
      host: 'openbarrage.douyutv.com',
    }, () => {
      console.log('connected to danmaku server');
      client.write(createTCPMessage(`type@=loginreq/roomid@=${socketData}/`));
    });

    client.on('data', tcpData => {
      // console.log('recieve data');
      const obj = parseTCPMessage(tcpData);
      switch(obj.type) {
        case 'loginres':
          client.write(createTCPMessage(`type@=joingroup/rid@=${socketData}/gid@=-9999/`));
          break;
        // case 'chatmsg':
        //   console.log(`${obj.nn}(lv${obj.level}): ${obj.txt}`);
        //   break;
        case 'error':
          console.log(obj);
          break;
        default:
          //console.log(obj);
          socket.emit(obj.type, obj);
          break;
      }
    });

    client.on('end', () => {
      console.log('disconnected from danmaku server');
    });


    // socket.emit('hello back', 'wode');
  });

  socket.on('disconnect', () => {
    console.log(`disconnected from react ${socket.client.id}`);
  });
})

server.listen(3010);