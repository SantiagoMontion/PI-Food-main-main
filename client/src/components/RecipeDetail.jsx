import  "../styles/recipeDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {getRecipeById} from "../actions/index"
import RecipeDetailBody from './RecipeDetailBody.jsx'
import { Link } from "react-router-dom";
import Logo from "../styles/img/LogoNav.png"


function RecipeDetail(props) {
  const recipesFiltered = useSelector((state) => state.recipeDetail);
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getRecipeById(props.match.params.id));
    
  },[])

  return (
      
      <div className="recipeDetailContainer">
        <div className="NavContain">
          
          <div className="nav_logo">
          <Link to="/home">
            <img src={Logo}></img>
          </Link>
          </div>
          
          
        </div>
      <RecipeDetailBody recipe={recipesFiltered}></RecipeDetailBody>
      </div>
  );
}

export default RecipeDetail;