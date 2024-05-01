import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const request = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.showSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state);
   
  } catch (error) {
    recipeView.showError(error);
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultView.showSpinner();
    await model.loadSearchRecipe(query);
    resultView.render(model.getSearchResulit());
    paginationView.render(model.state.search);
  } catch (error) {
    throw error;
  }
};
//_________________________PAGE BUTTONS_____________________________
const paginationBtnsControls= function(pageNumber){
  resultView.render(model.getSearchResulit(pageNumber));
    paginationView.render(model.state.search);
}

//__________________________SERVINGS_________________________________
const controlServings = function(cs){
  model.updateServings(cs)
recipeView.update(model.state)
 
}
// _________________________________BOOKMARK__________________________________

const controlAddBookmark = function(){
  
  model.bookmarkRecipe(model.state.recipe)
  console.log(model.state.recipe);
  recipeView.update(model.state)
}
// _________________________________UPLOAD RECIPE__________________________________

const controlAddRecipe = function(newRecipe){
model.uploadRecipe(newRecipe)
}

// _____________________________INIT CALLS__________________________________________
recipeView.addHandelerRender(request);
searchView.addHandlerView(controlSearchResult);
paginationView.addHandler(paginationBtnsControls);
recipeView.addServingsControl(controlServings)
recipeView.addHandelerBookmark(controlAddBookmark)
addRecipeView.addHandlerUpload(controlAddRecipe);