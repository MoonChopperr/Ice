import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetCart } from '../../redux/cart'
import { thunkAllGames } from '../../redux/game'


import NavBar2 from '../NavBar2/NavBar2'
import './CartPage.css'



function CartPage() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const currUser = useSelector(state=>state.session.user)
    const cart = useSelector(state=>state.cart)

    console.log('cart=>', cart)
    

    useEffect(()=>{
        dispatch(thunkGetCart())
    }, [dispatch])

    return (
        <>
            <div> <NavBar2 /> </div>
        </>
    )
}

export default CartPage
