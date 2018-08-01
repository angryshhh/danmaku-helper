const Koa = require('koa');
const app = new Koa();
const net = require('net');
// import { createTCPMessage, analyzeTCPMessage } from '../utils/danmakuTCPUtils';
const { createTCPMessage, analyzeTCPMessage } = require('../utils/danmakuTCPUtils');

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.req.url}`);
  await next();
});

app.use(async (ctx, next) => {

  const client = net.createConnection({
    port: 8601,
    host: 'openbarrage.douyutv.com',
  }, () => {
    console.log('connected to server');
    client.write(createTCPMessage('type@=loginreq/roomid@=475252/'));
  });
  client.on('data', data => {
    // console.log('recieve data');
    const obj = analyzeTCPMessage(data);
    switch(obj.type) {
      case 'loginres':
        client.write(createTCPMessage('type@=joingroup/rid@=475252/gid@=-9999/'));
        break;
      case 'chatmsg':
        console.log(`${obj.nn}(lv${obj.level}): ${obj.txt}`);
        break;
      default:
        //console.log(obj);
        break;
    }
  });
  client.on('end', () => {
    console.log('disconnected from server');
  });

});

app.listen(3010);