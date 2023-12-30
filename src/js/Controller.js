import Widget from './Widget';
import Popup from './Popup';
import ChatAPI from './api/ChatAPI';

export default class Controller {
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
    this.popup.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.popup.removePopUpContainer();
      this.addUserName();
    });
  }

  clickBtnWidget() {
    this.widget.btnOut.addEventListener('click', (e) => {
      e.preventDefault();
      this.popup.addPopUpContainer();
      this.api.close(this.userName);
    });
  }

  clickFormMessage() {
    this.widget.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessage();
    });
  }

  addUserName() {
    this.userName = this.popup.input.value;
    this.api.create(this.userName, (res) => {
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
    this.api.start((data) => {
      if (Array.isArray(data)) {
        this.createUserList(data);
      } else {
        this.renderMessage(data);
      }
    });
  }

  createUserList(data) {
    this.widget.list.innerHTML = '';
    data.forEach((el) => {
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
      name: this.userName,
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
