import './NavBar2.css'
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';


function NavBar2() {

    const currUser = useSelector(state => state.session.user)


    return (
        <>
            <div className='NavBar2-container'>
                {currUser && (
                    <div className='above-bar'>
                        <button className="NB-wishlist" onClick={() => alert('Feature coming soon')}>Wishlist</button>
                        <button className="NB-user-cart">Cart</button>
                    </div>
                )}
                <div className="rectangle-bar">
                    <a onClick={() => alert('Feature coming soon')}>Your Store</a>
                    <a onClick={() => alert('Feature coming soon')}>New & Noteworthy</a>
                    <a onClick={() => alert('Feature coming soon')}>Categories</a>
                    <a onClick={() => alert('Feature coming soon')}>Points Shop</a>
                    <a onClick={() => alert('Feature coming soon')}>News</a>
                    <a onClick={() => alert('Feature coming soon')}>Labs</a>
                    <div className="search-bar">
                        <input type="text" placeholder="search" />
                        <button onClick={() => alert('Feature coming soon')}><IoMdSearch /></button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default NavBar2
