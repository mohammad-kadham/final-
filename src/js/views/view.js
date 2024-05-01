import icons from 'url:../../img/icons.svg';
export default class View {
  constructor() {}
  showSpinner = function () {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };
  render(data) {
    if(Array.isArray(data) && data.length === 0) return this.showError()
    this.data = data;
    const markup = this.generateMarkup();

    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data){
    if(Array.isArray(data) && data.length === 0) return this.showError()
    this.data = data;
    const newMarkup = this.generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newELements = Array.from(newDom.querySelectorAll('*'))
    const curElements = Array.from(this._parentEl.querySelectorAll('*'))
    newELements.forEach((newEl,i)=>{
      const curEl = curElements[i]
     
      
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
        curEl.textContent = newEl.textContent
        
      }
      if(!newEl.isEqualNode(curEl)){
        Array.from(newEl.attributes).forEach(attr=>{
          curEl.setAttribute(attr.name,attr.value)
        })
      }
      
    })

  }
  showError(data) {
   
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div> `;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
