import './NavBar2.css';
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkGetCart } from '../../redux/cart';
import { useNavigate } from 'react-router-dom';
import { thunkGetWishlist } from '../../redux/wishlist';

function NavBar2() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const currUser = useSelector(state => state.session.user);
    const userWishlist = useSelector(state => state.wishlist.currentWishlist);
    const userOrders = useSelector(state => state.cart);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(thunkGetCart());
        dispatch(thunkGetWishlist());
    }, [dispatch]);

    const handleSearch = () => {
        nav(`/search/${searchQuery}`)
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='NavBar2-container'>
            {currUser && (
                <div className='above-bar'>
                    <button className="NB-wishlist" onClick={() => nav('/wishlist')}>Wishlist {userWishlist?.currentWishlist?.length > 0 ? `(${userWishlist?.currentWishlist?.length})` : ''}</button>
                    <button className="NB-user-cart" onClick={() => nav('/game/cart')}>Cart {userOrders?.cart?.currentCart?.length > 0 ? `(${userOrders?.cart?.currentCart?.length})` : ''}</button>
                </div>
            )}
            <div className="rectangle-bar">
                <a onClick={() => nav('/')}>Home</a>
                <a onClick={() => nav('/news')}>News</a>
                <a href="https://github.com/MoonChopperr/Ice">Github</a>
                <a href="https://www.linkedin.com/in/nishiyamaryou/">LinkedIn</a>
                <a href="https://moonchopper.netlify.app/">Portfolio</a>
                <div className='points-shop'>Points Shop</div>
                <div className="search-bar">
                    <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} />
                    <button onClick={handleSearch}><IoMdSearch /></button>
                </div>
            </div>
        </div>
    );
}

export default NavBar2;
