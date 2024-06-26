import { useState, useEffect, useRef  } from 'react'
import { thunkLogout } from "../../redux/session";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import './DropDown.css'


function DropDownProfile({ username }) {
    const dispatch = useDispatch()
    const nav = useNavigate()
    // const currUser = useSelector((state)=> state.session.user)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    };

    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }

    const logout = (e) => {
        e.preventDefault()
        dispatch(thunkLogout())
    };

    //event listener mousedown = click on mouse
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div className='dropdown-main-container' ref={dropdownRef}>
                <div className='user-name' onClick={toggleDropDown}>{username} <span style={{ position: 'absolute', right: '-10px', top: '0' }}>▼</span></div>
                {isOpen && (
                    <div className='dropdown-item-container'>
                        <a className='dropdown-items' onClick={() => nav('/profile')}>View my reviews</a>
                        <a className='dropdown-items-na'>View my profile</a>
                        <a className='dropdown-items-na' >Account details: <span className='dropdown-user'>{username}</span></a>
                        <a className='dropdown-items-na' >Change language</a>
                        <a className='dropdown-items' onClick={logout}>Sign out of account</a>
                    </div>
                )}
            </div>
        </>

    )
}

export default DropDownProfile
