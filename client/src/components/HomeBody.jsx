import { Link } from "react-router-dom";
import  "../styles/HomeBody.css";


function HomeBody({items,handleFilter,lastItemIndex,firstItemIndex}) {

  function getValue(e){
    handleFilter(e.target.value);
  }
  
  if (!Array.isArray(items)){
    items = items.data
  }
  
  return (
      <div>
      <div className="recipe_grid">

        {items?.slice(firstItemIndex, lastItemIndex).map(recipe=>{
          
          const link= "/recipes/" + `${recipe.id}`
          {if(recipe.title){
          return(
            
              <div  className="item" >
              <Link to={link}>
                <div className="img-container">            
                  <img src={recipe.image} alt="recipeimg" />
                </div>


                  <div className="titleAndDiet">
                    <h2>{recipe.title}</h2>
                    </div>

              </Link>

              
                  <div className="diet-container">
                  
                    {recipe.diets?.map(diet=>{
                      return(
                        <Link style={{textDecoration: 'none'}}>
                        <div className="dietsList">
                        
                        <button value={diet} onClick={getValue}>{ diet }</button>
                         
                        </div>
                        </Link> 
                        )
                    })}

                      
                    
                    </div>
                    
                  </div>
            
          )
        }}
        })}
        
      </div>
      
      </div>
  );
}
  

export default HomeBody;