export default class Popup {
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
