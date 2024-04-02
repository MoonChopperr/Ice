
import { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetCart } from '../../redux/cart'
import { thunkAllGames } from '../../redux/game'
// import { thunkDeleteItem } from '../../redux/cart'
// import { thunkClearCart } from '../../redux/cart'
import { thunkUpdateCart } from '../../redux/cart'
import { useParams } from 'react-router-dom'

// import NavBar2 from '../NavBar2/NavBar2'
import './CartUpdate.css'

function CartUpdate() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { gameId } = useParams()

    // console.log('gameId params', gameId)
    // const currUser = useSelector(state => state.session.user)
    const userOrders = useSelector(state => state.cart)
    const userCart = userOrders?.cart?.currentCart

    // console.log('gameId', gameId)

    console.log('userCart!!!', userCart)
    const order = userCart?.find(order => order.game_id === parseInt(gameId))

    // console.log('test', userCart[0].game_id)

    console.log('order', order)
    console.log('orderquan', order?.quantity)
    // function getGames() {
    //     const inCart = userCart?.map(item => {
    //         const game = allGames?.find(game => game.id === item.game_id)
    //         return game
    //     })
    //     return inCart?.filter(game => game)
    // }

    // console.log(getGames)

    const [quantity, setQuantity] = useState(order?.quantity || 1)

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
        const updatedOrder = { quantity: quantity + 1 }
        dispatch(thunkUpdateCart(order.id, updatedOrder))
    }

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1)
            const updatedOrder = { quantity: quantity - 1 }
            dispatch(thunkUpdateCart(order.id, updatedOrder))
        }
    }

    const handleUpdateQuantity = () => {
        console.log('orderId', order.id)
        console.log('new quan', quantity)
        dispatch(thunkUpdateCart(order.id, { quantity }))
        nav('/game/cart')
    }

    useEffect(() => {
        dispatch(thunkGetCart())
        dispatch(thunkAllGames())
    }, [dispatch])

    return (
        <>
            <div className='update-bg'>
                <div className='update-u-sure'>Are you sure you want to update the quantity? It&apos;s a game</div>
                <div>quantity</div>
                <button onClick={handleDecrement}>-</button>
                <span style={{ color: "white" }}>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
                <button onClick={handleUpdateQuantity}>Update Quantity</button>
            </div>
        </>
    )
}

export default CartUpdate
