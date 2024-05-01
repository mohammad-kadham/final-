import { API_URL,PER_PAGE } from "./config";
import {api_request} from "./helper.js"

export const state = {
  recipe: {},
  search:{
    query:'',
    results:[],
    page:1,
    resultPerPage:PER_PAGE
  },
  bookmark:[]
};

export const loadRecipe = async function (id) {
  try {
    
    const data = await api_request(`${API_URL}${id}`);
    let { recipe } = data.data;
    state.recipe = {
      title: recipe.title,
      id: recipe.id,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings:recipe.servings
    };
   
    if (state.bookmark.some(e=>{
      return e.id === id
    })){
      console.log("✔🐱‍💻🐱‍🏍🐱‍👤");
      console.log(id);
      state.recipe.bookmarked = true
    }else{
      state.recipe.bookmarked = false
    }
  } catch (err) {
    throw err
  }
 
};

//query api request

export const loadSearchRecipe = async function(query){
try {
  const data = await api_request(API_URL+`?search=${query}`)
  state.search.query = query;
 
 
  state.search.results = data.data.recipes.map(cur=>{
    return {
      id: cur.id,
      publisher: cur.publisher,
      image: cur.image_url,
      title:cur.title
    }
  })
 
 state.search.page = 1;
} catch (error) {
  
}
}


//______________page resulit___________
export const getSearchResulit = function(page = state.search.page ){
   state.search.page = page;
   
  const start =(page - 1)*10;
  const end = (page *10)
  
return state.search.results.slice(start,end);

}


// updtae servings

export const updateServings = function(newServings){
  
  state.recipe.ingredients.forEach(ing => {
    ing.quantity=(ing.quantity * newServings)/state.recipe.servings;
  });
 
  state.recipe.servings =newServings;
}

// bookmark shit

export const bookmarkRecipe = function(recipe){
  
state.bookmark.push(recipe)

if(state.recipe.id === recipe.id){
  state.recipe.bookmarked = true;
}
}




export const uploadRecipe = async function(newRecipe){
  console.log(newRecipe);
  const ingredients = Object.entries(newRecipe).filter(entry=>{
   return  entry[0].startsWith('ingredient') && entry[1] !== ''
  }).map(function(ing){
   const [quantity,unit,description]= ing[1].split(',')
   return {quantity:+quantity,unit,description}
  })
  console.log(ingredients);
  const recipe ={
    title:newRecipe.title,
    source_url:newRecipe.sourceUrl,
    publisher:newRecipe.publisher,
    cooking_time:+newRecipe.cookingTime,
    servings:+newRecipe.servings,
    ingredients
  }
  console.log(recipe);
}