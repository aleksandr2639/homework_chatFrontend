/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Widget.js
class Widget {
  constructor() {
    this.widget = null;
    this.message = null;
    this.form = null;
    this.btnOut = null;
    this.list = null;
    this.input = null;
    this.area = null;
  }
  init() {
    this.drawUI();
  }
  drawUI() {
    this.widget = document.createElement('div');
    this.widget.classList.add('widget-container');
    this.widget.innerHTML = `<h2 class="widget-title">Messenger</h2>
    <button class="widget-button">Exit</button>
    <div class="chat-container">
      <ul class="user-list">List of username
      </ul>
      <div class="chat-area">
        <div class="messages">
        </div>
        <form class="form-message">
          <input type="text" class="input-message">
        </form>
      </div>
    </div>
        `;
    document.querySelector('body').append(this.widget);
    this.form = this.widget.querySelector('.form-message');
    this.btnOut = this.widget.querySelector('.widget-button');
    this.list = this.widget.querySelector('.user-list');
    this.input = this.widget.querySelector('.input-message');
    this.area = this.widget.querySelector('.messages');
  }
  scrollToBottom() {
    this.area.scrollTo(0, this.area.scrollHeight);
  }
}
;// CONCATENATED MODULE: ./src/js/Popup.js
class Popup {
  constructor(container) {
    this.container = container;
    this.popup = null;
    this.input = null;
    this.errorMessage = null;
  }
  init() {
    this.modalUI();
  }
  modalUI() {
    this.popup = document.createElement('div');
    this.popup.classList.add('popup-container');
    this.popup.innerHTML = `
              <form class="popup">
                <h2 class="popup-title-welcome">Welcome</h2>
                <label for="text" class="popup-title">Set a username to get started</label>
                <input id="text" class="input input-name" placeholder="username" required>
                <div class="popup-footer">
                  <div class='error'>This username is already in use</div>
                  <button class="popup-button" type="submit">Enter</button>
                </div>
              </form>`;
    document.querySelector('body').append(this.popup);
    this.input = this.popup.querySelector('.input-name');
    this.errorMessage = this.popup.querySelector('.error');
    this.form = this.popup.querySelector('.popup');
  }
  addPopUpContainer() {
    this.popup.style.display = 'block';
    this.input.value = '';
  }
  removePopUpContainer() {
    this.popup.style.display = 'none';
  }
  showErrorMessage(message) {
    this.errorMessage.textContent = message;
    this.error.classList.add('open');
  }
  hideErrorMessage() {
    this.errorMessage.textContent = '';
    this.error.classList.remove('open');
  }
}
;// CONCATENATED MODULE: ./src/js/api/ChatAPI.js
const HOST = 'https://aleksandr2639.onrender.com/';
class ChatAPI {
  create(userName, callback) {
    fetch(`${HOST}new-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName
      })
    }).then(response => response.json()).then(result => callback(result));
  }
  start(callback) {
    this.ws = new WebSocket('wss://aleksandr2639.onrender.com/ws');
    this.ws.addEventListener('message', e => {
      const data = JSON.parse(e.data);
      callback(data);
    });
  }
  send(message) {
    if (!message) {
      return;
    }
    this.ws.send(JSON.stringify({
      type: 'send',
      text: message.text,
      name: message.name
    }));
  }
  close(userName) {
    if (this.ws) {
      this.ws.send(JSON.stringify({
        user: {
          name: userName
        },
        type: 'exit'
      }));
      this.ws.close();
    }
  }
}
;// CONCATENATED MODULE: ./src/js/Controller.js



class Controller {
  constructor() {
    this.popup = new Popup();
    this.widget = new Widget();
    this.api = new ChatAPI();
    this.containerMes = null;
  }
  init() {
    this.popup.init();
    this.widget.init();
    this.clickBtnPopup();
    this.clickBtnWidget();
    this.clickFormMessage();
  }
  clickBtnPopup() {
    this.popup.form.addEventListener('submit', e => {
      e.preventDefault();
      this.popup.removePopUpContainer();
      this.addUserName();
    });
  }
  clickBtnWidget() {
    this.widget.btnOut.addEventListener('click', e => {
      e.preventDefault();
      this.popup.addPopUpContainer();
      this.api.close(this.userName);
    });
  }
  clickFormMessage() {
    this.widget.form.addEventListener('submit', e => {
      e.preventDefault();
      this.sendMessage();
    });
  }
  addUserName() {
    this.userName = this.popup.input.value;
    this.api.create(this.userName, res => {
      if (res.status !== 'ok') {
        this.showErrorMessage();
        return;
      }
      this.startApp();
    });
  }
  showErrorMessage() {
    this.popup.addPopUpContainer();
    this.popup.errorMessage.style.visibility = 'visible';
  }
  startApp() {
    this.api.start(data => {
      if (Array.isArray(data)) {
        this.createUserList(data);
      } else {
        this.renderMessage(data);
      }
    });
  }
  createUserList(data) {
    this.widget.list.innerHTML = '';
    data.forEach(el => {
      const user = document.createElement('li');
      user.classList.add('user-name');
      user.textContent = el.name === this.userName ? 'You' : el.name;
      user.id = el.id;
      this.widget.list.insertAdjacentElement('beforeend', user);
    });
  }
  sendMessage() {
    const message = this.widget.input.value;
    this.api.send({
      text: message,
      name: this.userName
    });
    this.widget.input.value = '';
  }
  renderMessage(data) {
    this.widget.scrollToBottom();
    this.containerMes = document.createElement('div');
    this.containerMes.classList.add('message');
    let userName;
    if (data.name === this.userName) {
      this.containerMes.classList.add('message-right');
      userName = 'name-you';
    } else {
      this.containerMes.classList.add('message-left');
      userName = '';
    }
    const date = new Date();
    this.containerMes.innerHTML = `<span class="name ${userName}">${data.name}</span>
    <p>${data.text}</p>
    <span class="date">${date.toLocaleTimeString()} ${date.toLocaleDateString()}</span>
    `;
    this.widget.area.insertAdjacentElement('afterbegin', this.containerMes);
  }
}
;// CONCATENATED MODULE: ./src/js/App.js

const controller = new Controller();
controller.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;