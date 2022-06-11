import  "../styles/NavBar.css";
import { Link } from "react-router-dom";
import Logo from "../styles/img/LogoNav.png"
import { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import {getTypes, saveNewRecipe} from "../actions/index"
import validate from "../utils/validate";
import "../styles/NewRecipe.css"
import BackBtn from "../styles/img/BackBtn.png"

function NewRecipe() {

    const types = useSelector((state)=> state.typesLoaded)  //funcion para mostrar todos los tipos de dieta
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true); //Habilitador del botón submit cuando no haya ningun error en el formulario
    
   
    useEffect(()=>{
      dispatch(getTypes())
    },[])
    

    const [input, setInput] = useState({
        title: '',
        summary: '',
        spoonacularScore: '',
        healthScore: '',
        steps:'',
        diets:[],
        image:'',
        dishTypes:'',
      });

    const [errors, setErrors] = useState({}); //Estado para manejar los errores

    const handleInputChange = function(e) {
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
    
        setInput((prevState) => {
          return { ...prevState, [e.target.name]: e.target.value.trim()};
        });
    
      }


      const handleCheckbox = (e) => {
        if (e.target.checked) {
          setInput((prevState) => {
            return {
              ...prevState,
              diets: [...prevState.diets, e.target.value],
            };
          });
         
        }
      };

    useEffect(()=>{ //useEffect para habilitar o deshabilitar el boton create, cuando se cumplan ciertas condiciones
      if (
        input.title.length > 3 &&
        input.title.length <= 25 &&
        input.diets.length >= 1 &&
        !errors.hasOwnProperty("summary") &&
        !errors.hasOwnProperty("spoonacularScore") &&
        !errors.hasOwnProperty("healthScore") &&
        !errors.hasOwnProperty("steps")
       ) {
        setDisabled(false);
        } else {
        setDisabled(true);
        }
      }, [errors, input, disabled]);
    
    


    const handleOnSubmit = (e) => {
      e.preventDefault();
     
      setInput((prevState) => {
        return { ...prevState, diets: input.diets };
      });
      
      if (input.image.length === 0){
        input.image = "https://media.istockphoto.com/vectors/recipe-book-hand-drawn-cover-vector-illustration-vector-id1185879263?k=20&m=1185879263&s=612x612&w=0&h=Qiw3sY0LiWG4IIKcKQI9fAwAxR81xLmbhRpYpgt3S8I=";
      }
      
       
      
      if(input.dishTypes){
        var sep = input.dishTypes.split(",")
        if(sep){
        var array =[]
        for (let i=0; i<sep.length;i++){
         array.push(sep[i])
        }
      }
      }
      else{
        input.dishTypes= ["No dish type defined"]
      }

      
      
      dispatch(saveNewRecipe(input));
        setInput({
          title: '',
          summary: '',
          spoonacularScore: '',
          healthScore: '',
          steps:'',
          diets:[],
          image:'',
          dishTypes:'',
      });
      
      setTimeout(function() {
        alert("Form sent successfully.")
        
      }, 1000);


    }
    

    return (
        <div >
            <div className="NavContain">
          
            <div className="nav_logo">
            <Link to="/home">
                <img src={Logo}></img>
            </Link>
            </div>
          </div>
          <div className="BackLogo">
                <Link to="/home">
                <img className="LogoBack" src={BackBtn}></img>
                </Link>
          </div>
          <div className='AllForm'>
          
          <form onSubmit={handleOnSubmit} className="FormContain">
          
            <h1>Create your Recipe</h1>
            <h4>Complete all the fields with your own recipe.</h4>


          <div className="AllInputs">
          <div className='InputContain'>
          <label>Title</label>
          
          <div className='Input'>
         <input className={errors.title && 'danger'} placeholder='recipe title...' type="text" name="title" onChange={handleInputChange} />
         <div className="danger"><label>{errors.title}</label></div>
        </div>
        </div>
        
        <div className='InputContain'>
        <label>Plate resume</label>
        
        <div className='Input'>
        <input className={errors.summary && 'danger'} placeholder='plate resume...' type="text" name="summary" onChange={handleInputChange}  />
        <div className="danger"><label>{errors.summary}</label></div>
        </div>
        </div>
        

        <div className='InputContain'>
        <label>Plate Punctuation</label>
        
        <div className='Input'>
        <input className={errors.spoonacularScore && 'danger'} placeholder='plate punctuation...' type="text" name="spoonacularScore" onChange={handleInputChange} value={input.spoonacularScore} />
        <div className="danger"><label>{errors.spoonacularScore}</label></div>
        </div>
        </div>

        <div className='InputContain'>
        <label>Healty level</label>
        
        <div className='Input'>
        <input className={errors.healthScore && 'danger'} placeholder='recipe healty level...' type="text" name="healthScore" onChange={handleInputChange} value={input.healthScore} />
        <div className="danger"><label>{errors.healthScore}</label></div>
        </div>
        </div>

        
        <div className='InputContain'>
        <label>Step by step</label>
        
        <div className='Input'>
        <input className={errors.steps && 'danger'} placeholder='recipe steps...' type="text" name="steps" onChange={handleInputChange}/>
        <div className="danger"><label>{errors.steps}</label></div>
        </div>
        </div>
       
     

        <div className='InputContain'>
        <label>Image</label>
        <div className='Input'>
        <input className={errors.image && 'danger'} placeholder='image link...' type="text" name="image" onChange={handleInputChange} value={input.image} />
        <div className="danger"><label>{errors.image}</label></div>
        </div>
        </div>
        

        <div className='InputContain'>
        <label>Dish Types</label>
        <div className='Input'>
        <input className={errors.dishTypes && 'danger'} placeholder='dishTypes (separated with comas)' type="text" name="dishTypes" onChange={handleInputChange} value={input.dishTypes} />
        <div className="danger"><label>{errors.dishTypes}</label></div>
        </div>
       
        </div>


        <div className="typesh3">
        <h3>Select all the diets types of your recipe</h3>
        </div>
        {types?.map(t=>{
          
          return(
            <div className="types-form">
            <input className={errors.diets && 'danger'} onChange={handleCheckbox} value={t} name="diets" type="checkbox" ></input>
            <label>{t}</label>
          </div>
          )
        })}
        <div className="danger">{errors.diets}</div>
        


        </div>
        <div className='submitContainer'>
        <div className='submit'>
        <button disabled={disabled}>Submit Recipe</button>
        </div>
        </div>
       
      
      </form>
      </div>

    </div>
  );
}

export default NewRecipe;