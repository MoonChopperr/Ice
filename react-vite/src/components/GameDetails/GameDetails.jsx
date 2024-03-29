import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkOneGame } from "../../redux/game";
import { NavLink, useParams } from "react-router-dom";
import CreateGame from "../GameForm/GameForm";

import './GameDetails.css'


export default function GameDetails() {
    const { gameId } = useParams()
    const dispatch = useDispatch()
    const game = useSelector(state => state.game[gameId])
    const actualGame = Object.values(game)
    console.log('game==>', game)
    console.log('actualgame', actualGame)
    const currUser = useSelector(state => state.session)
    console.log('@currUser', currUser)

    useEffect(() => {
        dispatch(thunkOneGame(gameId))
    }, [gameId, dispatch])

    return (
        <>
            <h1>game details</h1>
            <div className='GD-Container'>
                <img src={game?.images} alt = 'Game Image'/>
                <div>{game?.title}</div>
            </div>
        </>
    )
}
