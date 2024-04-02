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
import { thunkAddCart, thunkGetCart } from "../../redux/cart";


function GameDetails() {
    const { gameId } = useParams()
    const dispatch = useDispatch()
    const game = useSelector(state => state.game[gameId])
    console.log('game==>', game)
    // const actualGame = Object.values(game)
    // console.log('actualgame', actualGame)
    const currUser = useSelector(state => state.session)
    const { openModal, closeModal } = useModal();

    const userOrders = useSelector(state => state.cart)
    const userCart = userOrders?.cart?.currentCart

    const [cartNum, setCartNum] = useState(false)

    const reRenderCart = () =>{
        setCartNum(!cartNum)
    }

    console.log('userOrders', userOrders)

    const addToCart = (gameId) => {

        const currCart = userCart?.map(item => item.game_id)

        if (currCart?.includes(gameId)) {
            alert("This item is in your cart already, please change the quantity in your cart page")
        } else {
            const newOrder = {
                game_id: gameId
            }

            dispatch(thunkAddCart(newOrder))
            alert('Game added to cart')
        }

    }

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

    //add space+comma
    function addSpaceAfterComma(str) {
        return str?.split(',').join(', ')
    }

    //single genre
    function singleGenre(genre) {
        return genre?.split(',')[0].trim()
    }

    //render .00
    function formatPrice(price) {
        if (price % 1 === 0) { //integer?
            return `${price}.00`
        } else {
            return price?.toFixed(2) // Use toFixed to ensure two decimal places
        }
    }
    console.log('single genre', game?.genre)

    console.log('franchise', game?.franchise)
    useEffect(() => {
        dispatch(thunkOneGame(gameId))
        dispatch(thunkAddCart())
        dispatch(thunkGetCart())
    }, [gameId, dispatch, cartNum])



    const handleEdit = () => {
        window.location.href = `/game/${gameId}/update`
    }

    return (
        <>
            <div className="GF-BG">
                <div className="GF-main-container">
                    <div> <NavBar2 /> </div>

                    <div className='GD-above-title'>
                        <div className="GF-filter">
                            <span className="GF-Hover" onClick={() => alert('Feature coming soon')}>All Games</span>
                            <span> &gt; </span>
                            <span className="GF-Hover" onClick={() => alert('Feature coming soon')}>{singleGenre(game?.genre)}</span>
                            <span> &gt; </span>

                            {game?.franchise == false && (
                                <>
                                    <span className="GF-Hover" onClick={() => alert('Feature coming soon')}>{game?.franchise} Franchise</span>
                                    <span> &gt; </span>
                                </>
                            )}
                            <span className="GF-Hover" onClick={() => alert('Feature coming soon')}>{game?.title}</span>
                        </div>
                    </div>

                    <div className="title-container">
                        <h1 className="GD-title">{game?.title}</h1>
                    </div>


                    <div className="GD-ED-container">
                        {isGameOwner && (
                            <>
                                <button className="GD-btn" onClick={handleEdit}> edit </button>
                                <OpenModalButton
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        borderRadius: '3px',
                                        padding: '10px 20px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    className='Button'
                                    buttonText='Delete'
                                    modalComponent={<DeleteGame gameId={gameId} />}
                                />
                            </>
                        )}
                    </div>



                    <div className='GD-splash-container'>
                        <div className="splash-l"> </div>


                        <div className="splash-r">
                            <img className="GD-img" src={game?.images} alt='Game Image' />
                            <p className="game-about">{game?.about}</p>

                            <div className="stats">
                                <div className="GD-date">
                                    <span className="GD-label">RELEASE DATE:</span>
                                    <span className="release-date-text">{formatDate(game?.release_date)}</span>
                                </div>
                                {/*
                                <div className="">

                                </div> */}
                                <div>
                                    <span className="GD-label">DEVELOPER:</span>
                                    <span className="splash-text">{game?.developer}</span>
                                </div>

                                {game?.publisher && (
                                    <div>
                                        <span className="GD-label">PUBLISHER:</span>
                                        <span className="splash-text">{game?.publisher}</span>
                                    </div>
                                )}

                                <div className="GD-popular">
                                    <span className="splash-label">Popular user-defined tags for this product:
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="below-splash">
                        <div className="left-below">
                            <div className="add-game-container">
                                <div className="game-cart-cotnainer">
                                    <p className="game-name">
                                        Buy {game?.title}
                                    </p>
                                    <span className="add-to-cart-container">
                                        ${formatPrice(game?.price)} <button onClick={() => addToCart(game.id)} reRenderCart={reRenderCart}> Add to Cart </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='right-below'>

                            <div className="GD-side-bar">
                                {/* {game?.ESRB_RATING && ( */}
                                    <div className="ESRB-container">
                                        {game?.ESRB_rating && (
                                            <>
                                                <div>
                                                    <img className="ESRB-img" src={renderESRB(game?.ESRB_rating)} alt={`ESRB Rating: ${game?.ESRB_rating}`} />
                                                </div>
                                                <div className="ESRB-text">Rating for: ESRB</div>
                                            </>
                                        )}

                                    </div>
                                {/* )} */}

                                <div className="stats-details">
                                    <div>
                                        <span className="GD-label">TITLE:</span>
                                        <span className="splash-text-title">{game?.title}</span>
                                    </div>

                                    <div>
                                        <span className="GD-label">GENRE:</span>
                                        <span className="splash-text">{addSpaceAfterComma(game?.genre)}</span>
                                    </div>

                                    <div>
                                        <span className="GD-label">DEVELOPER:</span>
                                        <span className="splash-text">{game?.developer}</span>
                                    </div>

                                    <div>
                                        <span className="GD-label">PUBLISHER:</span>
                                        <span className="splash-text">{game?.publisher}</span>
                                    </div>

                                    <div>
                                        <div>{game?.franchise && (
                                            <div>
                                                <span className="GD-label">FRANCHISE:</span>
                                                <span className="splash-text">{game?.franchise}</span>
                                            </div>
                                        )}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="GD-label">RELEASE DATE:</span>
                                        <span className="release-date-text">{formatDate(game?.release_date)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </div>




        </>
    )
}

export default GameDetails
