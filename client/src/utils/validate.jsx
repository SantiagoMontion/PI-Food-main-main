export  default function validate(input) {  //Funcion para validar y devolver el error correspondiente
    let errors = {};
  
    if (!input.title) {
      errors.title = 'Title is required';
    } 
    else if (input.title.length < 4) {
      errors.title = 'Title must have at least 4 caracters';
    }


    if (!input.summary){
      errors.summary = 'Resume is required';
    } 
    else if (input.summary.length < 10) {
      errors.summary = 'Resume is to short';
    }
  


    
      
    if(!parseInt(input.spoonacularScore)){
          errors.spoonacularScore = "Punctuation must be a number"
      }
      if(input.spoonacularScore.length >= 3 && input.spoonacularScore !== '100'){
        errors.spoonacularScore = 'Punctuation must have only 2 caracters or be 100';
      }


      
    if(!parseInt(input.healthScore)){
          errors.healthScore = "Healty level must be a number"
      }
      
      if(input.healthScore.length >= 3 && input.healthScore !== '100'){
          errors.healthScore = 'Healty level must have only 2 caracters or be 100';
      }


      if(!input.steps){
          errors.steps = "Steps are require"
      }
      else if(input.steps.length <10){
          errors.steps = "Steps is to short"
      } 
      
    return errors;
  };