import './App.css';
import {Route } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import Home from './components/Home';
import RecipeDetail from './components/RecipeDetail'
import NewRecipe from './components/NewRecipe';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={MainPage} />
      <Route exact path='/new-recipe' component={NewRecipe}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/recipes/:id' component={RecipeDetail}/>
      <Route exact path='/recipes' component={Home}/>

    </div>
  )
}
export default App;