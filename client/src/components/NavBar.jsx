import  "../styles/NavBar.css";
import Logo from "../styles/img/LogoNav.png"
import { Link } from "react-router-dom";
import {useState,useEffect} from "react";



function NavBar({recipes,handleSearch,handleQuery}) {

  const [state, setState] = useState("") //funcion para manejar el estado del searchbar

  //funcion para obtener el valor del input
  const handleChange = e => {
    
    setState(e.target.value);
  };


  useEffect(() => {
    if(state ===''){
      handleSearch("default")
      return
    }
    let results = recipes.filter(r =>{
    if(r.title){
      return (r.title.toLowerCase().includes(state))
    }
    });
    handleSearch(results)
  }, [state]);
  
  


  const handleSearchClick= e=>{
    handleQuery(state)
  }



  return (
    <div>
    <div className='nav_container' id="myTopnav">
      
      <Link to="/home">
      <div className="nav_logo">
      <img src={Logo}></img>
      </div>


      </Link>
      <Link to="/home">
      <div className="Navh2">
      <h2>Henry Food</h2>
  
      </div>
      </Link>
      <div className="input_container">

      <input type="text"  onChange={handleChange} value={state} placeholder="   Buscar..."></input>
      
      <button onClick={handleSearchClick} >Search</button> 
   
      </div>
      <div className="CreateRecipe">
        <Link to="/new-recipe">
        <h2>Create Recipe</h2>
        </Link>
      
      </div>
    </div>
    </div>
  );
}

export default NavBar;