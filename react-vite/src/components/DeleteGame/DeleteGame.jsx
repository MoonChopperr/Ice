import { thunkDeleteGame} from "../../redux/game"
import { useDispatch} from "react-redux"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"
import './DeleteGame.css'


function DeleteGame({ gameId }) {
    const nav = useNavigate()
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    console.log('game@@@', gameId)

    const onDelete = (e) => {
        e.preventDefault()
        dispatch(thunkDeleteGame(gameId))
        closeModal()
        nav('/')
    }

    return (
        <>
            <div className="DG-Modal-Container">
                <div className="DG-text-container">
                    <h1 className="DG-title">Confirm Delete</h1>
                    <p className="DG-description">Are you sure you want to remove your game?</p>
                </div>

                <div className="DG-btn-container">
                    <button className="DG-btn" onClick={onDelete}>
                        Yes (Delete Game)
                    </button>
                    <button className="DG-btn-2" onClick={closeModal}>
                        No (Go Back)
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteGame
