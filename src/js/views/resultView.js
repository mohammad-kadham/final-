import View from './view';
import icons from 'url:../../img/icons.svg';
class ResultView extends View {
    
  _parentEl = document.querySelector('.results');
  generateMarkup() {
   
    return this.data.map(this.generateMarkupPreview).join('')
  }
  generateMarkupPreview(e){
    return `<li class="preview">
    <a class="preview__link preview__link--active" href="#${e.id}">
      <figure class="preview__fig">
        <img src=${e.image} alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${e.title}</h4>
        <p class="preview__publisher">${e.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icons}"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;
  }

  
}

export default new ResultView();
