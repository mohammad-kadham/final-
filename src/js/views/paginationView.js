import icons from 'url:../../img/icons.svg';
import View from './view';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  addHandler(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const pageNumber = +btn.dataset.goto;
      handler(pageNumber);
    });
  }
  generateMarkup() {
    const numPages = Math.ceil(
      this.data.results.length / this.data.resultPerPage
    );

    if (this.data.page === 1 && numPages > 1) {
      return `
          <button data-goto  = "${
            this.data.page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this.data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    if (this.data.page === numPages && numPages > 1) {
      return `<button data-goto  = "${
        this.data.page - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.data.page - 1}</span>
          </button>`;
    }
    if (this.data.page < numPages) {
      return `<button data-goto = "${
        this.data.page + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${this.data.page + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
          
          <button data-goto  = "${
            this.data.page - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.data.page - 1}</span>
          </button>
          `;
    }
    return ' less one page';
  }
}

export default new PaginationView();
