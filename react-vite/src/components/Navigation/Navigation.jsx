import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import landinglogo from '../../images/logo_steam.png'
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";
import LoginFormPage from "../LoginFormPage";


function Navigation() {
  const nav = useNavigate()

  return (
    <>
      <div className="nav-background">
        <div className="container">
          <NavLink className='nav-logo-container' to='/' >
            <img className='nav-logo' src={landinglogo} alt='Home'></img>
          </NavLink>
          <ul className="nav-links">
            <li className="nl"><a className="nla-store" onClick={() => nav('/')}>STORE</a></li>
            <li className="nl"><a className="nla" onClick={() => alert('Feature coming soon')}>COMMUNITY</a></li>
            <li className="nl"><a className="nla" onClick={() => alert('Feature coming soon')}>ABOUT</a></li>
            <li className="nl"><a className="nla" onClick={() => alert('Feature coming soon')}>SUPPORT</a></li>
          </ul>

          <div className="user-account">
            <div className="user-div">

              <NavLink className='user-details' to="/login">login</NavLink>
              <span> | </span>
              <a onClick={() => alert('Feature coming soon')}>language</a>
            </div>
          </div>
        </div>
      </div>


      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <ProfileButton />
        </li>
      </ul>
    </>
  );
}

export default Navigation;
