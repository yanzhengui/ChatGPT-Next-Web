import { createParser } from 'eventsource-parser';
import http from 'http'
import { NextRequest } from 'next/server';
import WebSocket from 'ws'

async function createStream(req: NextRequest) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let apiKey = process.env.OPENAI_API_KEY;

  const userApiKey = req.headers.get("token");
  if (userApiKey) {
    apiKey = userApiKey;
    console.log("[Stream] using user api key");
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: req.body,
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: any) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return stream;
}

export async function POST() {
  const server = new WebSocket.Server({ port: 80 });
  server.on('connection', (socket: WebSocket) => {
    console.log('connection established');
  
    // 在连接建立后，处理客户端发送的消息
    socket.on('message', (data: WebSocket.Data) => {
      console.log(`received: ${data}`);
      
      // 接收到消息后，在此处编写相应逻辑处理逻辑，并将结果通过 send 方法发送给客户端
      socket.send('response to client');
    });
  
    // 连接断开时的处理
    socket.on('close', () => {
      console.log('connection closed');
    });
  });

  server.addListener('listening', () => {
    console.log('WebSocket server is listening on port 80...');
  });
}

export const config = {
  runtime: "edge",
};

