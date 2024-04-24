import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteWishlistItem } from "../../redux/wishlist";
import { thunkGetWishlist, thunkUpdateWishlist } from "../../redux/wishlist";
import { thunkAllGames } from "../../redux/game";
import { thunkAddCart, thunkGetCart } from "../../redux/cart";
import { useModal } from "../../context/Modal"
import AlrWishlistModal from "../WishlistModal/AlrWishlistModal";
import WishlistModal from "../WishlistModal/WishlistModal";
// import Footer from "../Footer/Footer";
import './Wishlist.css'

function WishlistPage() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const currUser = useSelector(state => state.session.user)
    const userOrders = useSelector(state => state.cart)

    const userWishlist = useSelector(state => state.wishlist.currentWishlist)
    const allGames = useSelector(state => state.game.games)
    const userCart = userOrders?.cart?.currentCart
    const wishlist = userWishlist?.currentWishlist
    const [forceRerender, setForceRerender] = useState(false)
    const [cartNum, setCartNum] = useState(false)

    const { setModalContent } = useModal()

    useEffect(() => {
        dispatch(thunkGetWishlist())
        dispatch(thunkAllGames())
        setForceRerender(false)
    }, [dispatch, forceRerender])

    if (!currUser) {
        nav('/')
    }

    function getGames() {
        // const sortedGames = userWishlist?.currentWishlist?.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        const sortedGames = userWishlist?.currentWishlist?.sort((a, b) => {
            if (a.rank && b.rank) {
                return a.rank - b.rank
            } else if (a.rank) {
                return -1
            } else if (b.rank) {
                return 1
            } else {
                return 0
            }
        })
        const updatedRanks = sortedGames?.map((item) => {
            const game = allGames?.find(game => game.id === item.game_id)
            return {
                ...game,
                WLcreatedAt: item.createdAt,
                rank: item.rank,
                inCart: userCart?.some(cartItem => cartItem.game_id === item.game_id)
            }
        })
        return updatedRanks?.filter(game => game)
    }

    // const games = getGames()
    // console.log('games', games)

    function formatDate(date) {
        if (!date) {
            return ''
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const [year, month, day] = date.split('-')

        const monthName = months[parseInt(month, 10) - 1] //converts month into integer, 10 is specify conversion base to decimal | need to subtract 1 because array index 0
        return `${monthName} ${parseInt(day, 10)}, ${year}`
    }

    //for added on
    function formatDateAddedOn(dateString) {
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
    }

    function handleRemove(wishlist_item_id) {
        dispatch(thunkDeleteWishlistItem(wishlist_item_id))
        setForceRerender(!forceRerender)
    }

    const handleInputClick = (e) => {
        e.target.select()
    }

    const handleEdit = async (wishlistItemId, newRankValue) => {
        // const rank = parseInt(newRankValue)
        if (newRankValue === null || newRankValue === '') {
            return
        }

        let rank = parseInt(newRankValue)
        if (isNaN(rank)) {
            rank = 0
        }
        const updatedItem = {
            rank: rank > userWishlist.currentWishlist.length ? userWishlist.currentWishlist.length : rank
        }

        const currItem = wishlist.find(item => item.id === wishlistItemId)
        const sameRank = wishlist.find(item => item.rank === rank && item.id !== wishlistItemId)
        if (sameRank) {
            const updateDuplicateRank = {
                rank: currItem.rank
            }
            await dispatch(thunkUpdateWishlist(sameRank.id, updateDuplicateRank))
        }

        await dispatch(thunkUpdateWishlist(wishlistItemId, updatedItem))
        setForceRerender(!forceRerender)

        // filter any 0 rank items
        const zeroRankItems = wishlist.filter(item => item.rank === 0)
        // console.log('zeroRankItems:', zeroRankItems)

        if (zeroRankItems.length > 0) {
            const highestRank = Math.max(...wishlist.map((item) => item.rank))
            // when an update is dispatched, a check in the wishlist arr for 0 ranks is sent and updates any at 0 to length
            for (let i = 0; i < zeroRankItems.length; i++) {
                const zeroRankItem = zeroRankItems[i];
                const updatedZeroRankItem = {
                    rank: highestRank + i + 1,
                }
                // console.log('Updated rank:', updatedZeroRankItem.rank)

                await dispatch(thunkUpdateWishlist(zeroRankItem.id, updatedZeroRankItem))
            }
        }
    }

    //cart handling

    const addToCart = (gameId) => {
        const currCart = userCart?.map(item => item.game_id)

        if (currCart?.includes(gameId)) {
            setModalContent(<AlrWishlistModal />)
        } else {
            const newOrder = {
                game_id: gameId
            }

            dispatch(thunkAddCart(newOrder))
            setModalContent(<WishlistModal />);

            setCartNum(prevState => !prevState)
        }

    }



    useEffect(() => {
        dispatch(thunkGetWishlist())
        dispatch(thunkAllGames())
        dispatch(thunkGetCart())
        setForceRerender(false)
    }, [dispatch, cartNum, forceRerender])

    return (
        <>
            <div className="Wishlist-container">

                <div className='NavBar2-container'>
                    {currUser && (
                        <div className='above-bar'>
                            <button className="NB-wishlist" onClick={() => nav('/wishlist')}>Wishlist {userWishlist?.currentWishlist?.length > 0 ? `(${userWishlist?.currentWishlist?.length})` : ''}</button>
                            <button className="NB-user-cart" onClick={() => nav('/game/cart')}>Cart {userCart?.length > 0 ? `(${userCart?.length})` : ''}</button>
                        </div>
                    )}
                </div>

                <div className="WL-username">{currUser?.username.toUpperCase()}&apos;s WISHLIST</div>
                <hr className="WL-hr" />
                {getGames()?.length > 0 ? (
                    getGames()?.map(game => (
                        <div key={game.id} className="WL-game-card">
                            <div className="WL-left">
                                <img className="WL-game-img" src={game?.images}></img>
                            </div>

                            <div className="WL-right">
                                <div className="WL-title">{game?.title}</div>

                                <div className="WL-mid">
                                    <div className="WL-mid-container">
                                        <div className="WL-subtitle">OVERALL REVIEWS:&nbsp;<span className="WL-sub-title">{ }</span></div>
                                        <div className="WL-subtitle">RELEASE DATE:&nbsp;<span className="WL-sub-date">{formatDate(game?.release_date)}</span></div>
                                    </div>

                                    <div className="WL-addto-container">
                                        <span className="WL-price">${game?.price}</span>
                                        {game.inCart ? (
                                            <button className="WL-cart-btn" onClick={() => addToCart(game.id)}>In Cart</button>
                                        ) : (
                                            <button className="WL-cart-btn" onClick={() => addToCart(game.id)}>Add to Cart</button>
                                        )}
                                    </div>
                                </div>

                                <div className="WL-text">
                                    Rank: <input className="WL-rank" type="text" pattern="\d*" inputMode="numeric" value={game.rank !== null && game.rank !== '' ? game.rank : 0} onClick={handleInputClick} onChange={(e) => handleEdit((wishlist.find(item => item.game_id === game.id)).id, e.target.value)} />
                                </div>

                                <div className="WL-btm">
                                    <span className="WL-text"> Added on {formatDateAddedOn(game.WLcreatedAt)}</span>
                                    <span className="WL-text">&nbsp;( </span>
                                    <span className="WL-remove" onClick={() => handleRemove((wishlist.find(item => item.game_id === game.id)).id)}>remove</span>
                                    <span className="WL-text"> ) </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="WL-no-items">No items in wishlist</div>
                )}
            </div>

        </>
    )
}

export default WishlistPage
