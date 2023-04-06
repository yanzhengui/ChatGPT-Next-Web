const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const WebSocket = require("ws");
const onConnection = require("./onConnection");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocket.Server({ server });

  wss.on("connection", onConnection);

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3001");
  });
});
