import { NavLink } from "react-router-dom";
import landinglogo from '../../images/logo_steam.png'
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";
import { useSelector } from 'react-redux';
import DropDownProfile from "../DropDownProfile/DropDownProfile";
import { useModal } from "../../context/Modal"
import NavigationModal from "../NavigationModal/NavigationModal";

function Navigation() {
  const nav = useNavigate()
  const currUser = useSelector(state => state.session.user)
  const { showModal, setModalContent } = useModal()
  console.log(showModal)
  const handleLibraryClick = () => {
    if (!currUser) {
      setModalContent(<NavigationModal />)
    } else {
      nav('/library')
    }
  }

  const handleAboutClick = () => {
    if (!currUser) {
      setModalContent(<NavigationModal />)
    } else {
      currUser ? nav('/profile') : nav('/support')
    }
  }

  return (
    <>
      <div className="nav-background">
        <div className="container">
          <NavLink className='nav-logo-container' to='/' >
            <img className='nav-logo' src={landinglogo} alt='Home'></img>
          </NavLink>
          <ul className="nav-links">
            <li className="nl"><a className="nla-store" onClick={() => nav('/')}>STORE</a></li>
            <li className="nl"><a className="nla" onClick={handleLibraryClick}>LIBRARY</a></li>
            <li className="nla-user">
              <a className="nla" onClick={handleAboutClick}>
                {currUser ? currUser.username.toUpperCase() : "ABOUT"}
              </a>
            </li>
            <li className="nl"><a className="nla" onClick={() => nav('/support')}>SUPPORT</a></li>
            <li className="nl">
              {currUser && (
                <NavLink to='/game/create' className="nla nlacreate">POST YOUR GAME</NavLink>
              )}
            </li>
          </ul>

        </div>
      </div>

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
