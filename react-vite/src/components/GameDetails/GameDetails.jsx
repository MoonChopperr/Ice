import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkOneGame } from "../../redux/game";
import { NavLink, useParams } from "react-router-dom";


import './GameDetails.css'


export default function GameDetails() {
    const dispatch = useDispatch()
    const game = useSelector(state => state.game)
    const currUser = useSelector(state => state.session)
    console.log('@currUser', currUser)
    const { gameId } = useParams()

    useEffect(()=>{
        dispatch(thunkOneGame(gameId))
    }, [gameId. dispatch])

    return(
        <>
        <h1>game details</h1>
        </>
    )
}
