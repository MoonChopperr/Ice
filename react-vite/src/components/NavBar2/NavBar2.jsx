import './NavBar2.css'
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetCart } from '../../redux/cart';
import { useNavigate } from 'react-router-dom';

function NavBar2() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const currUser = useSelector(state => state.session.user)
    const userOrders = useSelector(state => state.cart)
    console.log('userOrders', userOrders)

    // function cartSize(cart) {
    //     return cart?.length()
    // }

    const userCart = userOrders?.cart?.currentCart
    console.log('@CART@', userCart)

    useEffect(() => {
        dispatch(thunkGetCart())
    }, [dispatch])
    return (
        <>
            <div className='NavBar2-container'>
                {currUser && (
                    <div className='above-bar'>
                        <button className="NB-wishlist" onClick={() => alert('Feature coming soon')}>Wishlist</button>
                        <button className="NB-user-cart" onClick={() => nav('/game/cart')}>Cart {userCart?.length > 0 ? `(${userCart?.length})`: ''}</button>
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
