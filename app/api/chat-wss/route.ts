const http = require('http')
const WebSocket = require('ws')

export default (req, res) => {
  const server = http.createServer((req, res) => {
    res.end('I am connected.')
  })

  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws) => {
    // 建立 WebSocket 连接后，向客户端发送一条欢迎消息
    ws.send('Welcome to WebSocket server!')

    // 模拟实时更新数据
    const intervalId = setInterval(() => {
      const data = {
        time: new Date(),
        message: 'hello world'
      }
      ws.send(JSON.stringify(data))
    }, 1000)

    // 处理 WebSocket 关闭事件
    ws.on('close', () => {
      clearInterval(intervalId)
    })
    // 处理各种 WebSocket 消息
    ws.on('message', (message) => {
      console.log(`Received message from client: ${message}`)
      const response = `Server received your message: ${message}`
      ws.send(response)
    })
  })

  server.listen(80, () => {
    console.log(`WebSocket server is running at ws://localhost:${process.env.PORT}/`)
  })

  // 防止翻墙API代理
  res.setHeader('Access-Control-Allow-Origin', '*')
}
