import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkOneGame } from "../../redux/game";
import { NavLink, useParams } from "react-router-dom";
import CreateGame from "../GameForm/GameForm";
import DeleteGame from "../DeleteGame/DeleteGame";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkDeleteGame } from "../../redux/game";
import NavBar2 from "../NavBar2/NavBar2";

import './GameDetails.css'


function GameDetails() {
    const { gameId } = useParams()
    const dispatch = useDispatch()
    const game = useSelector(state => state.game[gameId])
    console.log('game==>', game)
    // const actualGame = Object.values(game)
    // console.log('actualgame', actualGame)
    const currUser = useSelector(state => state.session)
    const { openModal, closeModal } = useModal();


    //check user if owner
    function isOwner(currUser) {
        if (currUser && game && game?.owner_id != null) {
            return currUser?.user?.id === game?.owner_id
        }
    }

    const isGameOwner = isOwner(currUser)
    // console.log('isGameOwner', isGameOwner)
    // console.log('currUserId', currUser?.user.id)
    console.log('gameId', game?.owner_id)
    console.log('owner?', isOwner(currUser))

    //FormatDateHelper
    function formatDate(date) {
        if (!date) {
            return ''
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const [year, month, day] = date.split('-')

        const monthName = months[parseInt(month, 10) - 1] //converts month into integer, 10 is specify conversion base to decimal | need to subtract 1 because array index 0
        return `${monthName} ${parseInt(day, 10)}, ${year}`
    }

    //renderESRB
    function renderESRB(rating) {
        if (rating === 'E') {
            return 'https://ice-capstone-bucket.s3.amazonaws.com/E.png'
        } else if (rating === 'E10+') {
            return 'https://ice-capstone-bucket.s3.amazonaws.com/E10plus.png'
        } else if (rating === 'T') {
            return 'https://ice-capstone-bucket.s3.amazonaws.com/T.png'
        } else if (rating === 'M') {
            return 'https://ice-capstone-bucket.s3.amazonaws.com/M.png'
        } else if (rating === 'AO') {
            return 'https://ice-capstone-bucket.s3.amazonaws.com/AO.png'
        } else {
            return 'https://ice-capstone-bucket.s3.amazonaws.com/RP.png'
        }
    }

    useEffect(() => {
        dispatch(thunkOneGame(gameId))
    }, [gameId, dispatch])

    const handleEdit = () => {
        window.location.href = `/game/${gameId}/update`
    }

    return (
        <>
            <div> <NavBar2 /> </div>

            <div className='GD-title-container'>
                <h1 className="GD-title">{game?.title}</h1>
                <div>
                    {isGameOwner && (
                        <>
                            <button onClick={handleEdit}> edit </button>
                            <OpenModalButton
                                className='Button'
                                buttonText='Delete'
                                modalComponent={<DeleteGame gameId={gameId} />}
                            />
                        </>
                    )}
                </div>
            </div>


            <div className='GD-splash-container'>
                <div className="splash-l"> Splash Carousel</div>
                <div className="splash-r">
                    <img src={game?.images} alt='Game Image' />
                    <p className="">{game?.about}</p>
                </div>
                <div className="stats">
                    <div>
                        <span className="release-date-label">RELEASE DATE:</span>
                        <span className="release-date-text">{formatDate(game?.release_date)}</span>
                    </div>

                    <div>
                        <span className="splash-label">DEVELOPER:</span>
                        <span className="splash-text">{game?.developer}</span>
                    </div>

                    <div>
                        <span className="splash-label">PUBLISHER:</span>
                        <span className="splash-text"></span>
                    </div>

                    <div>
                        <span className="splash-label">Popular user-defined tags for this product:
                        </span>
                    </div>

                </div>
            </div>

            <div className="below-splash">
                <div className="left-below">
                    <div className="add-game-container">
                        <div className="">
                            <p className="game-name">
                                BUY {game?.title}
                            </p>
                            <span>
                                ${game?.price} <button> add to cart </button>
                            </span>
                        </div>
                    </div>
                </div>

                <div className='right-below'>

                    <div className="GD-side-bar">
                        <div className="ESRB">
                            {game?.ESRB_rating && (
                                <div>
                                    <img src={renderESRB(game?.ESRB_rating)} alt={`ESRB Rating: ${game?.ESRB_rating}`} />
                                    {game?.ESRB_rating}
                                </div>
                            )}
                        </div>

                        <div className="stats-details">
                            <div>
                                <span className="splash-label">TITLE:</span>
                                <span className="splash-text">{game?.title}</span>
                            </div>

                            <div>
                                <span className="splash-label">GENRE:</span>
                                <span className="splash-text">{game?.genre}</span>
                            </div>

                            <div>
                                <span className="splash-label">DEVELOPER:</span>
                                <span className="splash-text">{game?.developer}</span>
                            </div>

                            <div>
                                <span className="splash-label">PUBLISHER:</span>
                                <span className="splash-text">{game?.publisher}</span>
                            </div>

                            <div>
                                <div>{game?.franchise && (
                                    <div>
                                        <span className="splash-label">FRANCHISE:</span>
                                        <span className="splash-text">{formatDate(game?.franchise)}</span>
                                    </div>
                                )}
                                </div>
                            </div>

                            <div>
                                <span className="release-date-label">RELEASE DATE:</span>
                                <span className="release-date-text">{formatDate(game?.release_date)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}

export default GameDetails
