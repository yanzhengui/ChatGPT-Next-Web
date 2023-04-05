import { createParser } from 'eventsource-parser';
import http from 'http'
import { NextRequest } from 'next/server';
import WebSocket from 'ws'


const PORT = 80;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ noServer: true });

// 监听 HTTP Upgrade 请求
server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (socket) => {
    wss.emit('connection', socket, req);
  });
});

// 处理 WebSocket 连接
wss.on('connection', (socket: WebSocket) => {
  console.log('WebSocket connection established');

  // 收到消息时的处理逻辑
  socket.on('message', (data: WebSocket.Data) => {
    console.log(`received: ${data}`);

    // 处理完数据后，将结果返回给客户端
    socket.send('response to client');
  });

  // WebSocket 连接关闭时的处理逻辑
  socket.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// 启动 HTTP 服务器
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});


