function onConnection(ws) {
    console.log("A client has connected.");
  
    ws.on("message", (message) => {
      console.log(`Received message => ${message}`);
      // 在接收到数据后，将数据发送回客户端
      ws.send(`Hello, you sent => ${message}`);
    });
  
    ws.on("close", () => {
      console.log("A client has disconnected.");
    });
  }
  
  module.exports = onConnection;
  