import axios from "axios";



export const actionTypes = {
    GET_RECIPES: "GET_RECIPES",
    GET_RECIPES_DETAIL: "GET_RECIPES_DETAIL",
    GET_TYPES: "GET_TYPES",
    SEARCH_RECIPE: "SEARCH_RECIPE",
    FILTER_RECIPES_BY_TYPE: "FILTER_RECIPES_BY_TYPE",
    SORT_RECIPES_ALPHABETICALLY: "SORT_RECIPES_ALPHABETICALLY",
    SORT_RECIPES_PUNTUACTION: "SORT_RECIPES_PUNTUACTION",
    GET_RECIPE_BY_ID: "GET_RECIPE_BY_ID",
    SORT_SEARCHBAR: "SORT_SEARCHBAR",
    POST_RECIPE: "POST_RECIPE",
    GET_RECIPE_BY_QUERY: "GET_RECIPE_BY_QUERY",
    GET_BY_QUERY: "GET_BY_QUERY",
    LOADER_TRUE: "LOADER_TRUE",
    LOADER_FALSE:"LOADER_FALSE",
    DELETE_RECIPE:"DELETE_RECIPE",
    FILTER_RECIPES_BY_DISH: "FILTER_RECIPES_BY_DISH"
  };


export function getTypes() {
    return function (dispatch) {
      return axios("/types")
        .then((resp) => {
          return dispatch({
            type: actionTypes.GET_TYPES,
            payload: resp.data });
        })
        .catch((e) => {
          console.log(e);
        });
    };
  }
  
  export function getRecipes() {
    return function (dispatch) {
        
        return axios("/recipes")
            .then((response) => {
            return dispatch({
                type: actionTypes.GET_RECIPES,
                payload: response.data,
          });
        })
        .catch((e) => {
          console.log("ERROR GET RECIPES" + e);
        });
    };
}

export function filterByType(type){
  return {
    type: actionTypes.FILTER_RECIPES_BY_TYPE,
    payload: type,
  };
  
}

export function sortAlpabeticaly(type){
  return{
    type: actionTypes.SORT_RECIPES_ALPHABETICALLY,
    payload: type,
  };
}


export function sortPuntuactionaly(type){
  return{
    type: actionTypes.SORT_RECIPES_PUNTUACTION,
    payload: type
  }
}


export function getRecipeById(id){
  return function (dispatch) {
    return axios(`/recipes/${id}`)
      .then((resp) => {
        return dispatch({
          type: actionTypes.GET_RECIPE_BY_ID,
          payload: resp.data,
        });
      })
      .catch((e) => {
        console.log("ERROR GET RECIPES BY ID" + e);
      });
  };
}


export function sortSearchBar(array){
  return{
      type: actionTypes.SORT_SEARCHBAR,
      payload: array
  }
}



export function saveNewRecipe(recipe){ //debe llegar como un objeto
  return function (dispatch) {
    return axios
      .post("/recipe", recipe)
      .then((resp) => {
        return dispatch({ type: actionTypes.POST_RECIPE, payload: resp });
        })
      .catch((e) => {
        console.log("ROUTE ERROR "+ e);
      });
    };
  }


  export function getRecipesByQuery(query){ 
    return function (dispatch) {
      return axios
        
        .get("/recipes?query=" + query)
        .then((resp) => {
          
          return dispatch({ type: actionTypes.GET_BY_QUERY, payload: resp.data });
          })
        .catch((e) => {
          console.log("QUERY PARAM ERROR "+ e);
        });
      };
    }



    export function setLoaderTrue() {
      return {
        type: actionTypes.LOADER_TRUE,
      };
    }
    
    export function setLoaderFalse() {
      return {
        type: actionTypes.LOADER_FALSE,
      };
    }

    export function getRecipesByDish(type){
      return {
        type: actionTypes.FILTER_RECIPES_BY_DISH,
        payload: type,
      };
    }


