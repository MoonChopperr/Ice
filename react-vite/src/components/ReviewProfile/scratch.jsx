import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkAllUserReviews } from "../../redux/review";
import { thunkAllGames } from "../../redux/game";
import { thunkUpdateReview, thunkDeleteReview } from "../../redux/review";

import './ReviewProfile.css'

function ReviewProfile() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const currUser = useSelector(state => state?.session?.user)
    const userReviews = useSelector(state => state?.review?.userReviews)
    const games = useSelector((state) => state?.game?.games)
    const [editingReview, setEditingReview] = useState(null)

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

    const handleTitle = (reviewId) =>{
        nav(`/game/${reviewId}`)
    }

    const handleEdit = (reviewId) =>{
        setEditingReview(reviewId)
    }

    const handleSave = (reviewId, newText) =>{
        dispatch(thunkUpdateReview(reviewId, {review: newText}))
        setEditingReview(null)
    }

    const handleDelete = (reviewId) =>[
        dispatch(thunkDeleteReview(reviewId))
    ]


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
                        <div className="UR-card-top">
                            <div onClick={()=> handleTitle(review?.game_id)}className="UR-title">{getGameTitle(review)}</div>
                            <div className="UR-date">{formatDate(review.createdAt)}</div>
                        </div>
                        <div className="UR-review-container">
                            {editingReview === review.id ? (
                                <textarea
                                    defaultValue={review.review}
                                    onBlur={(e) => handleSave(review.id, e.target.value)}
                                    onKeyDown={(e) => {if (e.key === 'Enter') e.target.blur()}}
                                />
                            ) : (
                                <div className="UR-review-text" onClick={() => handleEdit(review.id)}>{review.review}</div>
                            )}
                        </div>
                        <div className="UR-review-btns">
                            <div className="UR-rv">
                                <button className="UR-review-btn" onClick={() => handleEdit(review.id)}>Edit review</button>
                            </div>
                            <div className="UR-rv">
                                <button className="UR-review-btn" onClick={() => handleDelete(review.id)}>Delete review</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    )
}

export default ReviewProfile
