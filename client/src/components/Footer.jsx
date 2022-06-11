
import "../styles/Footer.css"
import GitLogo from '../styles/img/GitLogo.png'
import LinkedInLogo from '../styles/img/LinkedInLogo.png'
import Gmail from '../styles/img/Gmail.png'
import ProfileFoto from '../styles/img/ProfileFoto.png'
const Footer = () => {
    return (
      <div className="footer">
        <div className="footer-name">
        <h4>developer</h4>

        <div className="developer-info">
            
            <a className='info' href="https://instagram.com/santimontion" target="_blank">
            <img className="profile-logo" src={ProfileFoto}></img>
            <h3>Santiago Montion</h3>
            </a>
        
        </div>

        </div>
        <label className="cname">Contact:</label>
        <div className="contactInfo">
          
          <a href="https://github.com/SantiagoMontion" target="_blank">
          <img className="img-logos" src={GitLogo}></img>
          </a>
          <a href="https://www.linkedin.com/in/santi-montion-a84711217/" target="_blank">
            <img className="img-logos" src={LinkedInLogo}></img>
          </a>
          <a href="mailto: santiagomontion@gmail.com">
              <img className="img-logos" src={Gmail}></img>
          </a>
        </div>
      </div>
    );
  };
  
  export default Footer;