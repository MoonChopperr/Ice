
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
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
        if (quantity > 1) {
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
                {/* <div className='update-u-sure'>
                    <iframe width="600" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div> */}
                <h1 className='CU-big'>Update the Quantity of your game <span className='CU-small'>not sure why you'd do this...</span></h1>

                <div className='CU-btn-container'>
                    <button className='CU-btn-plus' onClick={handleDecrement}>-</button>
                    <span className='CU-quant' style={{ color: "white" }}>{quantity}</span>
                    <button className='CU-btn-minus' onClick={handleIncrement}>+</button>
                </div>

                <div className='CU-submit-container'>
                    <button className='CU-submit' onClick={handleUpdateQuantity}>Update Quantity</button>
                </div>
            </div>
        </>
    )
}

export default CartUpdate
