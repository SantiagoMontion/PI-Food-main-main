
import { actionTypes } from "../actions";

const initialState = {
    recipesLoaded: [],
    allRecipes: [], //Contiene todas las recetas
    recipeDetail: {}, //detalles de la receta
    typesLoaded:[], //todos los tipos de dietas
    filtered:[], //contiene las recipes filtradas
    loader:true, 
  };


function rootReducer(state = initialState, action) {
    switch (action.type) {

        case actionTypes.GET_RECIPES: {
            return {
              ...state,
              recipesLoaded: action.payload,
              recipeDetail: action.payload,
              allRecipes: action.payload,
              filtered: action.payload,
              loader:false
            };
          }

        case actionTypes.GET_TYPES:{
          return{
            ...state,
            typesLoaded: action.payload
          }
        }


        case actionTypes.GET_RECIPE_BY_ID: {
          return { ...state, recipeDetail: action.payload };
        }
    
        case actionTypes.SEARCH_RECIPE: {
          return { ...state, recipeDetail: action.payload};
        }


    
        case actionTypes.FILTER_RECIPES_BY_TYPE: {
          const type = action.payload; //types debería llegar como un string "Vegan"

          if (type === "default")
            return {
              ...state,
              recipesLoaded: state.allRecipes,
              filtered: state.allRecipes,
              
            };

          else {
            
            let recipesFiltered = state.allRecipes?.filter((recipe) => {
              if(recipe.diets){
                return recipe.diets.includes(type);
              }
            });
            return {
              ...state,
              recipesLoaded: recipesFiltered,
              filtered: recipesFiltered,
            };
          }
        }


        case actionTypes.SORT_SEARCHBAR: {
          const array = action.payload; //action.payload debería llegar como un array
          if(Array.isArray(array)){
          if (!array.length)
            return {
              ...state,
              recipesLoaded: [],
              filtered: [],
              
            };
          
           else {
            return {
              ...state,
              recipesLoaded: array,
              filtered: array,
            };
          }
        }
        else{
          return {
            ...state,
            recipesLoaded: state.allRecipes,
            filtered: state.allRecipes,
            
          };
        }
        }
        


        case actionTypes.SORT_RECIPES_PUNTUACTION: {
          
          if (action.payload === "asc") {
            return {
                ...state,
                recipesLoaded: state.filtered.slice().sort((a,b)=>{
                  return b.spoonacularScore - a.spoonacularScore
                })
                
              
            };
            
          } else if (action.payload === "des") {
            return {
              ...state,
              recipesLoaded: state.filtered.slice().sort((a,b)=>{
                return a.spoonacularScore - b.spoonacularScore
              })
            };
          } 
          else {
            return { ...state, recipesLoaded: state.filtered };
          }

        }
    
        case actionTypes.SORT_RECIPES_ALPHABETICALLY: {
          if (action.payload === "asc") {
            
            return {
                ...state,
                recipesLoaded: state.filtered.sort((a,b)=>{
                  if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
                  if(a.title.toLowerCase()< b.title.toLowerCase()) return -1
                  return 0;
                })
                
              
            };
            
          } else if (action.payload === "des") {
            return {
              ...state,
              recipesLoaded: state.filtered.sort((a,b)=>{
                if(a.title.toLowerCase() > b.title.toLowerCase()) return -1
                if(a.title.toLowerCase() < b.title.toLowerCase()) return 1
                return 0;
              })
            };
          } 
          else {
            return { ...state, recipesLoaded: state.filtered };
          }

        }

        
        case actionTypes.GET_RECIPE_BY_ID: {
          return { ...state, recipeDetail: action.payload};
        }

        
        case actionTypes.POST_RECIPE:{
          return {
            ...state,
          };
        }

        case actionTypes.GET_BY_QUERY:{
          return{
            ...state,recipesLoaded: action.payload
          }
        }




        case actionTypes.LOADER_TRUE: {
          return {
            ...state,
            loader: true,
          };
        }
    
        case actionTypes.LOADER_FALSE: {
          return {
            ...state,
            loader: false,
          };
        }


        case actionTypes.FILTER_RECIPES_BY_DISH:{
          console.log(action.payload)
          if (action.payload === "dinner") {

            let recipesFiltered = state.allRecipes?.filter((recipe) => {
              if(recipe.dishTypes){
                return recipe.dishTypes.includes(action.payload);
              }
            });
            return {
              ...state,
              recipesLoaded: recipesFiltered,
              filtered: recipesFiltered,
            };
            }

            else if (action.payload === "breakfast") {

              let recipesFiltered = state.allRecipes?.filter((recipe) => {
                if(recipe.dishTypes){
                  return recipe.dishTypes.includes(action.payload);
                }
              });
              return {
                ...state,
                recipesLoaded: recipesFiltered,
                filtered: recipesFiltered,
              };
            }
          }
        
        default:
            return { ...state };
        }


    
}

export default rootReducer;
