const HOST = 'https://aleksandr2639.onrender.com/';

export default class ChatAPI {
  constructor() {
    this.ws = new WebSocket('wss://aleksandr2639.onrender.com/ws');
  }
  create(userName, callback) {
    fetch(`${HOST}new-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userName }),
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  start(callback) {
    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      console.log(data)
      callback(data);
    });
  }

  send(message) {
    this.ws.send(JSON.stringify({
      type: 'send',
      text: message.text,
      name: message.name,
    }));
  }

  close(userName) {
    if (this.ws) {
      this.ws.send(JSON.stringify({
        user: {
          name: userName,
        },
        type: 'exit',
      }));
      this.ws.close();
    }
  }
}
