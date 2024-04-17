import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkOneGame } from "../../redux/game";
import { useParams } from "react-router-dom";
import DeleteGame from "../DeleteGame/DeleteGame";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import NavBar2 from "../NavBar2/NavBar2";
import ReviewModule from "../ReviewModule/ReviewModule";
import AllReviewsModule from "../ReviewAll/ReviewAll";
import CartAddToModal from "../CartAddToModal/CartAddToModal";
import { useModal } from "../../context/Modal"
import NavigationModal from "../NavigationModal/NavigationModal";
import CartInModal from "../CartInCartModal/CartInModal";
import WishlistModal from "../WishlistModal/WishlistModal";
import WishlistRmModal from "../WishlistRmModal/WishlistModalRm";

import './GameDetails.css'
import { thunkAddCart, thunkGetCart } from "../../redux/cart";
import { thunkAddWishlist, thunkDeleteWishlistItem, thunkGetWishlist } from "../../redux/wishlist";
import { thunkGetLibrary } from "../../redux/library";
import { thunkAllGameReviews, clearGameReviews } from "../../redux/review";


function GameDetails() {
    const { gameId } = useParams()
    const dispatch = useDispatch()
    const game = useSelector(state => state.game[gameId])
    const nav = useNavigate()

    //reviews
    const currreviews = useSelector(state => state?.review)
    const reviews = Object.values(currreviews)
    // console.log('reviews=>', reviews)

    // console.log('game==>', game)
    // const actualGame = Object.values(game)
    // console.log('actualgame', actualGame)
    const currUser = useSelector(state => state.session)
    //library
    const library = useSelector(state => state.library)
    const currLibrary = library?.currentLibrary?.library
    const isGameInLibrary = currLibrary?.some(item => item.id === parseInt(gameId));
    //cart
    const userOrders = useSelector(state => state.cart)
    const userCart = userOrders?.cart?.currentCart

    const [cartNum, setCartNum] = useState(false)
    const [wishlistNum, setWishlistNum] = useState(false)
    //wishlist
    const userWishlist = useSelector(state => state.wishlist.currentWishlist)
    const wishlist = userWishlist?.currentWishlist

    const totalReviews = reviews.length
    const positiveReviews = reviews.filter(review => review.rating === 1).length
    const reviewRatio = positiveReviews / totalReviews
    // console.log('ratio', reviewRatio)
    const { setModalContent, showModal } = useModal()
    console.log(showModal)
    const addToCart = async(gameId) => {
        if (!currUser.user) {
            setModalContent(<NavigationModal />)
        } else {
            const currCart = userCart?.map(item => item.game_id)

            if (currCart?.includes(gameId)) {
                setModalContent(<CartInModal />)
            } else {
                const newOrder = {
                    game_id: gameId
                }

                await dispatch(thunkAddCart(newOrder))
                setModalContent(<CartAddToModal gameId={gameId} />);
                setCartNum(prevState => !prevState)

            }
        }

    }

    const addToWishlist = async(gameId) => {
        const currWishlist = wishlist?.map(item => item.game_id)

        if (currWishlist?.includes(gameId)) {
            const wishlistItem = wishlist.find(item => item.game_id === gameId)
            await dispatch(thunkDeleteWishlistItem(wishlistItem.id))
            setModalContent(<WishlistRmModal />)
            setWishlistNum(prevState => !prevState)

        } else {
            const newWishlistItem = {
                game_id: gameId,
            }

            await dispatch(thunkAddWishlist(newWishlistItem))
            setModalContent(<WishlistModal />)
            setWishlistNum(prevState => !prevState)
        }

    }
    //check user if owner
    function isOwner(currUser) {
        if (currUser && game && game?.owner_id != null) {
            return currUser?.user?.id === game?.owner_id
        }
    }

    const isGameOwner = isOwner(currUser)

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
    // console.log('single genre', game?.genre)
    // console.log('franchise', game?.franchise)
    useEffect(() => {
        dispatch(thunkOneGame(gameId))
        dispatch(thunkGetWishlist())
        dispatch(thunkGetCart())
        dispatch(thunkGetLibrary())
        dispatch(thunkAllGameReviews(gameId))
        return () => {
            dispatch(clearGameReviews());
        }
    }, [gameId, dispatch, cartNum, wishlistNum])

    useEffect(() => {
        if (userCart) {
            const currCart = userCart?.map(item => item.game_id)
            setCartNum(currCart.includes(gameId))
        }
    }, [userCart, gameId])

    function reviewAlgo(reviewRatio) {
        if (isNaN(reviewRatio)) {
            return { text: "No reviews", color: "#adafb16b" }
        }
        if (reviewRatio >= 0.8) {
            return { text: "Overwhelmingly Positive", color: '#1999E3' }
        } else if (reviewRatio >= 0.7) {
            return { text: "Very Positive", color: '#1999E3' }
        } else if (reviewRatio >= 0.6) {
            return { text: "Mostly Positive", color: '#1999E3' }
        } else if (reviewRatio >= 0.4) {
            return { text: "Mixed", color: "#B9A074" }
        } else if (reviewRatio >= 0.2) {
            return { text: "Mostly Negative", color: '#A34C25' }
        } else if (reviewRatio >= 0.1) {
            return { text: "Very Negative", color: '#A34C25' }
        } else {
            return { text: "Very Negative", color: '#A34C25' }
        }
    }

    const reviewResult = reviewAlgo(reviewRatio);




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
                                <div>
                                    <span className="GD-label">ALL REVIEWS: </span>
                                    <span className="GD-review-rating" style={{ color: reviewResult.color }}> {reviewResult.text}</span>
                                    <span className="GD-label">({reviews?.length})</span>
                                </div>
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

                    <div className="gd-wishlist-container">

                        {isGameInLibrary ? (
                            <button className="gd-wishlist-btn" onClick={() => nav('/news')}>Follow</button>
                        ) : (
                            <>
                                {wishlist?.some(item => item?.game_id === game?.id) ? (
                                    <button className="gd-wishlist-btn" onClick={() => addToWishlist(game.id)}>Remove from wishlist</button>
                                ) : (
                                    <button className="gd-wishlist-btn" onClick={() => addToWishlist(game.id)}>Add to wishlist</button>
                                )}
                            </>
                        )}
                    </div>

                    <div className="Rev-Module-container">
                        {isGameInLibrary && <ReviewModule game={game} />}
                    </div>



                    <div className="below-splash">
                        <div className="left-below">
                            <div className="add-game-container">
                                <div className="game-cart-cotnainer">
                                    <p className="game-name">
                                        Buy {game?.title}
                                    </p>
                                    <span className="add-to-cart-container">
                                        ${formatPrice(game?.price)} <button onClick={() => addToCart(game.id)} > Add to Cart </button>
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


                        <div>
                            <div><AllReviewsModule /></div>
                        </div>

                    </div>

                </div>

            </div>




        </>
    )
}

export default GameDetails
