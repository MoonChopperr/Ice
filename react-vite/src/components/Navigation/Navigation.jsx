import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import landinglogo from '../../images/logo_steam.png'
import "./Navigation.css";

function Navigation() {
  return (
    <>
      <div className="nav-background">


        <div className="nav-center">
          <NavLink to='/' >
            <img className='nav-logo' src={landinglogo} alt='Home'></img>
          </NavLink>
          <div>
            <span className="nav-bar-links">STORE</span>
            <span className="nav-bar-links">COMMUNITY</span>
            <span className="nav-bar-links">ABOUT</span>
            <span className="nav-bar-links">SUPPORT</span>
          </div>
        </div>

        <div className="nav-bar-links"></div>
      </div>

    </>
    // <ul>
    //   <li>
    //     <NavLink to="/">Home</NavLink>
    //   </li>

    //   <li>
    //     <ProfileButton />
    //   </li>
    // </ul>
  );
}

export default Navigation;
