const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: 8002
});

wss.on('connection', (ws) => {
  console.log("websocket connection");
  // When you receive a message, send that message to every socket.
  ws.on('message', (data) => {
    let msg = JSON.parse(data);
    if (msg.type === 'all') {
      wss.clients.forEach(client => {
        if (client !== ws) client.send(msg.data)
      });
    } else {
      console.log(msg);
      ws.send(msg.data);
    }
  });

  // When a socket closes, or disconnects, remove it from the array.
  ws.on('close', function () {
    console.log("connection closed:");
  });
});