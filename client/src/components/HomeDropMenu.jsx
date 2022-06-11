import  "../styles/homeDropMenu.css";


function HomeDropMenu({types,handleFilter,handleSortAlph,handleSortPunt,handSortDish}) {
  
  
  //Funcion para tomar el valor del tipo de dieta
  function getValue(e){
    handleFilter(e.target.value);
  }


  //Funcion para el boton asc or des segun alfabeto

  function getFilterOp(e){
    handleSortAlph(e.target.value)
  }


  //funcion para el boton asc or des segun puntuacion
  function getFilterPuntuaction(e){
    handleSortPunt(e.target.value)
  }
  

  function getFilterDish(e){
    handSortDish(e.target.value)
  }

  return (
    <div className="dropbtn_containers">
    

    <div className="dropdown">
    <button className="dropbtn">Filter by: Diet</button>
    <div className="dropdown-content">
    {types.map(function(diet){
      return(<button value={diet} onClick={getValue}>{diet}</button>)
        
        
    })}
    <button value="default" onClick={getValue}>All Recipes</button>
    
   
    

    </div>
    </div>

    <div className="dropdown">
    <button className="dropbtn">Filter by: Alphabet</button>
    <div className="dropdown-content-two">

    <button value="asc" onClick={getFilterOp}>ascendant</button>
    <button value="des" onClick={getFilterOp}>descendant</button>
    
  
    </div>
    </div>


    <div className="dropdown">
    <button className="dropbtn">Filter by: Dishtype</button>
    <div className="dropdown-content-two">

    <button value="dinner" onClick={getFilterDish}>Dinner</button>
    <button value="breakfast" onClick={getFilterDish}>Break</button>
    
  
    </div>
    </div>


    <div className="dropdown">
    <button className="dropbtn">Filter by: Puntuaction</button>
    <div className="dropdown-content-two">
    <button value="asc" onClick={getFilterPuntuaction}>ascendant</button>
    <button value="des" onClick={getFilterPuntuaction}>descendant</button>
    
    </div>
    </div>



    
    </div>
      
  );

  
  
}


export default HomeDropMenu;


