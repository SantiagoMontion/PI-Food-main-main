import { Link } from "react-router-dom";
import  "../styles/MainPage.css";

function MainPage() {
  return (
    <div className='background'>
      <div className="container">
      <Link to="/home">
        <span className='home_span'>Henry Food</span>
        <span className="intro_span">All World`s recipes at one click</span>
        <div className='homeBtn'>Home</div>
    
      </Link>
      </div>
      </div>
  );
}

export default MainPage;