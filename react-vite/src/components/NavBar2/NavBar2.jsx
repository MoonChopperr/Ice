import './NavBar2.css'
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetCart } from '../../redux/cart';
import { useNavigate } from 'react-router-dom';
import { thunkGetWishlist } from '../../redux/wishlist';


function NavBar2() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const currUser = useSelector(state => state.session.user)
    const userWishlist = useSelector(state => state.wishlist.currentWishlist)
    const userOrders = useSelector(state => state.cart)
    // console.log('userOrders', userOrders)
    const userCart = userOrders?.cart?.currentCart
    // console.log('@CART@', userCart)

    useEffect(() => {
        if (currUser) {
            dispatch(thunkGetCart())
            dispatch(thunkGetWishlist())
        }
    }, [dispatch])
    return (
        <>
            <div className='NavBar2-container'>
                {currUser && (
                    <div className='above-bar'>
                        <button className="NB-wishlist" onClick={() => nav('/wishlist')}>Wishlist {userWishlist?.currentWishlist?.length > 0 ? `(${userWishlist?.currentWishlist?.length})` : ''}</button>
                        <button className="NB-user-cart" onClick={() => nav('/game/cart')}>Cart {userCart?.length > 0 ? `(${userCart?.length})` : ''}</button>
                    </div>
                )}
                <div className="rectangle-bar">
                    <a onClick={() => alert('Feature coming soon')}>Your Store</a>
                    <a onClick={() => alert('Feature coming soon')}>New & Noteworthy</a>
                    <a onClick={() => alert('Feature coming soon')}>Categories</a>
                    <a onClick={() => alert('Feature coming soon')}>Points Shop</a>
                    <a onClick={() => nav('/news')}>News</a>
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
