export default class Widget {
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
          <input type="text" class="input-message" required>
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
