import BackBtn from "../styles/img/BackBtn.png"
import  "../styles/recipeDetailBody.css";
import { Link } from "react-router-dom";

function RecipeDetailBody({recipe}) {
    const {title , summary,image,diets,spoonacularScore,healthScore,steps,dishTypes} = recipe;
    
    var resume = document.createElement( 'html' )
    
    resume.innerHTML = summary;

    var step = document.createElement('html')
    step.innerHTML = steps;
    return (
        
        <div className="recipeDetailBody">

            <div className="BackLogo">
                <Link to="/home">
                <img className="LogoBack" src={BackBtn}></img>
                </Link>
            </div>

        <div className="infoContainer">

            <h1 className="recipe_name">{title}</h1>

            <div className="img-plate">
            <div className="img-contain">
                <img className="recipeimg" src={image}></img>
            </div>
            
            <div className="PlateResumeContainer">
                <h2>Plate Resume</h2>
                <h3 className="PlateResume">{resume.outerText}</h3>
            </div>
            
            </div>
            <div className="dishTypeContainer">
            <h2>Dish information</h2>
            </div>


            <div>
            <h2>Type of Dish</h2>
            
            <div className="dishTypelist">
            {dishTypes?.map(t=>{
                return(<h2 className="Dietsdetail">{t}</h2>)
            })}
            

            </div>
            </div>

            <div className="dietspan">
            <h2>Diet List</h2>
            <div className="dietscontainer">
            {diets?.map(d=>{
                return (<h3 className="Dietsdetail">{d}</h3>)
            })}
            </div>
            </div>

            <div className="LevelsContainer">
            <h2 className="Puntuactionh2">spoonacularScore</h2>
            <meter className="meters" min="0" max="100"
                low="25" high="75"
            optimum="100" value={spoonacularScore}></meter>

            <h2 className="Healtyh2">healthScore</h2>
            <meter className="meters" min="0" max="100"
                low="25" high="75"
            optimum="100" value={healthScore}></meter>
            </div>



            <div className="StepsContainer">
            <h2>Step to Step</h2>
            <h3 className="stepsText">{step.outerText}</h3>
            </div>

        </div>  
        </div>
    );
  }
  
  export default RecipeDetailBody;