import View from './view';
class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      console.log(dataArr);
      const data = Object.fromEntries(dataArr)
      handler(data);
    });
  }
  generateMarkup() {}
}

export default new addRecipeView();
