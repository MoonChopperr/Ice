import { NavLink } from "react-router-dom";
import landinglogo from '../../images/logo_steam.png'
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";
import { useSelector } from 'react-redux';
import DropDownProfile from "../DropDownProfile/DropDownProfile";

function Navigation() {
  const nav = useNavigate()
  const currUser = useSelector(state => state.session.user)
  // console.log('currUser!', currUser)

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
            <li className="nl">
              <a className="nla" onClick={() => alert('Feature coming soon')}>
                {currUser ? currUser.username.toUpperCase() : "ABOUT"}
              </a>
            </li>
            <li className="nl"><a className="nla" onClick={() => alert('Feature coming soon')}>SUPPORT</a></li>
            <li className="nl"><a>{currUser && (<NavLink to='/game/create' className="nlacreate">POST YOUR GAME</NavLink>)}</a></li>

          </ul>

          <div className="user-account">
            <div className="user-div">

              {!currUser && (
                <>
                  <NavLink className='user-details' to="/login">login</NavLink>
                  <span className="pipe"> | </span>
                  <a className='user-details' onClick={() => alert('Feature coming soon')}>language</a>
                </>
              )}
              {currUser && (
                <>
                  <DropDownProfile username={currUser.username} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <ProfileButton />
        </li>
      </ul> */}
    </>
  );
}

export default Navigation;
