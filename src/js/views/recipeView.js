import icons from 'url:../../img/icons.svg';
import View from './view';
class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');


 
  addHandelerRender(ree) {
    window.addEventListener('hashchange', ree);
    window.addEventListener('load', ree);
  }
 addServingsControl(handler){
  this._parentEl.addEventListener('click',e=>{
   const btn =  e.target.closest('.btn--update-servings')
   
   if(!btn) return
   
  const cs = +btn.dataset.updateTo
  
   handler(cs)
   
  })
 }
 addHandelerBookmark(handler){
  this._parentEl.addEventListener('click',e=>{
    const btn = e.target.closest('.btn--bookmark')
    if(!btn) return
    handler()
  })
 }
  generateMarkup() {
    return `  <figure class="recipe__fig">
        <img src="${this.data.recipe.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.data.recipe.title}</span>
        </h1>
      </figure>
     
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this.data.recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this.data.recipe.servings}</span>
          <span class="recipe__info-text">servings</span>
     
          <div class="recipe__info-buttons">
            <button  class="btn--tiny btn--update-servings  btn--increase-servings" data-update-to="${this.data.recipe.servings - 1}">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button  class="btn--tiny btn--update-servings btn--increase-servings" data-update-to="${this.data.recipe.servings + 1}">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
     
        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this.data.recipe.bookmarked?'-fill':''}"></use>
          </svg>
        </button>
      </div>
     
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
         ${this.data.recipe.ingredients
           .map(ing => {
             return `
           <li class="recipe__ingredient">
           <svg class="recipe__icon">
             <use href="src/img/icons.svg#icon-check"></use>
           </svg>
           <div class="recipe__quantity">${ing.quantity}</div>
           <div class="recipe__description">
             <span class="recipe__unit">${ing.unit}</span>
             ${ing.description}
           </div>
         </li>
         
           `;
           })
           .join('')}
     
          
        </ul>
      </div>
     
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this.data.recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
      `;
  }
}

export default new RecipeView();
