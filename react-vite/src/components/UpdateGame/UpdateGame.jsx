import GameForm from "../GameForm/GameForm"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkOneGame } from "../../redux/game"
import { useParams } from "react-router-dom"

const UpdatedGame = () => {
    const buttonName = 'Update Game'
    const dispatch = useDispatch()
    const {gameId} = useParams()
    const game = useSelector(state => state.game)

    useEffect(()=>{
        dispatch(thunkOneGame(gameId))
    }, [dispatch, gameId])

    if(!game || !gameId){
        return <h2>Loading</h2>
    }

    return (
        <>
            <div>
                <GameForm buttonName={buttonName} />
            </div>
        </>
    )
}

export default UpdatedGame
