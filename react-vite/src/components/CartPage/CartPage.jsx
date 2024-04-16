import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetCart } from '../../redux/cart'
import { thunkAllGames } from '../../redux/game'
import { thunkDeleteItem } from '../../redux/cart'
import { thunkClearCart } from '../../redux/cart'
import { thunkAddLibrary } from '../../redux/library'

import NavBar2 from '../NavBar2/NavBar2'
import './CartPage.css'

function CartPage() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const currUser = useSelector(state => state.session.user)
    // console.log('USER',currUser)
    const userOrders = useSelector(state => state.cart)
    // console.log('shoppingcart', userOrders)
    const allGames = useSelector(state => state.game.games)
    // console.log('allgames', allGames)
    // console.log('cart=>', cart)
    const userCart = userOrders?.cart?.currentCart
    const [forceRerender, setForceRerender] = useState(false)
    // const [rmAllRerender, setRmALLRerender] = useState(false)
    // console.log(userCart.length)

    //LOGOUT REDIRECT NAV
    if (!currUser){
        nav('/')
    }
    // console.log('userOrdersBEFORE', userOrders)
    // console.log('userCartAFTER', userCart)

    //render if exists(?)
    function getGames() {
        const inCart = userCart?.map(item => {
            const game = allGames?.find(game => game.id === item.game_id)
            return game
        })
        return inCart?.filter(game => game)
    }

    function getQuant(userCart, gameId) {
        const cartItem = userCart.find(item => item.game_id === gameId)
        return cartItem
    }

    //total price
    function totalPrice() {
        const total = getGames().reduce((acc, game) => acc + (game.price * getQuant(userCart, game.id).quantity), 0)
        return total.toFixed(2)
    }

    const handleUpdate = (cartId) => {
        nav(`/cart/update/${cartId}`)
    }

    const handleRemove = (userCartId) => {
        dispatch(thunkDeleteItem(userCartId))
        // dispatch(thunkGetCart())
        getGames()
        setForceRerender(!forceRerender)
    }

    const handleCheckout = async () =>{
        const result = await dispatch(thunkAddLibrary(userCart))
        if (!result.errors) {
            dispatch(thunkClearCart());
        }
    }

    useEffect(() => {
        dispatch(thunkGetCart())
        dispatch(thunkAllGames())
    }, [dispatch, forceRerender])

    return (
        <>
            <div className='cart-outer-container'>
                <div className='cart-navbar2'>
                    <div > <NavBar2 /> </div>
                </div>

                <div className='cart-below-navbar2-container'>
                    <span className='cart-home-text' onClick={() => nav('/')} >Home</span><span style={{ color: '#adafb1', fontSize: '14px', fontWeight: '200' }}> &gt; Your Shopping Cart</span>
                    <div className='cart-yourshoppingcart'> Your Shopping Cart</div>
                </div>

                {userCart?.length > 0 ? (
                    <div className='cart-game-container'>
                        {getGames()?.map(game => (
                            <div key={game.id} className='cart-game'>
                                <img className='cart-img' src={game?.images}></img>
                                <div className='cart-title'>{game?.title}</div>
                                <div className='cart-price'>${game?.price * getQuant(userCart, game.id).quantity}</div>
                                <div className='cart-crud-container'>
                                    <span className='cart-quan'> <span className='Quantity'>Quantity:</span> {getQuant(userCart, game.id).quantity} </span>
                                    {/* <span className='cart-crud' onClick={()=> handleAdd((userCart.find(order => order.quantity)))}>Add</span> */}
                                    <span className='cart-crud' onClick={() => handleUpdate((game?.id))}>Update</span>
                                    <span className='cart-pole'> | </span>
                                    {/* { forceRerender ? <p>YES</p> : <p>NO</p>} */}
                                    <span className='cart-crud' onClick={() => handleRemove((userCart.find(order => order.game_id === game.id)).id)}>Remove</span>
                                </div>
                            </div>
                        ))}

                        <div className='cart-sidebar'>
                            <div className='cart-est-container'>
                                <span className='cart-est'>Estimated total</span> <span className='cart-total-price'>${totalPrice(getGames())}</span>
                            </div>
                            <div className='cart-blurb'> Sales tax will be calculated during checkout where applicable</div>
                            {!currUser && (
                                <button onClick={() => nav('/login')}>Sign in to purchase</button>
                            )}
                            {currUser && (
                                <button className='cart-checkout-btn' onClick={handleCheckout}>Continue to payment</button>
                            )}
                        </div>

                    </div>
                ) : (
                    <div className='cart-empty'>Your cart is empty.</div>
                )}

                <div className='below-cart-game-container'>
                    <button className='cart-continue-shopping' onClick={() => nav('/')}>Continue Shopping</button>
                    <div className='cart-rm-all' onClick={()=>dispatch(thunkClearCart())}>Remove all items</div>
                </div>



            </div>
        </>
    )
}

export default CartPage
