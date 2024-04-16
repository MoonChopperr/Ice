import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkAllUserReviews } from "../../redux/review";
import { thunkAllGames } from "../../redux/game";
import { thunkUpdateReview, thunkDeleteReview } from "../../redux/review";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";

import './ReviewProfile.css'

function ReviewProfile() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const currUser = useSelector(state => state?.session?.user)
    const userReviews = useSelector(state => state?.review?.userReviews)
    const games = useSelector((state) => state?.game?.games)
    const [editingReview, setEditingReview] = useState(null)
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [editedReview, setEditedReview] = useState('')

    const getGameTitle = (review) => {
        const game = games?.find(game => game.id === review.game_id)
        return game ? game.title : "Game Title Not Found"
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = date.toLocaleString('default', { month: 'long' })
        const day = date.getDate()
        return `Posted on ${month} ${day}`
    }

    const handleTitle = (reviewId) => {
        nav(`/game/${reviewId}`)
    }

    const handleEdit = (reviewId) => {
        setEditingReview(reviewId)
        setIsLiked(false)
        setIsDisliked(false)
    }

    const handleDelete = (reviewId) => [
        dispatch(thunkDeleteReview(reviewId))
    ]


    const handleSaveChanges = (reviewId, newText, game_id) => {
        const newRating = isLiked ? 1 : isDisliked ? -1 : 0;
        dispatch(thunkUpdateReview(reviewId, { review: newText, rating: newRating, game_id:game_id }))
        setEditingReview(null)
    }


    useEffect(() => {
        dispatch(thunkAllUserReviews(currUser.id))
        dispatch(thunkAllGames())
    }, [dispatch, currUser.id])


    return (
        <>
            <div className="PFP-container">
                <div className="UR-main-title">Your Reviews</div>
                <div className="UR-container">
                    {userReviews?.reviews?.map(review => (
                        <div key={review.id} className="UR-card">
                            <div className="UR-card-main-container">
                                <div className="UR-card-left-container">
                                    <div className="UR-review-thumbs-container">
                                        {review.rating === 1 ? (
                                            <div>
                                                <FaThumbsUp className="UR-review-thumbsup" />
                                            </div>
                                        ) : (
                                            <div>
                                                <FaThumbsDown className="UR-review-thumbsdown" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="UR-card-top">
                                        <div onClick={() => handleTitle(review?.game_id)} className="UR-title">{getGameTitle(review)}</div>
                                        <div className="UR-date">{formatDate(review.createdAt)}</div>
                                    </div>
                                </div>

                                <div className="UR-card-right-container">
                                    <div className="UR-rv">
                                        <button className="UR-review-btn" onClick={() => handleEdit(review.id)}>Edit review</button>
                                    </div>
                                    <div className="UR-rv">
                                        <button className="UR-review-btn" onClick={() => handleDelete(review.id)}>Delete review</button>
                                    </div>
                                </div>

                            </div>

                            <div className="UR-review-container">
                                {editingReview === review.id ? (
                                    <textarea
                                        defaultValue={review.review}
                                        readOnly={editingReview !== review.id}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e)=> setEditedReview(e.target.value)}
                                    />
                                ) : (
                                    <div className="UR-review-text">{review.review}</div>
                                )}
                            </div>
                            {editingReview === review.id && (
                                <div className="RM-rating-btns">
                                    <button className="UR-rating-btns" onClick={() => { setIsLiked(true); setIsDisliked(false); }}>
                                        {isLiked ? <ImCheckmark className="RM-thumb" /> : <FaThumbsUp className="RM-thumbs" />}
                                        Yes
                                    </button>
                                    <button className="UR-rating-btns" onClick={() => { setIsDisliked(true); setIsLiked(false); }}>
                                        {isDisliked ? <ImCheckmark className="RM-thumb" /> : <FaThumbsDown className="RM-thumbs" />}
                                        No
                                    </button>
                                    <button className="UR-rating-btns" onClick={() => handleSaveChanges(review.id, editedReview, review.game_id)}>
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default ReviewProfile
