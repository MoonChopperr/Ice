import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteWishlistItem } from "../../redux/wishlist";
import { thunkGetWishlist, thunkUpdateWishlist } from "../../redux/wishlist";
import { thunkAllGames } from "../../redux/game";
import { thunkGetCart } from '../../redux/cart';
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
    console.log('wishlist', wishlist)
    const [forceRerender, setForceRerender] = useState(false)


    // function getGames() {
    //     const inWishlist = wishlist?.map(item => {
    //         const game = allGames?.find(game => game.id === item.game_id)
    //         return {
    //             ...game,
    //             WLcreatedAt: item.createdAt,
    //             rank: item.rank
    //         }
    //     })
    //     console.log('goal', inWishlist)
    //     return inWishlist?.filter(game => game)
    // }

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
        const updatedRanks = sortedGames?.map((item, index) => {
            const game = allGames?.find(game => game.id === item.game_id)
            return {
                ...game,
                WLcreatedAt: item.createdAt,
                rank: item.rank
            }
        })
        return updatedRanks?.filter(game => game)
    }

    const games = getGames()
    console.log('games', games)

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

    // function handleEdit(wishlist_item_id){
    //     dispatch(thunkUpdateWishlist(wishlist_item_id))

    // }

    const handleEdit = async (wishlistItemId, newRankValue) => {
        // const rank = parseInt(newRankValue)
        if(newRankValue === null){
            return
        }

        let rank = newRankValue === '' ? null : parseInt(newRankValue)

        const updatedItem = {
            rank: rank > userWishlist.currentWishlist.length ? userWishlist.currentWishlist.length : rank
        }

        const currItem = wishlist.find(item => item.id === wishlistItemId)
        const sameRank = wishlist.find(item=>item.rank === rank && item.id !== wishlistItemId)
        if(sameRank){
            const updateDuplicateRank={
                rank: currItem.rank
            }
            await dispatch(thunkUpdateWishlist(sameRank.id, updateDuplicateRank))
        }

        await dispatch(thunkUpdateWishlist(wishlistItemId, updatedItem))
        setForceRerender(!forceRerender)
    }

    useEffect(() => {
        dispatch(thunkGetWishlist())
        dispatch(thunkAllGames())
        dispatch(thunkGetCart())
    }, [dispatch, forceRerender])

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

                <div className="WL-username">{currUser.username.toUpperCase()}'s WISHLIST</div>
                <hr className="WL-hr" />
                {getGames()?.map(game => (
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
                                    <button className="WL-cart-btn">In Cart/Add to Cart</button>
                                </div>
                            </div>

                            <div className="WL-text">
                                Rank: <input type="number" value={game.rank} onChange={(e) => handleEdit((wishlist.find(item => item.game_id === game.id)).id, e.target.value)} />
                            </div>

                            <div className="WL-btm">
                                <span className="WL-text"> Added on {formatDateAddedOn(game.WLcreatedAt)}</span>
                                <span className="WL-text">&nbsp;( </span>
                                <span className="WL-remove" onClick={() => handleRemove((wishlist.find(item => item.game_id === game.id)).id)}>remove</span>
                                <span className="WL-text"> ) </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default WishlistPage
